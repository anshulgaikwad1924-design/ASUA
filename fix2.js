const fs = require('fs');
const path = require('path');

function fixFiles() {
  const dir = 'd:/ASUA 2/karate-site';
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html')).map(f => path.join(dir, f));

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');

    // Fix duplicated class attributes
    // e.g. <div class="footer-grid" class="mt-8"> -> <div class="footer-grid mt-8">
    content = content.replace(/class="([^"]*)"\s+class="([^"]*)"/g, 'class="$1 $2"');
    content = content.replace(/class="([^"]*)"\s+class="([^"]*)"/g, 'class="$1 $2"'); // run twice in case of 3 classes

    // Fix remaining inline styles
    content = content.replace(/style="padding:2rem;background:var\(--surface\);border-radius:var\(--radius\)"/g, 'class="card p-8"');
    content = content.replace(/style="margin-bottom:1rem;color:var\(--primary\)"/g, 'class="text-primary mb-4"');
    content = content.replace(/style="display:flex;gap:1rem;margin-top:1\.5rem"/g, 'class="flex gap-4 mt-6"');
    
    // For contact.html
    content = content.replace(/style="margin-bottom:2rem"/g, 'class="mb-8"');
    content = content.replace(/style="width: 100%; border: 0; min-height: 400px; border-radius: var\(--radius\);"/g, 'class="map-frame"');

    // For index.html
    content = content.replace(/style="overflow:hidden;"/g, 'class="overflow-hidden"');
    content = content.replace(/style="margin-bottom:2rem;"/g, 'class="mb-8"');

    // For instructors.html
    content = content.replace(/\+91-9168679994/g, '+91&#8209;9168679994');
    content = content.replace(/\+91 9168679994/g, '+91&#8209;9168679994');

    // Remove trailing whitespace
    content = content.replace(/[ \t]+$/gm, '');
    
    // aria-label misuse in contact.html line 89
    content = content.replace(/aria-label="sujog nagar garden"/g, '');

    fs.writeFileSync(file, content, 'utf8');
  }
}

fixFiles();
