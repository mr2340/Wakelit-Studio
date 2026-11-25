const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const context = await chromium.launchPersistentContext(path.resolve('chrome-profile'), {
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: false
  });
  const page = context.pages()[0] || await context.newPage();
  await page.goto('https://flow.google.com/project/a908dd54-b9dd-47e8-8bf9-1d76da938148');
  await page.waitForTimeout(6000);

  const tiles = page.locator('flow-video-tile');
  const count = await tiles.count();
  console.log(`Canvas now has ${count} tiles.`);

  await page.screenshot({ path: 'projects/the-beast-you-feed/output/eval_frames/flow_refreshed.png' });
  await context.close();
})();
