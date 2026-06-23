const fs = require('fs');
const path = require('path');

const dir = 'd:/ASUA 2/karate-site';
const stylesFile = path.join(dir, 'css/styles.css');
const indexFile = path.join(dir, 'index.html');

let styles = fs.readFileSync(stylesFile, 'utf8');

// Revert .coaches-grid
styles = styles.replace(/grid-template-columns: repeat\(4, 1fr\);/, 'grid-template-columns: repeat(3, 1fr);');

// Revert .coach-card
styles = styles.replace(/\.coach-card\s*\{[\s\S]*?\}/, `.coach-card {
    background: var(--white);
    border-radius: var(--radius);
    padding: 2rem 1.5rem;
    text-align: center;
    box-shadow: var(--shadow-sm);
    transition: transform var(--transition), box-shadow var(--transition);
    border-top: 4px solid var(--primary);
  }`);

// Remove new styles
styles = styles.replace(/\.coach-card h3\s*\{[\s\S]*?box-shadow: 0 0 0 8px rgba\(0, 200, 255, 0\.06\); \/\* subtle light blue ring \*\/\n  \}/, `.coach-avatar {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    margin: 0 auto 1.25rem;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    display: flex;
    align-items: center;
    justify-content: center;
    scroll-margin-top: 100px;
  }`);

// Now add the team grid styles cleanly for the instructors page
styles += `
/* ---------- Team Grid (Instructors Page) ---------- */
.team-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}
@media (max-width: 1024px) {
  .team-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 700px) {
  .team-grid { grid-template-columns: 1fr; }
}
.team-card {
  text-align: center;
}
.team-avatar {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  box-shadow: 0 0 0 8px rgba(0, 200, 255, 0.06);
  overflow: hidden;
}
.team-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.team-card h3 {
  font-size: 1.3rem;
  margin-bottom: 0.25rem;
  color: var(--text-dark);
}
.team-location {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #f39c12;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  font-weight: 600;
}
.team-desc {
  font-size: 0.85rem;
  color: #7f8c8d;
  line-height: 1.6;
}
`;

fs.writeFileSync(stylesFile, styles, 'utf8');

// Revert index.html coach card
let indexHtml = fs.readFileSync(indexFile, 'utf8');
const oldCoachHtml = `<article class="coach-card">
              <div class="coach-avatar rounded-avatar" aria-hidden="true">
               <img src="images/shubham_bansod.jpg" alt="Sensei Shubham Vinayak Bansod" class="avatar-img">
              </div>
              <span class="coach-role">Chief Instructor &amp; Founder</span>
             <h3>Sensei Shubham Vinayak Bansod</h3>
              <p class="coach-rank">Black Belt &#8212; 3rd Dan</p>
              <p class="coach-info"><strong>Location:</strong> Nagpur, Maharashtra</p>
              <p class="coach-info coach-phone">&#128222; +91&#8209;9168679994</p>
             <a class="view-profile" href="instructors.html#shubham-bansod">View Full Profile &rarr;</a>
            </article>`;
indexHtml = indexHtml.replace(/<article class="coach-card">[\s\S]*?<\/article>/, oldCoachHtml);
fs.writeFileSync(indexFile, indexHtml, 'utf8');

console.log('Revert and prep complete');
