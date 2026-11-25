const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const context = await chromium.launchPersistentContext(path.resolve('chrome-profile'), {
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: false,
    acceptDownloads: true
  });
  const page = context.pages()[0] || await context.newPage();
  await page.goto('https://flow.google.com/project/a908dd54-b9dd-47e8-8bf9-1d76da938148');
  await page.waitForTimeout(4000);

  // Look for video elements inside the chat panel (x > 700)
  const chatVideos = page.locator('video, flow-video-tile, .video-preview, .card');
  const count = await chatVideos.count();
  console.log(`Checking ${count} candidates across page...`);

  for (let i = 0; i < count; i++) {
    const el = chatVideos.nth(i);
    const box = await el.boundingBox().catch(() => null);
    if (box && box.x > 700 && box.width > 100 && box.height > 60) {
      console.log(`Found chat preview card at (${Math.round(box.x)}, ${Math.round(box.y)}, ${Math.round(box.width)}x${Math.round(box.height)})`);
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.waitForTimeout(500);

      const moreBtn = el.locator('button[aria-label="More options"], button:has(mat-icon:has-text("more_vert"))').first();
      if (await moreBtn.isVisible().catch(() => false)) {
        console.log('Clicking more options on chat card...');
        await moreBtn.click({ force: true });
        await page.waitForTimeout(500);
      }
    }
  }

  await page.screenshot({ path: 'projects/the-beast-you-feed/output/eval_frames/chat_card_hover.png' });
  await context.close();
})();
