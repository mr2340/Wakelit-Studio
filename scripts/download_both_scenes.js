const path = require('path');
const { chromium } = require('playwright');
const fs = require('fs');

async function downloadBothScenes() {
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

  const moreBtns = page.locator('button[aria-label="More options"], button:has(mat-icon:has-text("more_vert"))');
  const count = await moreBtns.count();
  console.log(`Found ${count} video cards with "More options" on canvas.`);

  if (count < 2) {
    console.log('Fewer than 2 cards found. Generating second card if needed...');
  }

  const outDir = path.resolve('projects/the-beast-you-feed/generated/scenes');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // Download the last card as scene_001.mp4 (or whichever target)
  async function downloadCard(btnLocator, targetPath) {
    console.log(`\nTriggering download for: ${path.basename(targetPath)}`);
    await btnLocator.click({ force: true });
    await page.waitForTimeout(600);

    const downloadItem = page.locator('[role="menuitem"]:has-text("Download")').first();
    await downloadItem.hover({ force: true });
    await page.waitForTimeout(400);
    await downloadItem.click({ force: true });
    await page.waitForTimeout(600);

    const subItem = page.locator('[role="menuitem"]:has-text("720p"), button:has-text("720p"), :text("720p Original size")').first();
    const isVisible = await subItem.isVisible().catch(() => false);
    console.log('Is 720p option visible?', isVisible);

    if (isVisible) {
      const [download] = await Promise.all([
        page.waitForEvent('download', { timeout: 20000 }),
        subItem.click({ force: true })
      ]);
      console.log('Download started:', download.suggestedFilename());
      await download.saveAs(targetPath);
      console.log(`Saved: ${targetPath} (${fs.statSync(targetPath).size} bytes)`);
      return true;
    }
    return false;
  }

  if (count >= 1) {
    const s1Path = path.join(outDir, 'scene_001.mp4');
    await downloadCard(moreBtns.nth(count - 1), s1Path);
    await page.waitForTimeout(2000);
  }

  if (count >= 2) {
    const s2Path = path.join(outDir, 'scene_002.mp4');
    await downloadCard(moreBtns.nth(count - 2), s2Path);
  } else {
    // If only 1 card exists on canvas, submit Scene 2 prompt!
    console.log('\nSubmitting Scene 2 prompt to generate second clip...');
    const promptInput = page.locator('div.ProseMirror[contenteditable="true"]').first();
    const scene2Prompt = `Use the attached character Ayo exactly as drawn in the master reference image. 2D flat minimalist cartoon animation, flat clean illustrated shapes, thin hand-drawn outline, zero 3D shading. Setting is dark minimalist bedroom with dormant running shoes by the closed door and a blank sketchbook on desk, flat side-on theatrical stage with no deep perspective. Medium shot, slight side angle, locked camera, 2.39:1 widescreen letterbox composition. Ayo is a stylized minimalist character: round deep brown head #613729, mustard ochre hoodie #D2A23E with collar fold down, grey trousers #666668, white shoes #EDEEF0, mitten hands with thumb bump. No neck, no ears, no nose, no individual fingers, no hair. Ayo glances toward the dormant shoes by the door and blank sketchbook, but his mitten hand lingers hesitating on the mouse. Facial expression: guilty realization, worried curved eyebrows, subtle slow blink over 4 frames, shallow breathing. Lighting: Dark slate navy shadows with cold blue desktop reflection. NEGATIVE CONSTRAINTS: strictly no 3D rendering, no CGI, no Octane render, no Unreal Engine, no photorealistic skin textures, no volumetric specular shading, no glossy highlights, no claymation or plastic vinyl shine, no realistic human anatomy, no nose, no ears, no neck, no fingers, no mitten fingers, no hair on Ayo, no extra characters, no camera shake, no blur, no text, no captions.`;
    
    await promptInput.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await page.waitForTimeout(300);
    await page.keyboard.insertText(scene2Prompt);
    await page.waitForTimeout(600);

    const submitBtn = page.locator('span[submitbutton] button, .submit-button-slot button, button:has(mat-icon:has-text("arrow_forward"))').last();
    await submitBtn.click();
    console.log('Submitted Scene 2 prompt. Waiting 60s for generation to complete...');
    await page.waitForTimeout(60000);

    const newMoreBtns = page.locator('button[aria-label="More options"], button:has(mat-icon:has-text("more_vert"))');
    const newCount = await newMoreBtns.count();
    const s2Path = path.join(outDir, 'scene_002.mp4');
    await downloadCard(newMoreBtns.last(), s2Path);
  }

  await context.close();
}

downloadBothScenes().catch(console.error);
