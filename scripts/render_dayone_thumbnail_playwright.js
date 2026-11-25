const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

async function renderThumbnail() {
  console.log('Rendering Authentic Day One Films Standard Thumbnail (1280x720)...');

  const projectRoot = path.resolve(__dirname, '..');
  const outputDir = path.join(projectRoot, 'projects/the-beast-you-feed/output');
  const framePath = path.join(outputDir, 'thumb_base_frame.jpg');
  const finalThumbPath = path.join(outputDir, 'thumbnail_dayone_standard.jpg');

  // Extract high-intensity character frame from Scene 008 (Ayo + The Shade) or Scene 004 (Ayo screen trance)
  const scenePath = path.join(projectRoot, 'projects/the-beast-you-feed/generated/scenes/scene_008.mp4');
  execSync(`ffmpeg -y -ss 00:00:01.600 -i "${scenePath}" -vframes 1 -vf "scale=1280:720" "${framePath}"`, { stdio: 'ignore' });

  const frameBase64 = fs.readFileSync(framePath).toString('base64');
  const frameDataUri = `data:image/jpeg;base64,${frameBase64}`;

  // Launch local Chrome to render composite
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Titan+One&family=Share+Tech+Mono&display=swap');
      
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        width: 1280px;
        height: 720px;
        position: relative;
        overflow: hidden;
        background: #000;
        font-family: 'Titan One', Impact, sans-serif;
      }
      
      .bg {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: contrast(1.2) brightness(0.9) saturate(1.25);
      }
      
      .vignette {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%),
                    linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.6) 100%);
      }

      /* DAY ONE FILMS SIGNATURE TOP TEXT */
      .title-container {
        position: absolute;
        top: 25px;
        left: 0;
        width: 100%;
        text-align: center;
        z-index: 10;
      }
      
      .title-text {
        font-size: 110px;
        color: #FFFFFF;
        text-transform: uppercase;
        letter-spacing: 2px;
        -webkit-text-stroke: 14px #000000;
        paint-order: stroke fill;
        text-shadow: 0 10px 20px rgba(0,0,0,0.95);
        display: inline-block;
        transform: rotate(-1.5deg);
      }

      /* FLOATING NEON APP LOGOS */
      .app-icon {
        position: absolute;
        z-index: 8;
        border-radius: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      /* YOUTUBE */
      .icon-yt {
        top: 190px;
        left: 70px;
        width: 95px;
        height: 68px;
        background: #FF0000;
        border-radius: 20px;
        box-shadow: 0 0 25px rgba(255, 0, 0, 0.9), 0 0 50px rgba(255, 0, 0, 0.5);
        transform: rotate(-12deg);
      }
      .yt-play {
        width: 0;
        height: 0;
        border-left: 28px solid #FFF;
        border-top: 16px solid transparent;
        border-bottom: 16px solid transparent;
        margin-left: 6px;
      }
      
      /* TIKTOK */
      .icon-tiktok {
        top: 280px;
        right: 90px;
        width: 80px;
        height: 80px;
        background: #010101;
        border-radius: 22px;
        box-shadow: 0 0 30px rgba(0, 242, 234, 0.8), 0 0 40px rgba(255, 0, 79, 0.8);
        transform: rotate(14deg);
        border: 2px solid #25F4EE;
      }
      
      /* INSTAGRAM */
      .icon-ig {
        top: 160px;
        right: 120px;
        width: 85px;
        height: 85px;
        background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
        border-radius: 24px;
        box-shadow: 0 0 30px rgba(225, 48, 108, 0.9), 0 0 50px rgba(225, 48, 108, 0.5);
        transform: rotate(-8deg);
      }

      /* RED LED ALARM CLOCK (3:00 AM) */
      .clock-widget {
        position: absolute;
        bottom: 35px;
        right: 50px;
        background: #0D0D0D;
        border: 4px solid #222;
        border-radius: 14px;
        padding: 8px 20px;
        box-shadow: 0 0 25px rgba(255, 0, 0, 0.35);
        z-index: 9;
      }
      
      .clock-digits {
        font-family: 'Share Tech Mono', monospace;
        font-size: 52px;
        color: #FF1A1A;
        text-shadow: 0 0 18px #FF0000;
        letter-spacing: 3px;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <img class="bg" src="${frameDataUri}">
    <div class="vignette"></div>
    
    <div class="title-container">
      <div class="title-text">{{TITLE}}</div>
    </div>
    
    <!-- Neon YouTube Icon -->
    <div class="app-icon icon-yt">
      <div class="yt-play"></div>
    </div>
    
    <!-- Neon TikTok Icon -->
    <div class="app-icon icon-tiktok">
      <svg width="46" height="46" viewBox="0 0 24 24" fill="#FFF">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.41a6.33 6.33 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.43z"/>
      </svg>
    </div>
    
    <!-- Neon Instagram Icon -->
    <div class="app-icon icon-ig">
      <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    </div>
    
    <!-- 3:00 AM Clock Widget -->
    <div class="clock-widget">
      <div class="clock-digits">3:00 AM</div>
    </div>
  </body>
  </html>
  `;

  // Generate Variant 1: "YOU'RE ROTTING."
  await page.setContent(htmlContent.replace('{{TITLE}}', "YOU'RE ROTTING."));
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outputDir, 'thumbnail_dayone_rotting.jpg'), type: 'jpeg', quality: 92 });

  // Generate Variant 2: "STOP FEEDING IT."
  await page.setContent(htmlContent.replace('{{TITLE}}', "STOP FEEDING IT."));
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outputDir, 'thumbnail_dayone_stop_feeding_it.jpg'), type: 'jpeg', quality: 92 });
  
  // Set primary master thumbnail to the Day One standard
  fs.copyFileSync(path.join(outputDir, 'thumbnail_dayone_stop_feeding_it.jpg'), path.join(outputDir, 'thumbnail_master.jpg'));

  await browser.close();

  // Cleanup temp frame
  if (fs.existsSync(framePath)) fs.unlinkSync(framePath);

  const stats = fs.statSync(finalThumbPath);
  console.log(`✅ Day One Standard Thumbnail Generated: ${finalThumbPath} (${(stats.size / 1024).toFixed(1)} KB)`);
}

renderThumbnail().catch(err => {
  console.error('Error generating thumbnail:', err);
  process.exit(1);
});
