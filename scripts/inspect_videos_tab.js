const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const context = await chromium.launchPersistentContext(path.resolve('chrome-profile'), {
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: false
  });
  const page = context.pages()[0] || await context.newPage();
  await page.goto('https://flow.google.com/project/a908dd54-b9dd-47e8-8bf9-1d76da938148');
  await page.waitForTimeout(4000);

  // Click 'Videos' in left sidebar
  const vidTab = page.locator('div:has-text("Videos")').filter({ hasText: /^Videos$/ }).first();
  if (await vidTab.isVisible()) {
    await vidTab.click();
    await page.waitForTimeout(2000);
  }

  // Find all cards or video tiles in the main area
  const items = page.locator('flow-video-tile');
  const count = await items.count();
  console.log(`Videos tab has ${count} tiles.`);

  for (let i = 0; i < count; i++) {
    const it = items.nth(i);
    const box = await it.boundingBox();
    const title = await it.locator('.title, h3, [role="heading"]').innerText().catch(() => '');
    console.log(`Video ${i} title: "${title}" at (${box ? Math.round(box.x) + ',' + Math.round(box.y) : 'null'})`);
  }

  await context.close();
})();
