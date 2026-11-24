const path = require('path');
const { chromium } = require('playwright');
const fs = require('fs');

async function downloadCards() {
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

  const outDir = path.resolve('projects/the-beast-you-feed/generated/scenes');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const tiles = page.locator('flow-video-tile');
  const count = await tiles.count();
  console.log('Video tiles found:', count);

  async function downloadTile(tile, targetFile) {
    const box = await tile.boundingBox();
    console.log(`Hovering tile for ${path.basename(targetFile)} at (${box.x + box.width/2}, ${box.y + box.height/2})...`);
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(600);

    const moreBtn = tile.locator('button[aria-label="More options"]').first();
    console.log('Clicking More options...');
    await moreBtn.click({ force: true });
    await page.waitForTimeout(600);

    // Look for Download menu item
    const dlItem = page.locator('[role="menuitem"]:has-text("Download")').first();
    console.log('Hovering/clicking Download...');
    await dlItem.hover({ force: true });
    await page.waitForTimeout(400);
    await dlItem.click({ force: true });
    await page.waitForTimeout(600);

    const subItem = page.locator('[role="menuitem"]:has-text("720p"), button:has-text("720p"), :text("720p Original size")').first();
    console.log('Is 720p visible?', await subItem.isVisible());

    if (await subItem.isVisible()) {
      const [download] = await Promise.all([
        page.waitForEvent('download', { timeout: 20000 }),
        subItem.click({ force: true })
      ]);
      console.log('Download started:', download.suggestedFilename());
      await download.saveAs(targetFile);
      console.log(`Successfully saved ${targetFile} (${fs.statSync(targetFile).size} bytes)`);
      return true;
    }
    return false;
  }

  // Card 0 (top card) -> scene_001.mp4
  const s1Path = path.join(outDir, 'scene_001.mp4');
  await downloadTile(tiles.nth(0), s1Path);

  await page.keyboard.press('Escape').catch(() => {});
  await page.waitForTimeout(1500);

  // Card 1 (second card) -> scene_002.mp4
  const s2Path = path.join(outDir, 'scene_002.mp4');
  await downloadTile(tiles.nth(1), s2Path);

  await context.close();
}

downloadCards().catch(console.error);
