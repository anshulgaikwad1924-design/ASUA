const fs = require('fs');
const path = require('path');

const dir = 'd:/ASUA 2/karate-site';
const stylesFile = path.join(dir, 'css/styles.css');
const instructorsFile = path.join(dir, 'instructors.html');

let styles = fs.readFileSync(stylesFile, 'utf8');

// Ensure we don't add duplicates
if (!styles.includes('.team-grid')) {
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
}

let html = fs.readFileSync(instructorsFile, 'utf8');
if (!html.includes('id="team"')) {
  const newSection = `
      <!-- ===== Team Grid ===== -->
      <section class="section section-dark" id="team">
        <div class="container">
          <h2 class="section-title text-white">Our Master Instructors <span class="accent-bar"></span></h2>
          <p class="section-subtitle">Meet our highly qualified team of senseis across India.</p>
          
          <div class="team-grid">
            <!-- Team members will be added here -->
          </div>
        </div>
      </section>
`;
  html = html.replace('</main>', newSection + '\n  </main>');
  fs.writeFileSync(instructorsFile, html, 'utf8');
}

console.log('Added team section to instructors ONLY');
