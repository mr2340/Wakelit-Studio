const path = require('path');
const { chromium } = require('playwright');
const fs = require('fs');

async function testClickCard() {
  const profileDir = path.resolve('chrome-profile');
  const context = await chromium.launchPersistentContext(profileDir, {
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: false,
    acceptDownloads: true,
    args: ['--no-first-run', '--no-default-browser-check']
  });

  const page = context.pages()[0] || await context.newPage();
  await page.goto('https://flow.google.com/project/a908dd54-b9dd-47e8-8bf9-1d76da938148', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(4000);

  // Find all flow-video-tile elements
  const tiles = page.locator('flow-video-tile');
  const count = await tiles.count();
  console.log('Total flow-video-tile count:', count);

  if (count > 0) {
    const tile = tiles.first();
    const box = await tile.boundingBox();
    console.log('First tile bounding box:', box);

    // Hover in center of tile
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'debug_tile_center_hover.png' });
    console.log('Saved debug_tile_center_hover.png');

    // Also look for buttons inside or adjacent to tile
    const buttons = await page.locator('button:visible').all();
    console.log(`Visible buttons on page: ${buttons.length}`);
    for (let i = 0; i < buttons.length; i++) {
      const aria = await buttons[i].getAttribute('aria-label').catch(() => '');
      const text = await buttons[i].innerText().catch(() => '');
      if (aria || text) {
        console.log(` Button ${i}: aria="${aria}", text="${text.replace(/\n/g, ' ')}"`);
      }
    }
  }

  await context.close();
}

testClickCard().catch(console.error);
