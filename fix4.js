const fs = require('fs');
const path = require('path');

function fix() {
  const dir = 'd:/ASUA 2/karate-site';

  // Fix about.html
  let about = fs.readFileSync(path.join(dir, 'about.html'), 'utf8');
  about = about.replace('<h2 class="section-title" class="text-white">', '<h2 class="section-title text-white">');
  about = about.replace('<div class="about-card" class="max-w-720 mx-auto">', '<div class="about-card max-w-720 mx-auto">');
  fs.writeFileSync(path.join(dir, 'about.html'), about, 'utf8');

  // Fix admission.html
  let admission = fs.readFileSync(path.join(dir, 'admission.html'), 'utf8');
  admission = admission.replace('<input class="form-control" type="text" id="fullName" name="fullName" class="uppercase" required>', '<input class="form-control uppercase" type="text" id="fullName" name="fullName" required>');
  fs.writeFileSync(path.join(dir, 'admission.html'), admission, 'utf8');

  // Fix contact.html
  let contact = fs.readFileSync(path.join(dir, 'contact.html'), 'utf8');
  contact = contact.replace('<a href="#" aria-label="Facebook">f</a>', '<a href="#">f</a>');
  fs.writeFileSync(path.join(dir, 'contact.html'), contact, 'utf8');

  // Fix index.html
  let index = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
  index = index.replace('<h2 class="section-title" class="text-white">', '<h2 class="section-title text-white">');
  fs.writeFileSync(path.join(dir, 'index.html'), index, 'utf8');

  // Fix instructors.html
  let instructors = fs.readFileSync(path.join(dir, 'instructors.html'), 'utf8');
  instructors = instructors.replace('<div class="coach-avatar" aria-hidden="true" class="overflow-hidden">', '<div class="coach-avatar overflow-hidden" aria-hidden="true">');
  instructors = instructors.replace('>+91-8856995223<', '>+91&#8209;8856995223<');
  instructors = instructors.replace('style="background:var(--secondary)"', 'class="bg-secondary"');
  fs.writeFileSync(path.join(dir, 'instructors.html'), instructors, 'utf8');
}

fix();
