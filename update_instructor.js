const fs = require('fs');
const path = require('path');

const dir = 'd:/ASUA 2/karate-site';
const instructorsFile = path.join(dir, 'instructors.html');
const indexFile = path.join(dir, 'index.html');

let instructorsContent = fs.readFileSync(instructorsFile, 'utf8');

const newInstructorHtml = `<article class="instructor-profile" id="shubham-bansod">
          <div class="coach-avatar overflow-hidden" aria-hidden="true">
            <img src="images/shubham_bansod.jpg" alt="Sensei Shubham Vinayak Bansod" class="avatar-img">
          </div>
          <div>
            <h2>Sensei Shubham Vinayak Bansod</h2>
            <p class="meta"><strong>Rank:</strong> Black Belt &#8212; 3rd Dan &nbsp;|&nbsp; <strong>Role:</strong> Chief Instructor &amp; Founder &nbsp;|&nbsp; <strong>Academy:</strong> Arena Sports Universe Academy (ASUA) &nbsp;|&nbsp; <strong>Location:</strong> Nagpur Maharashtra, India</p>

            <h4>Biography</h4>
            <p>Sensei Shubham Vinayak Bansod began his karate journey at the age of eight and has dedicated years to mastering traditional martial arts while inspiring the next generation of athletes. With a strong foundation in discipline, technical excellence, and leadership, he has trained numerous students for belt gradings, state-level, and national-level competitions.</p>
            <p>As the Founder and Chief Instructor of Arena Sports Universe Academy (ASUA), Sensei Shubham is committed to developing confident, disciplined, and skilled martial artists. Alongside competitive karate training, he actively promotes self-defence awareness, youth development, and community fitness through workshops and sports initiatives.</p>
            <p>His teaching philosophy is simple: Character First. Discipline Always. Success Follows.</p>

            <h4>Achievements</h4>
            <ul>
              <li>Silver Medalist &#8211; 17th National Sports Jeet Kune Do Championship, Mumbai (2016)</li>
              <li>Double Silver Medalist (Kata &amp; Kumite) &#8211; 5th South Asia Cup Sports Jeet Kune Do Championship, Sri Lanka (2017)</li>
              <li>Served as an Instructor for the Nirbhaya Beti Abhiyan (2016), promoting women's self-defence and safety awareness.</li>
              <li>Honoured with the Ubharte Sitare Award (2025) by the Hindi Vidarbha Sahitya Sammelan for outstanding contribution to karate and sports.</li>
              <li>Successfully trained and mentored numerous students in karate, self-defence, and competitive martial arts.</li>
            </ul>

            <h4>Certifications &amp; Experience</h4>
            <ul>
              <li>Black Belt &#8211; 1st Dan (2017)</li>
              <li>Black Belt &#8211; 2nd Dan (2019)</li>
              <li>Black Belt &#8211; 3rd Dan (2023)</li>
              <li>Certified Self-Defence Instructor</li>
              <li>Instructor &#8211; Nirbhaya Beti Abhiyan (2016)</li>
              <li>National &amp; International Karate Competitor</li>
            </ul>

            <p class="mt-4"><strong>&#128222; Direct line:</strong>&nbsp;<a href="tel:+919168679994">+91&#8209;9168679994</a></p>
            <div class="actions">
              <a href="contact.html" class="btn btn-primary">Contact via Form</a>
              <a href="tel:+919168679994" class="btn btn-primary bg-secondary">Call&nbsp;Now</a>
            </div>
          </div>
        </article>`;

// Replace the Anshul profile block using regex matching the <article>...</article>
instructorsContent = instructorsContent.replace(/<article class="instructor-profile" id="anshul-gaikwad">[\s\S]*?<\/article>/, newInstructorHtml);
fs.writeFileSync(instructorsFile, instructorsContent, 'utf8');

let indexContent = fs.readFileSync(indexFile, 'utf8');

const newCoachHtml = `<article class="coach-card">
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

indexContent = indexContent.replace(/<article class="coach-card">[\s\S]*?<\/article>/, newCoachHtml);
fs.writeFileSync(indexFile, indexContent, 'utf8');

console.log('Update complete');
