const path = require('path');
const { chromium } = require('playwright');
const fs = require('fs');

async function testDownloadPattern() {
  const profileDir = path.resolve('chrome-profile');
  const context = await chromium.launchPersistentContext(profileDir, {
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: false,
    acceptDownloads: true,
    args: ['--no-first-run', '--no-default-browser-check']
  });

  const page = context.pages()[0] || await context.newPage();

  console.log('Navigating to Flow...');
  await page.goto('https://flow.google.com/project/a908dd54-b9dd-47e8-8bf9-1d76da938148', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(3000);

  // Set up download listener FIRST
  console.log('Attaching download listener...');
  const downloadPromise = page.waitForEvent('download', { timeout: 30000 });

  // Trigger download via UI
  console.log('Triggering download via context menu...');
  const moreBtns = page.locator('button[aria-label="More options"], button:has(mat-icon:has-text("more_vert"))');
  const btn = moreBtns.last();
  await btn.click({ force: true });
  await page.waitForTimeout(500);

  const downloadItem = page.locator('[role="menuitem"]:has-text("Download")').first();
  await downloadItem.click({ force: true });
  await page.waitForTimeout(500);

  const resItem = page.locator('[role="menuitem"]:has-text("720p"), button:has-text("720p"), :text("720p Original size")').first();
  await resItem.click({ force: true });

  console.log('Awaiting download event resolution...');
  const download = await downloadPromise;
  console.log('SUCCESS! Download resolved:', download.suggestedFilename());

  const targetPath = path.resolve('projects/the-beast-you-feed/generated/scenes/scene_001.mp4');
  await download.saveAs(targetPath);
  console.log('Saved to:', targetPath, 'Size:', fs.statSync(targetPath).size, 'bytes');

  await context.close();
}

testDownloadPattern().catch(console.error);
