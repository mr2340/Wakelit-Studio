const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const profileDir = path.resolve('chrome-profile');
  const context = await chromium.launchPersistentContext(profileDir, {
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: false,
    acceptDownloads: true
  });
  const page = context.pages()[0] || await context.newPage();
  await page.goto('https://flow.google.com/project/a908dd54-b9dd-47e8-8bf9-1d76da938148', { timeout: 30000 });
  await page.waitForTimeout(4000);

  const tiles = page.locator('flow-video-tile');
  const topTile = tiles.first();
  const box = await topTile.boundingBox();
  console.log('Hovering top tile at', box.x + box.width/2, box.y + box.height/2);
  await page.mouse.move(box.x + box.width/2, box.y + box.height/2);
  await page.waitForTimeout(600);

  const moreBtn = topTile.locator('button[aria-label="More options"]').first();
  await moreBtn.click({ force: true });
  await page.waitForTimeout(600);

  const dlItem = page.locator('[role="menuitem"]:has-text("Download")').first();
  await dlItem.hover({ force: true });
  await page.waitForTimeout(400);
  await dlItem.click({ force: true });
  await page.waitForTimeout(600);

  const resItem = page.locator('[role="menuitem"]:has-text("720p"), button:has-text("720p"), :text("720p Original size")').first();
  if (await resItem.isVisible()) {
    const targetFile = path.resolve('projects/the-beast-you-feed/generated/scenes/scene_010.mp4');
    const [download] = await Promise.all([
      page.waitForEvent('download', { timeout: 20000 }),
      resItem.click({ force: true })
    ]);
    console.log('Download started:', download.suggestedFilename());
    await download.saveAs(targetFile);
    console.log('Successfully saved to:', targetFile, fs.statSync(targetFile).size, 'bytes');
  }

  await context.close();
})();
