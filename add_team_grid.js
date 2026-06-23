const fs = require('fs');
const path = require('path');

const dir = 'd:/ASUA 2/karate-site';
const instructorsFile = path.join(dir, 'instructors.html');

let html = fs.readFileSync(instructorsFile, 'utf8');

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
console.log('Added team section');
