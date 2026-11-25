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
  const videosBtn = page.getByText('Videos', { exact: true }).first();
  console.log('Videos button visible?', await videosBtn.isVisible());
  if (await videosBtn.isVisible()) {
    await videosBtn.click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'projects/the-beast-you-feed/output/eval_frames/flow_videos_view.png' });
    const count = await page.locator('flow-video-tile').count();
    console.log('Videos count on page:', count);
  }
  await context.close();
})();
