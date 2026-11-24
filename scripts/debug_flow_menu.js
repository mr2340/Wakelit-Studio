const path = require('path');
const { chromium } = require('playwright');
const fs = require('fs');

async function debugFlowMenu() {
  const profileDir = path.resolve('chrome-profile');
  const context = await chromium.launchPersistentContext(profileDir, {
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: false,
    args: ['--no-first-run', '--no-default-browser-check']
  });

  const page = context.pages()[0] || await context.newPage();
  await page.goto('https://flow.google.com/project/a908dd54-b9dd-47e8-8bf9-1d76da938148', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(4000);

  // Take screenshot of canvas
  await page.screenshot({ path: 'debug_canvas_view.png' });
  console.log('Saved debug_canvas_view.png');

  // Find all cards with play_circle
  const playIcons = page.locator('mat-icon:has-text("play_circle")');
  const playCount = await playIcons.count();
  console.log(`Found ${playCount} play_circle icons on canvas`);

  if (playCount > 0) {
    const card = playIcons.last().locator('xpath=ancestor::*[contains(@class, "tile") or contains(@class, "card") or contains(@class, "container")][1]');
    await card.hover({ force: true });
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'debug_card_hovered.png' });
    console.log('Saved debug_card_hovered.png');

    const moreBtn = card.locator('button[aria-label="More options"], button:has(mat-icon:has-text("more_vert"))').first();
    console.log('More button visible inside card?', await moreBtn.isVisible());
    if (await moreBtn.isVisible()) {
      await moreBtn.click();
      await page.waitForTimeout(800);
      await page.screenshot({ path: 'debug_menu_opened.png' });
      console.log('Saved debug_menu_opened.png');

      const items = await page.locator('[role="menuitem"], .mat-mdc-menu-item').allTextContents();
      console.log('Open menu items:', items);
    }
  }

  await context.close();
}

debugFlowMenu().catch(console.error);
