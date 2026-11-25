const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const PROJECT_DIR = path.resolve('projects/the-beast-you-feed');
const SCENES_FILE = path.join(PROJECT_DIR, 'planning/scenes.json');
const FLOW_URL = 'https://flow.google.com/project/a908dd54-b9dd-47e8-8bf9-1d76da938148';
const PROFILE_DIR = path.resolve('chrome-profile');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function loadScenes() {
  return JSON.parse(fs.readFileSync(SCENES_FILE, 'utf8'));
}

function updateScene(sceneId, updates) {
  const scenes = loadScenes();
  const idx = scenes.findIndex(s => s.id === sceneId);
  if (idx !== -1) {
    scenes[idx] = { ...scenes[idx], ...updates, updatedAt: new Date().toISOString() };
    fs.writeFileSync(SCENES_FILE, JSON.stringify(scenes, null, 2), 'utf8');
  }
}

async function findPromptInput(page) {
  const candidateSelectors = [
    'div.ProseMirror[contenteditable="true"]',
    'div[role="textbox"][aria-label*="What do you want to create" i]',
    'div[role="textbox"]',
    'textarea[placeholder*="prompt" i]',
    'textarea'
  ];
  for (const sel of candidateSelectors) {
    try {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 1500 })) return el;
    } catch (_) {}
  }
  return null;
}

async function findSubmitButton(page) {
  const candidateSelectors = [
    'span[submitbutton] button',
    '.submit-button-slot button',
    'flow-generate-icon-button button',
    'button:has(mat-icon:has-text("arrow_forward"))',
    'button:has-text("arrow_forward")',
    'button[aria-label*="generate" i]',
    'button[type="submit"]'
  ];
  for (const sel of candidateSelectors) {
    try {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 1000 })) return el;
    } catch (_) {}
  }
  return null;
}

async function getTopCanvasTile(page) {
  const tiles = page.locator('flow-video-tile');
  const count = await tiles.count();
  for (let i = 0; i < count; i++) {
    const tile = tiles.nth(i);
    const box = await tile.boundingBox().catch(() => null);
    // Canvas tiles are wide (> 300px) and on the left/center canvas (x < 1000)
    if (box && box.width > 250 && box.x < 1000) {
      return { tile, box };
    }
  }
  return null;
}

async function downloadTopTile(page, targetPath) {
  const top = await getTopCanvasTile(page);
  if (!top) return false;

  const { tile, box } = top;
  // Hover over the center of the canvas video card
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForTimeout(600);

  const moreBtn = tile.locator('button[aria-label="More options"]').first();
  if (!await moreBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
    return false;
  }

  await moreBtn.click({ force: true });
  await page.waitForTimeout(600);

  const dlItem = page.locator('[role="menuitem"]:has-text("Download")').first();
  if (!await dlItem.isVisible({ timeout: 1500 }).catch(() => false)) {
    await page.keyboard.press('Escape').catch(() => {});
    return false;
  }

  await dlItem.hover({ force: true });
  await page.waitForTimeout(400);
  await dlItem.click({ force: true });
  await page.waitForTimeout(600);

  const resItem = page.locator('[role="menuitem"]:has-text("720p"), button:has-text("720p"), :text("720p Original size")').first();
  if (await resItem.isVisible({ timeout: 2000 }).catch(() => false)) {
    const [download] = await Promise.all([
      page.waitForEvent('download', { timeout: 30000 }),
      resItem.click({ force: true })
    ]);
    console.log(`[DownloadManager] Download started: ${download.suggestedFilename()}`);
    await download.saveAs(targetPath);
    const size = fs.statSync(targetPath).size;
    console.log(`[DownloadManager] Saved ${targetPath} (${size} bytes)`);
    return size > 100000;
  }

  await page.keyboard.press('Escape').catch(() => {});
  return false;
}

