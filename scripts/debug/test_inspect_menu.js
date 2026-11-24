const path = require('path');
const { chromium } = require('playwright');
const fs = require('fs');

async function inspectMenu() {
  const profileDir = path.resolve('chrome-profile');
  const context = await chromium.launchPersistentContext(profileDir, {
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: false,
    acceptDownloads: true,
    args: ['--no-first-run', '--no-default-browser-check']
  });

  const page = context.pages()[0] || await context.newPage();
  
  // Listen for downloads
  page.on('download', d => console.log('EVENT: download started ->', d.suggestedFilename()));
  
  // Listen for response / network
  page.on('response', resp => {
    const url = resp.url();
    if (url.includes('.mp4') || url.includes('video') || url.includes('download')) {
      console.log('NETWORK RESPONSE:', resp.status(), url.slice(0, 100));
    }
  });

  console.log('Navigating to Flow...');
  await page.goto('https://flow.google.com/project/a908dd54-b9dd-47e8-8bf9-1d76da938148', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(5000);

  const moreBtns = page.locator('button[aria-label="More options"], button:has(mat-icon:has-text("more_vert"))');
  const count = await moreBtns.count();
  console.log('More options count:', count);

  if (count > 0) {
    const btn = moreBtns.last();
    await btn.scrollIntoViewIfNeeded().catch(() => {});
    await btn.click({ force: true });
    await page.waitForTimeout(1000);

    await page.screenshot({ path: 'logs_inspect_menu_open.png' });
    console.log('Screenshot saved: logs_inspect_menu_open.png');

    const menuItems = await page.locator('[role="menuitem"]').allTextContents().catch(() => []);
    console.log('Menu items detected:', menuItems);

    const downloadItem = page.locator('[role="menuitem"]:has-text("Download")').first();
    if (await downloadItem.isVisible({ timeout: 2000 }).catch(() => false)) {
      console.log('Clicking Download...');
      await downloadItem.click({ force: true });
      await page.waitForTimeout(4000);
      await page.screenshot({ path: 'logs_inspect_after_download_click.png' });
      console.log('Screenshot saved: logs_inspect_after_download_click.png');
    }
  }

  await context.close();
}

inspectMenu().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
