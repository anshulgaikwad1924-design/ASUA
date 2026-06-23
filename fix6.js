const fs = require('fs');
const path = require('path');

function fix() {
  const dir = 'd:/ASUA 2/karate-site';

  // Fix contact.html
  let contact = fs.readFileSync(path.join(dir, 'contact.html'), 'utf8');
  contact = contact.replace(/aria-label="Social media"/g, '');
  fs.writeFileSync(path.join(dir, 'contact.html'), contact, 'utf8');

  // Fix instructors.html
  let instructors = fs.readFileSync(path.join(dir, 'instructors.html'), 'utf8');
  // I will just replace all spaces near the telephone number with &nbsp;
  instructors = instructors.replace('Direct line:</strong> <a', 'Direct line:</strong>&nbsp;<a');
  fs.writeFileSync(path.join(dir, 'instructors.html'), instructors, 'utf8');
}

fix();
