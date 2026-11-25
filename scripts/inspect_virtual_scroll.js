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

  const scrollInfo = await page.evaluate(async () => {
    const vp = document.querySelector('cdk-virtual-scroll-viewport');
    if (!vp) return 'No viewport found';

    const seenTiles = new Set();
    const scrollHeight = vp.scrollHeight;

    for (let pos = 0; pos <= scrollHeight; pos += 500) {
      vp.scrollTop = pos;
      await new Promise(r => setTimeout(r, 400));
      const tiles = document.querySelectorAll('flow-video-tile');
      tiles.forEach(t => {
        const text = t.innerText.slice(0, 40).replace(/\n/g, ' ');
        seenTiles.add(text);
      });
    }

    return {
      scrollHeight,
      tileCountFound: seenTiles.size,
      tiles: Array.from(seenTiles)
    };
  });

  console.log('Virtual scroll inspection:', JSON.stringify(scrollInfo, null, 2));
  await context.close();
})();
