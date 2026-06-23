const fs = require('fs');
const path = require('path');

const dir = 'd:/ASUA 2/karate-site';
const stylesFile = path.join(dir, 'css/styles.css');
const indexFile = path.join(dir, 'index.html');

let styles = fs.readFileSync(stylesFile, 'utf8');

// Update .coaches-grid columns to 4
styles = styles.replace(/grid-template-columns: repeat\(3, 1fr\);/, 'grid-template-columns: repeat(4, 1fr);');

// Update .coach-card
styles = styles.replace(/\.coach-card\s*\{[\s\S]*?\}/, `.coach-card {
    background: transparent;
    padding: 1rem 0.5rem;
    text-align: center;
    box-shadow: none;
    border-top: none;
    transition: transform var(--transition);
  }`);

// Add new styles for .coach-location and .coach-desc
const newStyles = `
  .coach-card h3 {
    font-size: 1.3rem;
    margin-bottom: 0.25rem;
    color: var(--text-dark);
  }
  .coach-card .coach-location {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: #f39c12; /* golden color */
    letter-spacing: 1px;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  .coach-card .coach-desc {
    font-size: 0.85rem;
    color: #7f8c8d;
    line-height: 1.6;
  }
  .coach-avatar {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    margin: 0 auto 1.5rem;
    background: var(--bg-light);
    display: flex;
    align-items: center;
    justify-content: center;
    scroll-margin-top: 100px;
    box-shadow: 0 0 0 8px rgba(0, 200, 255, 0.06); /* subtle light blue ring */
  }
`;

// Replace old .coach-avatar with new one, and insert new classes
styles = styles.replace(/\.coach-avatar\s*\{[\s\S]*?scroll-margin-top: 100px;\s*\}/, newStyles.trim());

fs.writeFileSync(stylesFile, styles, 'utf8');

let indexHtml = fs.readFileSync(indexFile, 'utf8');

const newCoachHtml = `<article class="coach-card">
              <div class="coach-avatar rounded-avatar" aria-hidden="true">
               <img src="images/shubham_bansod.jpg" alt="Sensei Shubham Vinayak Bansod" class="avatar-img">
              </div>
              <h3>Sensei Shubham Vinayak Bansod</h3>
              <p class="coach-location">Nagpur, Maharashtra</p>
              <p class="coach-desc">Black Belt &#8212; 3rd Dan, Chief Instructor &amp; Founder, Nagpur M: +91&#8209;9168679994</p>
            </article>`;

indexHtml = indexHtml.replace(/<article class="coach-card">[\s\S]*?<\/article>/, newCoachHtml);

fs.writeFileSync(indexFile, indexHtml, 'utf8');

console.log('Update complete');
