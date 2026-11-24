const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.resolve('projects/the-beast-you-feed/output/downloaded_tiles');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

(async () => {
  const context = await chromium.launchPersistentContext(path.resolve('chrome-profile'), {
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: false,
    acceptDownloads: true
  });
  const page = context.pages()[0] || await context.newPage();
  await page.goto('https://flow.google.com/project/a908dd54-b9dd-47e8-8bf9-1d76da938148');
  await page.waitForTimeout(4000);

  const tiles = page.locator('flow-video-tile');
  const count = await tiles.count();
  console.log(`Found ${count} tiles on canvas. Beginning automated download of all tiles...`);

  for (let i = 0; i < count; i++) {
    const tile = tiles.nth(i);
    await tile.scrollIntoViewIfNeeded().catch(() => {});
    await page.waitForTimeout(500);

    const box = await tile.boundingBox();
    if (!box) continue;

    console.log(`\nProcessing Tile ${i} at (${Math.round(box.x)}, ${Math.round(box.y)})...`);
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(600);

    const moreBtn = tile.locator('button[aria-label="More options"]').first();
    if (!await moreBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
      console.log(`Tile ${i}: More options button not visible.`);
      continue;
    }

    await moreBtn.click({ force: true });
    await page.waitForTimeout(600);

    const dlItem = page.locator('[role="menuitem"]:has-text("Download")').first();
    if (!await dlItem.isVisible({ timeout: 1500 }).catch(() => false)) {
      console.log(`Tile ${i}: Download menu item not visible.`);
      await page.keyboard.press('Escape').catch(() => {});
      continue;
    }

    await dlItem.hover({ force: true });
    await page.waitForTimeout(400);
    await dlItem.click({ force: true });
    await page.waitForTimeout(600);

    const resItem = page.locator('[role="menuitem"]:has-text("720p"), button:has-text("720p"), :text("720p Original size")').first();
    if (await resItem.isVisible({ timeout: 2000 }).catch(() => false)) {
      const targetPath = path.join(OUT_DIR, `tile_${i}.mp4`);
      try {
        const [download] = await Promise.all([
          page.waitForEvent('download', { timeout: 25000 }),
          resItem.click({ force: true })
        ]);
        console.log(`Tile ${i} download started: ${download.suggestedFilename()}`);
        await download.saveAs(targetPath);
        console.log(`Tile ${i} saved: ${targetPath} (${fs.statSync(targetPath).size} bytes)`);
      } catch (err) {
        console.log(`Tile ${i} download error: ${err.message}`);
      }
    } else {
      console.log(`Tile ${i}: 720p resolution option not found.`);
      await page.keyboard.press('Escape').catch(() => {});
    }

    await page.waitForTimeout(1000);
  }

  await context.close();
  console.log('\nAll canvas tiles processed.');
})();
