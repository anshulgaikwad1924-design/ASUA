const fs = require('fs');
const path = require('path');

const dir = 'd:/ASUA 2/karate-site';
const stylesFile = path.join(dir, 'css/styles.css');

let styles = fs.readFileSync(stylesFile, 'utf8');

const missingCSS = `
/* Missing Coach Card specific styling */
.coach-role {
  display: inline-block;
  background: var(--text-dark);
  color: var(--accent);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: -30px;
  position: relative;
  z-index: 2;
  margin-bottom: 0.5rem;
}
.coach-card h3 {
  color: var(--primary);
  font-size: 1.2rem;
  margin-bottom: 0.2rem;
}
.coach-rank {
  color: var(--primary);
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
}
.coach-info {
  font-size: 0.85rem;
  color: var(--text-light);
  margin-bottom: 0.25rem;
}
.coach-phone {
  color: var(--primary);
  margin-bottom: 1rem;
}
.view-profile {
  display: inline-block;
  color: var(--accent);
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  border-bottom: 2px solid var(--accent);
  padding-bottom: 2px;
}
.view-profile:hover {
  color: var(--primary);
  border-color: var(--primary);
}
.coach-card .coach-avatar {
  border: 4px solid var(--accent);
  padding: 2px;
  background: transparent;
}
`;

if (!styles.includes('.coach-role')) {
  styles = styles.replace('.instructor-profile h2', missingCSS + '\n.instructor-profile h2');
  fs.writeFileSync(stylesFile, styles, 'utf8');
}

console.log('Restored missing styling');
