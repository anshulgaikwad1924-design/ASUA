const fs = require('fs');
const path = require('path');

const dir = 'd:/ASUA 2/karate-site';
const stylesFile = path.join(dir, 'css/styles.css');
const instructorsFile = path.join(dir, 'instructors.html');

// Revert styles.css
let styles = fs.readFileSync(stylesFile, 'utf8');
const oldStylesContent = `/* ---------- Team Grid (Instructors Page) ---------- */`;
if (styles.includes(oldStylesContent)) {
  styles = styles.substring(0, styles.indexOf(oldStylesContent));
  fs.writeFileSync(stylesFile, styles.trim() + '\n', 'utf8');
}

// Revert instructors.html
let html = fs.readFileSync(instructorsFile, 'utf8');
const sectionStart = `<!-- ===== Team Grid ===== -->`;
if (html.includes(sectionStart)) {
  html = html.substring(0, html.indexOf(sectionStart));
  html += `</main>\n\n  <footer class="site-footer">` + fs.readFileSync(instructorsFile, 'utf8').substring(fs.readFileSync(instructorsFile, 'utf8').indexOf('<footer class="site-footer">') + '<footer class="site-footer">'.length);
  fs.writeFileSync(instructorsFile, html, 'utf8');
}

console.log('Revert completed fully');
