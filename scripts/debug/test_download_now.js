const path = require('path');
const { chromium } = require('playwright');
const fs = require('fs');

async function testDownloadNow() {
  const profileDir = path.resolve(__dirname, 'chrome-profile');
  const context = await chromium.launchPersistentContext(profileDir, {
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: false,
    args: ['--no-first-run', '--no-default-browser-check']
  });

  const page = context.pages()[0] || await context.newPage();
  await page.goto('https://flow.google.com/project/a908dd54-b9dd-47e8-8bf9-1d76da938148', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(4000);

  // Find all cards with video / play_circle
  console.log('Searching for video cards on canvas...');
  const playIcons = page.locator('mat-icon:has-text("play_circle")');
  const playCount = await playIcons.count();
  console.log(`Found ${playCount} play_circle icons`);

  // Target the first/last card with play_circle
  if (playCount > 0) {
    const card = playIcons.last().locator('xpath=ancestor::*[contains(@class, "media") or contains(@class, "card") or contains(@class, "item") or contains(@class, "tile")][1]');
    console.log('Hovering over video card...');
    await card.hover({ force: true }).catch(() => {});
    await page.waitForTimeout(1000);
  }

  // Find "More options" buttons
  const moreBtns = page.locator('button[aria-label="More options"], button:has(mat-icon:has-text("more_vert")), button:has-text("more_vert")');
  const moreCount = await moreBtns.count();
  console.log(`Found ${moreCount} "More options" buttons`);

  if (moreCount > 0) {
    const targetBtn = moreBtns.last();
    console.log('Clicking "More options" button with force: true...');
    await targetBtn.click({ force: true });
    await page.waitForTimeout(1000);

    // Look for Download option
    const downloadItem = page.locator('[role="menuitem"]:has-text("Download"), .mat-mdc-menu-item:has-text("Download"), :text("Download")').first();
    const isDownloadVisible = await downloadItem.isVisible({ timeout: 2000 }).catch(() => false);
    console.log('Download menu item visible:', isDownloadVisible);

    if (isDownloadVisible) {
      console.log('Triggering download...');
      const targetDir = path.resolve('projects/you-said-tomorrow-yesterday/generated/scenes');
      if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
      const targetFile = path.join(targetDir, 'scene_001.mp4');

      const [download] = await Promise.all([
        page.waitForEvent('download', { timeout: 30000 }),
        downloadItem.click({ force: true })
      ]);

      console.log('Download initiated! Suggested filename:', download.suggestedFilename());
      await download.saveAs(targetFile);
      console.log('Saved downloaded video to:', targetFile);
      console.log('File size:', fs.statSync(targetFile).size, 'bytes');
    }
  }

  await context.close();
}

testDownloadNow().catch(err => {
  console.error('Download error:', err.message);
  process.exit(1);
});
