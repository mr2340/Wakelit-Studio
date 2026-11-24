const path = require('path');
const { chromium } = require('playwright');
const fs = require('fs');

async function downloadScenesClean() {
  const profileDir = path.resolve('chrome-profile');
  const context = await chromium.launchPersistentContext(profileDir, {
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: false,
    acceptDownloads: true,
    args: ['--no-first-run', '--no-default-browser-check']
  });

  const page = context.pages()[0] || await context.newPage();

  console.log('Navigating to Flow workspace...');
  await page.goto('https://flow.google.com/project/a908dd54-b9dd-47e8-8bf9-1d76da938148', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(4000);

  const outDir = path.resolve('projects/the-beast-you-feed/generated/scenes');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const s1Path = path.join(outDir, 'scene_001.mp4');
  const s2Path = path.join(outDir, 'scene_002.mp4');

  async function getDownloadForCard(btn) {
    await btn.scrollIntoViewIfNeeded();
    await btn.click({ force: true });
    await page.waitForTimeout(600);

    // Look for 720p option directly or under Download
    let opt = page.locator(':text("720p Original size"), [role="menuitem"]:has-text("720p")').first();
    if (!await opt.isVisible().catch(() => false)) {
      const dlBtn = page.locator('[role="menuitem"]:has-text("Download")').first();
      await dlBtn.hover({ force: true }).catch(() => {});
      await dlBtn.click({ force: true }).catch(() => {});
      await page.waitForTimeout(600);
      opt = page.locator(':text("720p Original size"), [role="menuitem"]:has-text("720p")').first();
    }

    if (await opt.isVisible().catch(() => false)) {
      const [download] = await Promise.all([
        page.waitForEvent('download', { timeout: 20000 }),
        opt.click({ force: true })
      ]);
      return download;
    }
    return null;
  }

  const moreBtns = page.locator('button[aria-label="More options"], button:has(mat-icon:has-text("more_vert"))');
  const total = await moreBtns.count();
  console.log(`Total video cards on canvas: ${total}`);

  if (total >= 1) {
    console.log('Downloading scene_001.mp4 from newest card...');
    const d1 = await getDownloadForCard(moreBtns.last());
    if (d1) {
      await d1.saveAs(s1Path);
      console.log(`Saved scene_001.mp4 (${fs.statSync(s1Path).size} bytes)`);
    }
    await page.keyboard.press('Escape').catch(() => {});
    await page.waitForTimeout(1500);
  }

  if (total >= 2) {
    console.log('Downloading scene_002.mp4 from second newest card...');
    const d2 = await getDownloadForCard(moreBtns.nth(total - 2));
    if (d2) {
      await d2.saveAs(s2Path);
      console.log(`Saved scene_002.mp4 (${fs.statSync(s2Path).size} bytes)`);
    }
  }

  console.log('Download process complete.');
  await context.close();
}

downloadScenesClean().catch(console.error);
