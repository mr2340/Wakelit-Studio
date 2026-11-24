const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const readline = require('readline');
const ProjectReader = require('./project-reader');
const DownloadManager = require('./download-manager');

class FlowRunner {
  constructor(projectName = 'sample-project', baseDir = path.resolve(__dirname, '..')) {
    this.projectName = projectName;
    this.baseDir = baseDir;
    this.reader = new ProjectReader(projectName, baseDir);
    this.downloadManager = new DownloadManager(this);
    this.settings = this.reader.loadSettings();

    this.profileDir = path.resolve(this.baseDir, this.settings.chrome?.profileDir || './chrome-profile');
    this.executablePath = this.settings.chrome?.executablePath || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    this.flowUrl = this.settings.flow?.url || 'https://flow.google.com';
    this.generationTimeoutMs = this.settings.flow?.generationTimeoutMs || 360000;
    this.cooldownMs = this.settings.flow?.cooldownBetweenGenerationsMs || 3000;
    this.maxRetries = this.settings.flow?.maxRetries || 3;

    this.timingLog = [];

    if (!fs.existsSync(this.profileDir)) {
      fs.mkdirSync(this.profileDir, { recursive: true });
    }
  }

  log(msg) {
    console.log(`[FlowRunner ${new Date().toLocaleTimeString()}] ${msg}`);
  }

  error(msg) {
    console.error(`[FlowRunner ERROR ${new Date().toLocaleTimeString()}] ${msg}`);
  }

  info(msg) {
    this.log(msg);
  }

  async launchBrowser(headless = false) {
    this.log(`Launching Chrome with persistent profile: ${this.profileDir}`);
    const context = await chromium.launchPersistentContext(this.profileDir, {
      executablePath: fs.existsSync(this.executablePath) ? this.executablePath : undefined,
      headless: headless,
      viewport: null, // natural window
      ignoreDefaultArgs: ['--enable-automation', '--no-sandbox'],
      args: this.settings.chrome?.args || [
        '--no-first-run',
        '--no-default-browser-check',
        '--start-maximized'
      ],
      acceptDownloads: true
    });
    return context;
  }

  async getBrowserContext(headless = false, useCDP = false) {
    if (useCDP) {
      const port = this.settings.chrome?.cdpPort || 9222;
      this.log(`Connecting to existing Chrome instance on port ${port}...`);
      try {
        const browser = await chromium.connectOverCDP(`http://localhost:${port}`);
        const context = browser.contexts()[0];
        return { context, isCDP: true };
      } catch (err) {
        this.error(`Could not connect to Chrome on port ${port}. Ensure Chrome was started with: npm run flow:chrome`);
        throw err;
      }
    }
    const context = await this.launchBrowser(headless);
    return { context, isCDP: false };
  }

