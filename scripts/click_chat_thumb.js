const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const context = await chromium.launchPersistentContext(path.resolve('chrome-profile'), {
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: false,
    acceptDownloads: true
  });
  const page = context.pages()[0] || await context.newPage();
  await page.goto('https://flow.google.com/project/a908dd54-b9dd-47e8-8bf9-1d76da938148');
  await page.waitForTimeout(4000);

  console.log('Hovering and clicking chat thumbnail at (800, 450)...');
  await page.mouse.move(800, 450);
  await page.waitForTimeout(500);
  await page.mouse.click(800, 450);
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'projects/the-beast-you-feed/output/eval_frames/chat_thumb_clicked.png' });
  await context.close();
})();
