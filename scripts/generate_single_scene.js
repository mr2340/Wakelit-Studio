const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const PROJECT_DIR = path.resolve('projects/the-beast-you-feed');
const SCENES_FILE = path.join(PROJECT_DIR, 'planning/scenes.json');
const FLOW_URL = 'https://flow.google.com/project/a908dd54-b9dd-47e8-8bf9-1d76da938148';
const PROFILE_DIR = path.resolve('chrome-profile');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const sceneId = process.argv[2];
if (!sceneId) {
  console.error('Usage: node scripts/generate_single_scene.js <scene_id>');
  process.exit(1);
}

const scenes = JSON.parse(fs.readFileSync(SCENES_FILE, 'utf8'));
const scene = scenes.find(s => s.id === sceneId);
if (!scene) {
  console.error(`Scene ${sceneId} not found in scenes.json`);
  process.exit(1);
}

const targetFile = path.join(PROJECT_DIR, 'generated/scenes', scene.filename);

(async () => {
  console.log(`=====================================================`);
  console.log(`GENERATING SCENE: ${scene.id} (${scene.filename})`);
  console.log(`Phase: ${scene.phase}`);
  console.log(`Prompt: ${scene.prompt.slice(0, 100)}...`);
  console.log(`=====================================================`);

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

  // Find prompt input
  const promptInput = page.locator('div.ProseMirror[contenteditable="true"], div[role="textbox"]').first();
  if (!await promptInput.isVisible({ timeout: 5000 }).catch(() => false)) {
    console.error('Prompt input not found!');
    await context.close();
    process.exit(1);
  }

  console.log('Submitting prompt to Flow...');
  await promptInput.click();
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Backspace');
  await page.waitForTimeout(200);
  await page.keyboard.insertText(scene.prompt);
  await page.waitForTimeout(400);

  const submitBtn = page.locator('span[submitbutton] button, button:has(mat-icon:has-text("arrow_forward")), button[aria-label*="generate" i]').first();
  if (await submitBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
    await submitBtn.click();
  } else {
    await page.keyboard.press('Enter');
  }

  // Check for credit approval radio
  for (let c = 0; c < 5; c++) {
    await page.waitForTimeout(1000);
    const approveRadio = page.locator('[role="radio"][aria-label*="Always approve in project" i], .option-row:not(.read-only):has-text("Always approve in project")').last();
    if (await approveRadio.isVisible().catch(() => false)) {
      console.log('Approving credit confirmation dialog...');
      await approveRadio.click({ force: true });
      break;
    }
  }

  console.log('Waiting 45 seconds for Flow generation to complete...');
  await page.waitForTimeout(45000);

  // Poll for top tile download menu
  console.log('Attempting download from top canvas card...');
  let downloaded = false;
  const pollStart = Date.now();

  while (!downloaded && (Date.now() - pollStart < 60000)) {
    const tiles = page.locator('flow-video-tile');
    const topTile = tiles.first();
    const box = await topTile.boundingBox().catch(() => null);

    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.waitForTimeout(600);

      const moreBtn = topTile.locator('button[aria-label="More options"]').first();
      if (await moreBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
        await moreBtn.click({ force: true });
        await page.waitForTimeout(600);

        const dlItem = page.locator('[role="menuitem"]:has-text("Download")').first();
        if (await dlItem.isVisible({ timeout: 1500 }).catch(() => false)) {
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
            console.log(`Download started: ${download.suggestedFilename()}`);
            await download.saveAs(targetFile);
            const size = fs.statSync(targetFile).size;
            console.log(`Saved ${targetFile} (${size} bytes)`);
            downloaded = size > 100000;
          }
        }
        await page.keyboard.press('Escape').catch(() => {});
      }
    }
    if (!downloaded) {
      console.log('Still rendering or menu not ready, waiting 5s...');
      await page.waitForTimeout(5000);
    }
  }

  await context.close();

  if (downloaded) {
    console.log(`SUCCESS: Scene ${scene.id} verified!`);
    const evalFrame = path.join(PROJECT_DIR, 'output/eval_frames', `${scene.id}_eval.jpg`);
    try {
      execSync(`ffmpeg -y -ss 00:00:02 -i "${targetFile}" -vframes 1 -q:v 2 "${evalFrame}"`, { stdio: 'ignore' });
      console.log(`Extracted eval frame: ${evalFrame}`);
    } catch (_) {}
  } else {
    console.error(`FAILED to download Scene ${scene.id}`);
    process.exit(1);
  }
})();
