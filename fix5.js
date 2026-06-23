const fs = require('fs');
const path = require('path');

function fix() {
  const dir = 'd:/ASUA 2/karate-site';

  // Fix contact.html
  let contact = fs.readFileSync(path.join(dir, 'contact.html'), 'utf8');
  contact = contact.replace(/aria-label="Instagram"/g, '');
  contact = contact.replace(/aria-label="YouTube"/g, '');
  fs.writeFileSync(path.join(dir, 'contact.html'), contact, 'utf8');

  // Fix instructors.html
  let instructors = fs.readFileSync(path.join(dir, 'instructors.html'), 'utf8');
  instructors = instructors.replace('class="btn btn-primary" class="bg-secondary"', 'class="btn btn-primary bg-secondary"');
  instructors = instructors.replace(/\+91-8856995223/g, '+91&#8209;8856995223');
  fs.writeFileSync(path.join(dir, 'instructors.html'), instructors, 'utf8');
}

fix();
