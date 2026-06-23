const fs = require('fs');
const path = require('path');

function replaceEmail() {
  const dir = 'd:/ASUA 2/karate-site';
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html')).map(f => path.join(dir, f));

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/anshulgaikwad1924@gmail\.com/g, 'arenasportsuniverseacademymart@gmail.com');
    fs.writeFileSync(file, content, 'utf8');
  }
}

replaceEmail();
