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

  const tiles = page.locator('flow-video-tile');
  const tile0 = tiles.first();
  const stackIcon = tile0.locator('mat-icon:has-text("stacks"), button:has-text("stacks"), [aria-label*="stack" i]').first();

  console.log('Stack icon visible on tile 0?', await stackIcon.isVisible());
  if (await stackIcon.isVisible()) {
    await stackIcon.click({ force: true });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'projects/the-beast-you-feed/output/eval_frames/stack_clicked.png' });
    console.log('Clicked stack icon, captured screenshot.');
  }

  await context.close();
})();
