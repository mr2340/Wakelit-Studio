const fs = require('fs');
const html = fs.readFileSync('projects/sample-project/logs/workspace_view.html', 'utf8');

const proseIdx = html.indexOf('ProseMirror');
console.log('PROSEMIRROR SNIPPET:\n', html.substring(proseIdx - 200, proseIdx + 600));

const arrowIdx = html.indexOf('arrow_forward');
console.log('ARROW FORWARD SNIPPET:\n', html.substring(arrowIdx - 200, arrowIdx + 200));
