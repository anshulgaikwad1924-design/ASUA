const fs = require('fs');
const path = require('path');

const dir = 'd:/ASUA 2/karate-site';
const instructorsFile = path.join(dir, 'instructors.html');

let html = fs.readFileSync(instructorsFile, 'utf8');

const placeholderGrid = `
            <!-- Placeholder Card 1 -->
            <article class="team-card">
              <div class="team-avatar" aria-hidden="true">
                <img src="images/shubham_bansod.jpg" alt="Sensei Dilip Shaw">
              </div>
              <h3>Sensei Dilip Shaw</h3>
              <p class="team-location">West Bengal</p>
              <p class="team-desc">Black Belt 4th Dan (GKSF), Chief Representative, West Bengal, M: +91-9088237873</p>
            </article>

            <!-- Placeholder Card 2 -->
            <article class="team-card">
              <div class="team-avatar" aria-hidden="true">
                <img src="images/shubham_bansod.jpg" alt="Sensei Happy Yadav">
              </div>
              <h3>Sensei Happy Yadav</h3>
              <p class="team-location">Delhi</p>
              <p class="team-desc">Black Belt 1st DAN (GKSF &amp; KAI), Chief Representative, Delhi M: +91-8130303674</p>
            </article>

            <!-- Placeholder Card 3 -->
            <article class="team-card">
              <div class="team-avatar" aria-hidden="true">
                <img src="images/shubham_bansod.jpg" alt="Sensei Vikram Kumar Jha">
              </div>
              <h3>Sensei Vikram Kumar Jha</h3>
              <p class="team-location">Rohini, Delhi</p>
              <p class="team-desc">Black Belt 2nd DAN, Dojo Instructor, Rohini, Delhi</p>
            </article>

            <!-- Placeholder Card 4 -->
            <article class="team-card">
              <div class="team-avatar" aria-hidden="true">
                <img src="images/shubham_bansod.jpg" alt="Sensei Ravi Kumar">
              </div>
              <h3>Sensei Ravi Kumar</h3>
              <p class="team-location">Faridabad, Haryana</p>
              <p class="team-desc">Black Belt 2nd DAN, Dojo Instructor, Faridabad M: +91-7217814758</p>
            </article>
`;

html = html.replace('<!-- Team members will be added here -->', placeholderGrid);
fs.writeFileSync(instructorsFile, html, 'utf8');

console.log('Populated placeholders');
