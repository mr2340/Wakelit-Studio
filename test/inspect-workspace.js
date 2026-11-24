const fs = require('fs');
const html = fs.readFileSync('projects/sample-project/logs/workspace_view.html', 'utf8');

// Find textareas, inputs, contenteditables
const inputs = [...html.matchAll(/<(textarea|input)[^>]*>/gi)].map(m => m[0]);
console.log('INPUTS/TEXTAREAS (', inputs.length, '):\n', inputs.slice(0, 15));

const contentEditables = [...html.matchAll(/<div[^>]*contenteditable[^>]*>/gi)].map(m => m[0]);
console.log('CONTENTEDITABLES:\n', contentEditables);

// Find buttons
const buttons = [...html.matchAll(/<button[^>]*>([\s\S]*?)<\/button>/gi)].map(m => m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()).filter(Boolean);
console.log('WORKSPACE BUTTONS:\n', buttons);
