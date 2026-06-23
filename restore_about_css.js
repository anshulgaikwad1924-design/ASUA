const fs = require('fs');
const path = require('path');

const dir = 'd:/ASUA 2/karate-site';
const stylesFile = path.join(dir, 'css/styles.css');

let styles = fs.readFileSync(stylesFile, 'utf8');

const restoredAboutCSS = `
/* Restored About Page CSS */
.about-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;
  margin-bottom: 3rem;
}
.about-card {
  background: var(--white);
  padding: 2.5rem 2rem;
  border-radius: var(--radius);
  border: 1px solid #e2e8f0;
  border-left: 4px solid var(--primary);
  box-shadow: var(--shadow-sm);
}
.about-card h3 {
  color: var(--primary);
  font-size: 1.4rem;
  margin-bottom: 1rem;
}
.about-card p {
  color: var(--text-light);
  line-height: 1.6;
}
.about-card .text-dark-lg {
  color: var(--text-dark);
  font-size: 1.1rem;
  margin-top: 0.5rem;
}

.affiliation-banner {
  background: var(--secondary);
  color: var(--text-light);
  padding: 2rem;
  border-radius: var(--radius);
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: var(--shadow-md);
}
.affiliation-banner h3 {
  color: var(--accent);
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.affiliation-banner strong {
  color: var(--white);
}

.map-wrap {
  margin-top: 2.5rem;
  height: 400px;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid #e2e8f0;
}
.map-wrap iframe {
  width: 100%;
  height: 100%;
  border: 0;
}
.max-w-720 { max-width: 720px; }
.mx-auto { margin-left: auto; margin-right: auto; }
`;

if (!styles.includes('.about-grid')) {
  fs.writeFileSync(stylesFile, styles + '\n' + restoredAboutCSS, 'utf8');
}

console.log('Restored About page CSS');
