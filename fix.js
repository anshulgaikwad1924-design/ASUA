const fs = require('fs');
const path = require('path');

function fixHtmlFiles() {
  const dir = 'd:/ASUA 2/karate-site';
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html')).map(f => path.join(dir, f));

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');

    // Remove BOM
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
    }

    // Fix void elements (remove trailing slash)
    content = content.replace(/<(meta|link|input|img|br|hr)([^>]*?)\/?>/gi, (match, p1, p2) => {
      return `<${p1}${p2.replace(/\/$/, '').trimRight()}>`;
    });

    // Fix missing button type
    content = content.replace(/<button([^>]*)>/gi, (match, attrs) => {
      if (!attrs.includes('type=')) {
        return `<button type="button"${attrs}>`;
      }
      return match;
    });

    // Fix non-breaking hyphens in telephone numbers
    content = content.replace(/\+91-9168679994/g, '+91&#8209;9168679994');
    content = content.replace(/\+91-7980582028/g, '+91&#8209;7980582028');
    content = content.replace(/\+91-9876543210/g, '+91&#8209;9876543210');
    
    // Fix aria-label misuse on logo link
    content = content.replace(/aria-label="Arena sports universe acdemy ASUA — Home"/g, '');

    // Move inline styles to classes
    content = content.replace(/style="margin-bottom:0\.5rem"/g, 'class="mb-2"');
    content = content.replace(/style="font-size:1\.05rem;color:var\(--text-dark\)"/g, 'class="text-dark-lg"');
    content = content.replace(/style="margin-top:0\.5rem"/g, 'class="mt-2"');
    content = content.replace(/style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; background: white;"/g, ''); // the class logo-img will handle this now
    content = content.replace(/style="overflow:hidden; border-radius:50%;"/g, 'class="rounded-avatar"');
    content = content.replace(/style="width:100%; height:100%; object-fit:cover;"/g, 'class="avatar-img"');

    // In admission.html specifically, there's text-transform:uppercase
    content = content.replace(/style="text-transform:uppercase"/g, 'class="uppercase"');
    content = content.replace(/style="color:var\(--text-light\);display:block;margin-top:0\.3rem;"/g, 'class="help-text"');
    content = content.replace(/style="margin-bottom:1rem;color:var\(--text-light\)"/g, 'class="help-text mb-4"');
    content = content.replace(/style="margin-top:0\.5rem"/g, 'class="mt-2"');
    content = content.replace(/style="margin-top:1rem"/g, 'class="mt-4"');
    content = content.replace(/style="margin-top: 2rem;"/g, 'class="mt-8"');
    content = content.replace(/style="width:100%; font-size:1\.1rem; padding:1rem;"/g, 'class="btn-large"');

    fs.writeFileSync(file, content, 'utf8');
  }
  console.log('Fixed simple HTML errors.');
}

fixHtmlFiles();
