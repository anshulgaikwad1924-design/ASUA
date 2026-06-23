const fs = require('fs');
const path = require('path');

const dir = 'd:/ASUA 2/karate-site';
const stylesFile = path.join(dir, 'css/styles.css');

let styles = fs.readFileSync(stylesFile, 'utf8');

const restoredCSS = `
/* Restored Core Values CSS */
.values-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}
.value-card {
  background: rgba(255,255,255,0.05);
  padding: 2rem;
  border-radius: var(--radius);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform var(--transition);
  text-align: center;
}
.value-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.1);
}
.value-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
.value-card h4 {
  color: var(--accent);
  margin-bottom: 0.75rem;
}
.value-card p {
  color: var(--text-light);
  font-size: 0.95rem;
  line-height: 1.5;
}

/* Restored Form CSS */
.form-wrap {
  background: var(--white);
  padding: 2.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}
.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}
.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  text-transform: uppercase;
  color: var(--text-dark);
}
.form-group .req {
  color: var(--primary);
}
.form-control {
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color var(--transition), box-shadow var(--transition);
  background: #fdfdfd;
}
.form-control:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(204, 33, 40, 0.1);
}
textarea.form-control {
  resize: vertical;
  min-height: 120px;
}
`;

if (!styles.includes('.value-card')) {
  fs.writeFileSync(stylesFile, styles + '\n' + restoredCSS, 'utf8');
}

console.log('Restored layout CSS');
