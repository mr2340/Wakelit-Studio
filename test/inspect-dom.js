const fs = require('fs');
const html = fs.readFileSync('projects/sample-project/logs/diagnostic_scene_001_att1_1795515124980.html', 'utf8');

const re = /href=["']([^"']+)["']/g;
const hrefs = [];
let m;
while ((m = re.exec(html)) !== null) {
  if (!m[1].includes('.css') && !m[1].includes('.js') && !m[1].includes('.png') && !m[1].includes('google.com/')) {
    hrefs.push(m[1]);
  }
}
console.log('INTERNAL LINKS:', [...new Set(hrefs)]);

// Find project titles / cards
const projectTitles = [...html.matchAll(/class="[^"]*project-title[^"]*"[^>]*>([^<]+)</gi)].map(x => x[1].trim());
console.log('PROJECT TITLES:', projectTitles);
