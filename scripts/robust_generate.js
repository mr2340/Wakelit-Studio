const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const PROJECT_DIR = path.resolve('projects/the-beast-you-feed');
const SCENES_FILE = path.join(PROJECT_DIR, 'planning/scenes.json');
const FLOW_URL = 'https://flow.google.com/project/a908dd54-b9dd-47e8-8bf9-1d76da938148';
const PROFILE_DIR = path.resolve('chrome-profile');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const sceneId = process.argv[2] || 'scene_010';
const scenes = JSON.parse(fs.readFileSync(SCENES_FILE, 'utf8'));
const scene = scenes.find(s => s.id === sceneId);
const targetFile = path.join(PROJECT_DIR, 'generated/scenes', scene.filename);

(async () => {
  console.log(`Submitting ${scene.id}: ${scene.phase}`);
  const context = await chromium.launchPersistentContext(PROFILE_DIR, {
    executablePath: CHROME_PATH,
    headless: false,
    viewport: null,
    acceptDownloads: true
  });

  const page = context.pages()[0] || await context.newPage();
  await page.goto(FLOW_URL, { timeout: 45000 });
  await page.waitForTimeout(4000);

  const initialCount = await page.locator('flow-video-tile').count();
  console.log(`Initial canvas tile count: ${initialCount}`);

  const promptInput = page.locator('div.ProseMirror[contenteditable="true"], div[role="textbox"]').first();
  await promptInput.click();
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Backspace');
  await page.waitForTimeout(300);
  await page.keyboard.insertText(scene.prompt);
  await page.waitForTimeout(1000);

  // Find active submit button
  const submitBtn = page.locator('span[submitbutton] button, button:has(mat-icon:has-text("arrow_forward")), button[aria-label*="generate" i], button[type="submit"]').first();
  console.log('Submit button visible?', await submitBtn.isVisible());
  console.log('Submit button disabled?', await submitBtn.getAttribute('disabled'), await submitBtn.getAttribute('aria-disabled'));

  // Click submit
  if (await submitBtn.isVisible()) {
    await submitBtn.click({ force: true });
    console.log('Clicked submit button.');
  } else {
    await page.keyboard.press('Enter');
    console.log('Pressed Enter.');
  }

  // Handle credit approval dialog
  for (let c = 0; c < 6; c++) {
    await page.waitForTimeout(1000);
    const approveRadio = page.locator('[role="radio"][aria-label*="Always approve in project" i], .option-row:not(.read-only):has-text("Always approve in project"), [role="radio"][aria-label="Approve"]').last();
    if (await approveRadio.isVisible().catch(() => false)) {
      console.log('Clicked credit approval.');
      await approveRadio.click({ force: true });
      break;
    }
  }

  console.log('Waiting 50 seconds for Flow generation to complete...');
  await page.waitForTimeout(50000);

  // Try downloading top tile
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
      console.log('Still rendering, waiting 5s...');
      await page.waitForTimeout(5000);
    }
  }

  await context.close();

  if (downloaded) {
    const evalFrame = path.join(PROJECT_DIR, 'output/eval_frames', `${scene.id}_eval.jpg`);
    execSync(`ffmpeg -y -ss 00:00:02 -i "${targetFile}" -vframes 1 -q:v 2 "${evalFrame}"`, { stdio: 'ignore' });
    console.log(`SUCCESS! Eval frame saved to ${evalFrame}`);
  } else {
    console.log('Could not download newly generated tile.');
  }
})();
