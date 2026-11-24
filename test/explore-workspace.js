const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const profileDir = path.resolve('./chrome-profile');
  console.log('Launching browser with profile...');
  const context = await chromium.launchPersistentContext(profileDir, {
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: false,
    viewport: null,
    ignoreDefaultArgs: ['--enable-automation', '--no-sandbox']
  });

  const page = context.pages()[0] || await context.newPage();
  console.log('Navigating to https://flow.google.com...');
  await page.goto('https://flow.google.com', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(4000);

  console.log('Current URL on landing:', page.url());

  // Check if we are on dashboard and click the newest project or New project
  const firstProjectLink = page.locator('a[href^="/project/"]').first();
  if (await firstProjectLink.isVisible({ timeout: 3000 }).catch(() => false)) {
    const href = await firstProjectLink.getAttribute('href');
    console.log(`Found existing project: ${href}. Clicking into it...`);
    await firstProjectLink.click();
  } else {
    console.log('Looking for "New project" button...');
    const newProjBtn = page.getByRole('button', { name: /new project/i });
    if (await newProjBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log('Clicking "New project"...');
      await newProjBtn.click();
    }
  }

  await page.waitForTimeout(6000);
  console.log('Workspace URL:', page.url());
  await page.screenshot({ path: 'projects/sample-project/logs/workspace_view.png', fullPage: true });
  const html = await page.content();
  fs.writeFileSync('projects/sample-project/logs/workspace_view.html', html, 'utf8');
  console.log('Workspace HTML and screenshot saved!');

  await context.close();
})().catch(console.error);
