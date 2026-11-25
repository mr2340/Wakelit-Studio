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

  // Evaluate element at point (800, 450)
  const info = await page.evaluate(() => {
    const el = document.elementFromPoint(800, 450);
    if (!el) return 'No element at point';
    let curr = el;
    const chain = [];
    while (curr && chain.length < 6) {
      chain.push({
        tagName: curr.tagName,
        className: curr.className,
        role: curr.getAttribute('role'),
        ariaLabel: curr.getAttribute('aria-label')
      });
      curr = curr.parentElement;
    }
    return chain;
  });

  console.log('Element hierarchy at (800, 450):', JSON.stringify(info, null, 2));
  await context.close();
})();
