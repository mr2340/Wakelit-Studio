const path = require('path');
const { chromium } = require('playwright');
const fs = require('fs');

async function downloadBothScenes() {
  const profileDir = path.resolve('chrome-profile');
  const context = await chromium.launchPersistentContext(profileDir, {
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: false,
    acceptDownloads: true,
    args: ['--no-first-run', '--no-default-browser-check']
  });

  const page = context.pages()[0] || await context.newPage();

  console.log('Navigating to Flow with retry...');
  let connected = false;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await page.goto('https://flow.google.com/project/a908dd54-b9dd-47e8-8bf9-1d76da938148', { waitUntil: 'domcontentloaded', timeout: 45000 });
      connected = true;
      break;
    } catch (e) {
      console.log(`Navigation attempt ${attempt} failed: ${e.message}. Retrying in 4s...`);
      await page.waitForTimeout(4000);
    }
  }
  if (!connected) throw new Error('Could not connect to Flow after 3 attempts.');
  await page.waitForTimeout(4000);

  const outDir = path.resolve('projects/the-beast-you-feed/generated/scenes');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const s1Path = path.join(outDir, 'scene_001.mp4');
  const s2Path = path.join(outDir, 'scene_002.mp4');

  async function downloadFromButton(btn, targetPath) {
    console.log(`Opening menu for ${path.basename(targetPath)}...`);
    await btn.scrollIntoViewIfNeeded().catch(() => {});
    await btn.click({ force: true });
    await page.waitForTimeout(800);

    const downloadItem = page.locator('[role="menuitem"]:has-text("Download")').first();
    console.log('Hovering/clicking Download menuitem...');
    await downloadItem.hover({ force: true });
    await page.waitForTimeout(500);
    await downloadItem.click({ force: true });
    await page.waitForTimeout(800);

    const subItem = page.locator('[role="menuitem"]:has-text("720p"), button:has-text("720p"), :text("720p Original size")').first();
    const isVis = await subItem.isVisible().catch(() => false);
    console.log('Is 720p option visible?', isVis);

    if (isVis) {
      console.log('Clicking 720p and capturing download...');
      const [download] = await Promise.all([
        page.waitForEvent('download', { timeout: 25000 }),
        subItem.click({ force: true })
      ]);
      console.log('Download started:', download.suggestedFilename());
      await download.saveAs(targetPath);
      console.log('SUCCESS! Saved to:', targetPath, 'Size:', fs.statSync(targetPath).size, 'bytes');
      return true;
    } else {
      console.log('720p option was not visible. Closing menu...');
      await page.keyboard.press('Escape').catch(() => {});
      return false;
    }
  }

  const moreBtns = page.locator('button[aria-label="More options"], button:has(mat-icon:has-text("more_vert"))');
  const count = await moreBtns.count();
  console.log(`Found ${count} "More options" buttons`);

  if (count >= 1) {
    await downloadFromButton(moreBtns.last(), s1Path);
    await page.waitForTimeout(2000);
  }

  if (count >= 2) {
    await downloadFromButton(moreBtns.nth(count - 2), s2Path);
  }

  await context.close();
}

downloadBothScenes().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