(async () => {
  console.log('=====================================================');
  console.log('       WAKELIT HIGH-FIDELITY BATCH SCENE GENERATOR   ');
  console.log('=====================================================');

  const scenes = loadScenes();
  const pending = scenes.filter(s => {
    if (s.status === 'VERIFIED') return false;
    if (s.type === 'black_screen') return false;
    const p = path.join(PROJECT_DIR, 'generated/scenes', s.filename);
    if (fs.existsSync(p) && fs.statSync(p).size > 100000) return false;
    return true;
  });

  console.log(`Pending scenes to generate: ${pending.length}`);
  if (pending.length === 0) {
    console.log('All visual scenes are already generated and verified!');
    return;
  }

  console.log('Launching persistent Chrome profile...');
  const context = await chromium.launchPersistentContext(PROFILE_DIR, {
    executablePath: CHROME_PATH,
    headless: false,
    viewport: null,
    acceptDownloads: true
  });

  const page = context.pages()[0] || await context.newPage();
  console.log(`Navigating to project workspace: ${FLOW_URL}`);
  await page.goto(FLOW_URL, { timeout: 45000 });
  await page.waitForTimeout(4000);

  for (let i = 0; i < pending.length; i++) {
    const scene = pending[i];
    const targetFile = path.join(PROJECT_DIR, 'generated/scenes', scene.filename);
    console.log(`\n-----------------------------------------------------`);
    console.log(`Generating Scene [${i + 1}/${pending.length}]: ${scene.id} (${scene.filename})`);
    console.log(`Phase: ${scene.phase}`);
    console.log(`Prompt preview: ${scene.prompt.slice(0, 75)}...`);

    const promptInput = await findPromptInput(page);
    if (!promptInput) {
      console.error('ERROR: Prompt input not found on page.');
      break;
    }

    updateScene(scene.id, { status: 'SUBMITTED', submittedAt: new Date().toISOString() });

    await promptInput.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await page.waitForTimeout(200);
    await page.keyboard.insertText(scene.prompt);
    await page.waitForTimeout(400);

    const submitBtn = await findSubmitButton(page);
    if (submitBtn) {
      console.log('Clicking submit button...');
      await submitBtn.click();
    } else {
      console.log('Sending Enter key...');
      await page.keyboard.press('Enter');
    }

    updateScene(scene.id, { status: 'GENERATING', generationStartedAt: new Date().toISOString() });

    // Handle credit dialog if it pops up
    for (let c = 0; c < 5; c++) {
      await page.waitForTimeout(1000);
      const approveRadio = page.locator('[role="radio"][aria-label*="Always approve in project" i], .option-row:not(.read-only):has-text("Always approve in project")').last();
      if (await approveRadio.isVisible().catch(() => false)) {
        console.log('Approving credit confirmation dialog...');
        await approveRadio.click({ force: true });
        break;
      }
    }

    // Wait for generation to finish (typically 35-50 seconds)
    console.log('Waiting 30s initial generation warmup...');
    await page.waitForTimeout(30000);

    console.log('Polling for completed download menu...');
    let downloaded = false;
    const pollStart = Date.now();
    const maxPollMs = 120000; // 2 minutes max per clip

    while (!downloaded && (Date.now() - pollStart < maxPollMs)) {
      try {
        downloaded = await downloadTopTile(page, targetFile);
      } catch (err) {
        console.log(`Polling check error: ${err.message}`);
      }
      if (!downloaded) {
        await page.waitForTimeout(4000);
      }
    }

    if (downloaded) {
      const stats = fs.statSync(targetFile);
      console.log(`SUCCESS: ${scene.filename} generated & saved (${stats.size} bytes)!`);
      updateScene(scene.id, {
        status: 'VERIFIED',
        completedAt: new Date().toISOString(),
        fileSizeBytes: stats.size,
        targetFile: targetFile,
        fileExists: true
      });
    } else {
      console.error(`FAILED to download ${scene.filename} within timeout.`);
      updateScene(scene.id, { status: 'FAILED' });
    }

    console.log('Applying 3s cooldown before next scene...');
    await page.waitForTimeout(3000);
  }

  await context.close();
  console.log('\n=====================================================');
  console.log('Batch run complete.');
  console.log('=====================================================');
})();