  async runLogin() {
    this.log('=====================================================');
    this.log('FLOW SECURE LOGIN MODE: Launching native Google Chrome');
    this.log('=====================================================');
    this.log('1. A clean native Google Chrome window will now open.');
    this.log('2. Sign in to your Google Account normally.');
    this.log('3. Complete 2FA and verify you can see the Google Flow workspace.');
    this.log('4. Once signed in, close the Chrome window or return here.');
    this.log('5. Press [ENTER] in this terminal to confirm.');
    this.log('=====================================================');

    const { spawn } = require('child_process');
    const chromeArgs = [
      `--user-data-dir=${this.profileDir}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--start-maximized',
      this.flowUrl
    ];

    const child = spawn(this.executablePath, chromeArgs, {
      detached: true,
      stdio: 'ignore'
    });
    child.unref();

    await this.waitForKeyPress('Press [ENTER] after completing Google Flow login in Chrome: ');
    this.log('Login verified. Profile saved at: ' + this.profileDir);
  }

  async captureDiagnostics(page, sceneId = 'diag') {
    try {
      const paths = this.reader.getPaths();
      const timestamp = Date.now();
      const ssPath = path.join(paths.logs, `diagnostic_${sceneId}_${timestamp}.png`);
      const htmlPath = path.join(paths.logs, `diagnostic_${sceneId}_${timestamp}.html`);

      await page.screenshot({ path: ssPath, fullPage: true }).catch(() => {});
      const content = await page.content().catch(() => '');
      fs.writeFileSync(htmlPath, content, 'utf8');

      this.log(`Diagnostics saved:`);
      this.log(`  Screenshot: ${ssPath}`);
      this.log(`  HTML snapshot: ${htmlPath}`);
    } catch (err) {
      this.error(`Failed to capture diagnostics: ${err.message}`);
    }
  }

  async checkSecurityChallenge(page) {
    const isBotChallenge = await page.locator('text="Verify it\'s you", text="Security Check", #captcha, iframe[src*="recaptcha"]').count();
    if (isBotChallenge > 0) {
      this.error('=====================================================');
      this.error('CRITICAL BOT/SECURITY CHALLENGE DETECTED IN FLOW!');
      this.error('Action required: Run "npm run flow:login" to authenticate manually in standard Chrome.');
      this.error('=====================================================');
      throw new Error('Flow security challenge active. Manual login required.');
    }
  }

  async navigateWithRetry(page, url, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        this.log(`Navigating to ${url} (Attempt ${attempt}/${maxRetries})...`);
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
        return true;
      } catch (err) {
        this.error(`Navigation attempt ${attempt} failed: ${err.message}`);
        if (attempt < maxRetries) {
          this.log('Network interruption detected. Waiting 5s before reconnecting...');
          await page.waitForTimeout(5000);
        } else {
          throw err;
        }
      }
    }
  }

  async ensureInProjectWorkspace(page) {
    if (page.url().includes('/project/')) {
      this.log(`Already in project workspace: ${page.url()}`);
      return;
    }

    this.log('On Flow dashboard. Looking for project workspace...');
    await page.waitForTimeout(2000);

    const firstProject = page.locator('a[href^="/project/"]').first();
    if (await firstProject.isVisible({ timeout: 3000 }).catch(() => false)) {
      const href = await firstProject.getAttribute('href');
      this.log(`Opening existing project: ${href}`);
      await firstProject.click();
      await page.waitForURL(/.*\/project\/.*/, { timeout: 15000 });
      await page.waitForTimeout(3000);
      return;
    }

    const newProjBtn = page.getByRole('button', { name: /new project/i });
    if (await newProjBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      this.log('Clicking "New project" button...');
      await newProjBtn.click();
      await page.waitForURL(/.*\/project\/.*/, { timeout: 15000 });
      await page.waitForTimeout(3000);
      return;
    }

    this.log('Note: Neither existing project link nor "New project" button detected immediately.');
  }

  async findPromptInput(page) {
    const candidateSelectors = [
      'div.ProseMirror[contenteditable="true"]',
      'div[role="textbox"][aria-label*="What do you want to create" i]',
      'div[role="textbox"]',
      'textarea[placeholder*="prompt" i]',
      'textarea[placeholder*="describe" i]',
      'textarea[placeholder*="generate" i]',
      'div[contenteditable="true"]',
      'textarea'
    ];

    for (const sel of candidateSelectors) {
      try {
        const el = page.locator(sel).first();
        if (await el.isVisible({ timeout: 2000 })) {
          return el;
        }
      } catch (_) {}
    }

    return null;
  }

  async findSubmitButton(page) {
    const candidateSelectors = [
      'span[submitbutton] button',
      '.submit-button-slot button',
      'flow-generate-icon-button button',
      'button:has(mat-icon:has-text("arrow_forward"))',
      'button:has-text("arrow_forward")',
      'button[aria-label*="generate" i]',
      'button[aria-label*="create" i]',
      'button[type="submit"]'
    ];

    for (const sel of candidateSelectors) {
      try {
        const el = page.locator(sel).first();
        if (await el.isVisible({ timeout: 1500 })) {
          return el;
        }
      } catch (_) {}
    }

    return null;
  }

  async handleApprovalConfirmation(page, maxWaitMs = 25000) {
    this.log('Monitoring for credit approval confirmation dialog (up to 25s)...');
    const start = Date.now();

    const candidateSelectors = [
      '[role="radio"][aria-label*="Always approve in project" i]',
      '.option-row:not(.read-only):has-text("Always approve in project")',
      '[role="radio"]:not(.read-only):has-text("Always approve in project")',
      '[role="radio"][aria-label="Approve"]',
      '.option-row:not(.read-only):has-text("Approve")',
      '[role="radio"]:not(.read-only):has-text("Approve")',
      'button:has-text("Always approve in project")',
      'button:has-text("Approve")'
    ];

    while (Date.now() - start < maxWaitMs) {
      for (const sel of candidateSelectors) {
        try {
          const el = page.locator(sel).last();
          if (await el.isVisible({ timeout: 300 }).catch(() => false)) {
            const isDisabled = await el.getAttribute('aria-disabled').catch(() => null);
            const isReadOnly = await el.getAttribute('class').then(c => c && c.includes('read-only')).catch(() => false);
            if (isDisabled !== 'true' && !isReadOnly) {
              this.log(`Detected active credit dialog matching (${sel}). Clicking to approve...`);
              await el.click({ force: true });
              await page.waitForTimeout(2000);
              return true;
            }
          }
        } catch (_) {}
      }

      await page.waitForTimeout(1000);
    }

    this.log('No active credit confirmation dialog appeared within wait window (already approved or automatic).');
    return false;
  }

  /**
   * Generates a single scene via Flow interface with full state checkpointing and timing metrics.
   */
  async generateSingleScene(page, scene, targetFilePath) {
    const timing = {
      sceneId: scene.id,
      promptSubmitMs: 0,
      approvalWaitMs: 0,
      generationWaitMs: 0,
      downloadMs: 0,
      totalMs: 0,
      fileSizeBytes: 0
    };
    const sceneStartTime = Date.now();

    await this.checkSecurityChallenge(page);
    await this.ensureInProjectWorkspace(page);

    const promptInput = await this.findPromptInput(page);
    if (!promptInput) {
      throw new Error('Unable to locate prompt input on the page. UI may have updated.');
    }

    // Checkpoint: PENDING -> SUBMITTED
    this.reader.updateSceneStatus(scene.id, 'SUBMITTED', {
      submittedAt: new Date().toISOString(),
      promptPreview: scene.prompt.slice(0, 80)
    });

    const submitStart = Date.now();
    this.log(`Entering prompt for ${scene.id}: "${scene.prompt.slice(0, 80)}..."`);
    await promptInput.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await page.waitForTimeout(200);

    // Use insertText to trigger ProseMirror transaction and Angular input model
    await page.keyboard.insertText(scene.prompt);
    await page.waitForTimeout(500);

    const submitBtn = await this.findSubmitButton(page);
    if (submitBtn) {
      this.log('Clicking active submit button (arrow_forward)...');
      await submitBtn.click();
    } else {
      this.log('Submit button not found directly, sending Enter key...');
      await page.keyboard.press('Enter');
    }
    timing.promptSubmitMs = Date.now() - submitStart;

    // Checkpoint: SUBMITTED -> GENERATING
    this.reader.updateSceneStatus(scene.id, 'GENERATING', {
      generationStartedAt: new Date().toISOString()
    });

    // Check and automatically handle credit approval dialog ("Always approve in project")
    const approvalStart = Date.now();
    await this.handleApprovalConfirmation(page);
    timing.approvalWaitMs = Date.now() - approvalStart;

    this.log(`Waiting for generation completion and download event for ${scene.id}...`);

    const genWaitStart = Date.now();
    const downloadPromise = page.waitForEvent('download', { timeout: this.generationTimeoutMs });

    // Look for download triggers if automatic download does not trigger
    const downloadResult = await Promise.race([
      downloadPromise,
      this.monitorAndTriggerDownload(page)
    ]);
    timing.generationWaitMs = Date.now() - genWaitStart;

    if (!downloadResult) {
      throw new Error(`Generation completed but failed to capture download within ${this.generationTimeoutMs / 1000}s`);
    }

    const downloadStart = Date.now();
    const res = await this.downloadManager.handlePlaywrightDownload(downloadResult, targetFilePath);
    timing.downloadMs = Date.now() - downloadStart;

    if (!res.success) {
      throw new Error(`Download failed: ${res.error}`);
    }

    timing.fileSizeBytes = res.sizeBytes;
    timing.totalMs = Date.now() - sceneStartTime;
    this.timingLog.push(timing);

    // Checkpoint: DOWNLOADED -> VERIFIED
    this.reader.updateSceneStatus(scene.id, 'VERIFIED', {
      completedAt: new Date().toISOString(),
      targetFile: targetFilePath,
      fileSizeBytes: res.sizeBytes,
      timingMetrics: timing
    });

    this.log(`Scene ${scene.id} successfully verified (${(res.sizeBytes / 1024).toFixed(1)} KB in ${(timing.totalMs / 1000).toFixed(1)}s)!`);
  }

  /**
   * Monitors the workspace for completed video generation and triggers 720p download.
   */
  async monitorAndTriggerDownload(page) {
    this.log('Monitoring workspace for generation completion and download controls...');
    const startTime = Date.now();
    const pollInterval = 2500;

    while (Date.now() - startTime < this.generationTimeoutMs) {
      await page.waitForTimeout(pollInterval);

      // Check for late credit confirmation dialog
      const lateApproval = page.locator('[role="radio"][aria-label*="Always approve in project" i], .option-row:not(.read-only):has-text("Always approve in project"), [role="radio"][aria-label="Approve"], .option-row:not(.read-only):has-text("Approve")').last();
      if (await lateApproval.isVisible({ timeout: 200 }).catch(() => false)) {
        const isDisabled = await lateApproval.getAttribute('aria-disabled').catch(() => null);
        const isReadOnly = await lateApproval.getAttribute('class').then(c => c && c.includes('read-only')).catch(() => false);
        if (isDisabled !== 'true' && !isReadOnly) {
          this.log('Detected late credit approval dialog during download monitoring. Clicking to approve...');
          await lateApproval.click({ force: true });
          await page.waitForTimeout(1500);
        }
      }

      // Check for video tiles on canvas
      const tiles = page.locator('flow-video-tile');
      const tileCount = await tiles.count().catch(() => 0);

      if (tileCount > 0) {
        const tile = tiles.first();
        const box = await tile.boundingBox().catch(() => null);
        if (box) {
          this.log(`Hovering active video tile at (${Math.round(box.x + box.width/2)}, ${Math.round(box.y + box.height/2)})...`);
          await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
          await page.waitForTimeout(600);

          const moreBtn = tile.locator('button[aria-label="More options"]').first();
          if (await moreBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
            this.log('Detected completed video card! Clicking "More options" button...');
            await moreBtn.click({ force: true });
            await page.waitForTimeout(600);

            const downloadItem = page.locator('[role="menuitem"]:has-text("Download")').first();
            if (await downloadItem.isVisible({ timeout: 1500 }).catch(() => false)) {
              this.log('Hovering/clicking "Download" menu item to reveal resolution sub-menu...');
              await downloadItem.hover({ force: true });
              await page.waitForTimeout(400);
              await downloadItem.click({ force: true });
              await page.waitForTimeout(600);

              // Look for resolution option: 720p Original size
              const resItem = page.locator('[role="menuitem"]:has-text("720p"), button:has-text("720p"), :text("720p Original size")').first();
              if (await resItem.isVisible({ timeout: 2000 }).catch(() => false)) {
                this.log('Found "720p Original size" option! Clicking and capturing download...');
                try {
                  const [download] = await Promise.all([
                    page.waitForEvent('download', { timeout: 30000 }),
                    resItem.click({ force: true })
                  ]);
                  return download;
                } catch (err) {
                  this.log(`Resolution click download error: ${err.message}`);
                }
              }
            }
            await page.keyboard.press('Escape').catch(() => {});
          }
        }
      }
    }

    return null;
  }

  /**
   * Processes the scene queue in batch mode with full interruption recovery.
   * @param {boolean} useCDP
   * @param {number|null} limitScenes If set, limits generation to first N scenes (for testing)
   */
  async runBatch(useCDP = false, limitScenes = null) {
    this.reader.ensureProjectStructure();
    const scenes = this.reader.readScenes();

    if (!scenes || scenes.length === 0) {
      this.error('No scenes found in planning/scenes.json. Please run "npm run studio:plan" first.');
      return;
    }

    this.log(`Loaded ${scenes.length} scenes for project "${this.projectName}".`);

    // Filter pending/retryable scenes
    const pendingScenes = scenes.filter(s => {
      if (s.status === 'VERIFIED' || s.status === 'completed') {
        const targetFile = path.join(this.reader.getPaths().generatedScenes, s.filename);
        if (s.type === 'black_screen' || this.downloadManager.isSceneAlreadyDownloaded(targetFile)) {
          return false;
        }
      }
      return true;
    });

    const scenesToProcess = limitScenes ? pendingScenes.slice(0, limitScenes) : pendingScenes;

    if (scenesToProcess.length === 0) {
      this.log('All scenes are already VERIFIED on disk! Nothing to generate.');
      return;
    }

    this.log(`${scenesToProcess.length} scenes scheduled for generation.`);

    const { context, isCDP } = await this.getBrowserContext(this.settings.chrome?.headless || false, useCDP);
    const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();

    try {
      await this.navigateWithRetry(page, this.flowUrl);
      await page.waitForTimeout(3000);

      await this.checkSecurityChallenge(page);
      await this.ensureInProjectWorkspace(page);

      for (let i = 0; i < scenesToProcess.length; i++) {
        const scene = scenesToProcess[i];
        this.log(`----------------------------------------------------------------`);
        this.log(`Processing Scene [${i + 1}/${scenesToProcess.length}]: ${scene.id} (${scene.filename})`);

        if (scene.type === 'black_screen') {
          this.log(`Scene ${scene.id} is a black screen. Handled directly by video editor.`);
          this.reader.updateSceneStatus(scene.id, 'VERIFIED', { notes: 'Black screen handled programmatically' });
          continue;
        }

        const targetFile = path.join(this.reader.getPaths().generatedScenes, scene.filename);
        if (this.downloadManager.isSceneAlreadyDownloaded(targetFile)) {
          this.log(`Scene ${scene.id} video already exists and is valid on disk. Marking VERIFIED.`);
          this.reader.updateSceneStatus(scene.id, 'VERIFIED', { fileExists: true, targetFile });
          continue;
        }

        let success = false;
        let attempts = 0;

        while (!success && attempts < this.maxRetries) {
          attempts++;
          this.log(`Attempt ${attempts}/${this.maxRetries} for ${scene.id}...`);

          try {
            await this.generateSingleScene(page, scene, targetFile);
            success = true;
          } catch (err) {
            this.error(`Error generating scene ${scene.id} (Attempt ${attempts}): ${err.message}`);
            await this.captureDiagnostics(page, `${scene.id}_att${attempts}`);
            
            if (attempts >= this.maxRetries) {
              this.reader.updateSceneStatus(scene.id, 'FAILED', {
                lastError: err.message,
                failedAt: new Date().toISOString()
              });
            } else {
              this.log(`Waiting 5s before retry...`);
              await page.waitForTimeout(5000);
            }
          }
        }

        if (i < scenesToProcess.length - 1 && this.cooldownMs > 0) {
          this.log(`Applying cooldown: ${this.cooldownMs / 1000}s...`);
          await page.waitForTimeout(this.cooldownMs);
        }
      }
    } finally {
      if (!isCDP) {
        this.log('Closing browser context...');
        await context.close();
      }
      this.log('Batch run finished.');
      this.printTimingReport();
    }
  }

  printTimingReport() {
    console.log('\n================================================================');
    console.log('              WAKELIT BATCH PRODUCTION TIMING REPORT            ');
    console.log('================================================================');
    if (this.timingLog.length === 0) {
      console.log('No generation timing records logged in this session.');
      console.log('================================================================\n');
      return;
    }

    console.log('| Scene ID  | Prompt Submit | Approval Wait | Gen Wait | Download | Total Time | File Size  |');
    console.log('|-----------|---------------|---------------|----------|----------|------------|------------|');
    for (const t of this.timingLog) {
      const pSub = `${(t.promptSubmitMs / 1000).toFixed(1)}s`.padEnd(13);
      const appW = `${(t.approvalWaitMs / 1000).toFixed(1)}s`.padEnd(13);
      const genW = `${(t.generationWaitMs / 1000).toFixed(1)}s`.padEnd(8);
      const dlW = `${(t.downloadMs / 1000).toFixed(1)}s`.padEnd(8);
      const totW = `${(t.totalMs / 1000).toFixed(1)}s`.padEnd(10);
      const sizeW = `${(t.fileSizeBytes / 1024).toFixed(1)} KB`.padEnd(10);
      console.log(`| ${t.sceneId.padEnd(9)} | ${pSub} | ${appW} | ${genW} | ${dlW} | ${totW} | ${sizeW} |`);
    }
    console.log('================================================================');
    console.log(`Total Data Downloaded: ${this.downloadManager.getTotalDataMB()} MB`);
    console.log('================================================================\n');
  }

  waitForKeyPress(promptText) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    return new Promise(resolve => {
      rl.question(promptText, () => {
        rl.close();
        resolve();
      });
    });
  }
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const projectName = args.find(a => !a.startsWith('--') && !/^\d+$/.test(a)) || 'sample-project';
  const runner = new FlowRunner(projectName);

  const useCDP = args.includes('--cdp');
  const limitArg = args.find(a => /^\d+$/.test(a));
  const limitScenes = limitArg ? parseInt(limitArg, 10) : null;

  if (args.includes('--login')) {
    runner.runLogin().catch(console.error);
  } else if (args.includes('--diagnostics')) {
    runner.launchBrowser(false).then(async ctx => {
      const page = ctx.pages()[0] || await ctx.newPage();
      await page.goto(runner.flowUrl, { timeout: 60000 }).catch(() => {});
      await runner.captureDiagnostics(page, 'manual');
      await ctx.close();
    }).catch(console.error);
  } else {
    runner.runBatch(useCDP, limitScenes).catch(console.error);
  }
}

module.exports = FlowRunner;
