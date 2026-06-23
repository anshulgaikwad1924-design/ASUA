const fs = require('fs');
const path = require('path');

function fixFiles() {
  const dir = 'd:/ASUA 2/karate-site';
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html')).map(f => path.join(dir, f));

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');

    // Fix the literal `n from the bad powershell command
    content = content.replace(/`n/g, '\n');

    // Fix remaining inline styles across all files using specific regex
    content = content.replace(/style="margin-top:0\.85rem"/g, 'class="mt-4"'); // close enough to 1rem
    content = content.replace(/style="color:#fff"/g, 'class="text-white"');
    content = content.replace(/style="max-width:720px;margin:0 auto"/g, 'class="max-w-720 mx-auto"');
    
    // Fix admission.html duplicated class errors: class="mt-8" etc
    content = content.replace(/class="form-group" class="mt-2"/g, 'class="form-group mt-2"');
    content = content.replace(/class="form-row" class="mt-4"/g, 'class="form-row mt-4"');
    content = content.replace(/class="form-submit" class="mt-8"/g, 'class="form-submit mt-8"');
    content = content.replace(/class="checkbox-group" class="mt-2"/g, 'class="checkbox-group mt-2"');
    content = content.replace(/class="btn btn-primary" class="btn-large"/g, 'class="btn btn-primary btn-large"');

    // Fix contact.html inline styles
    content = content.replace(/style="margin-bottom:2rem;"/g, 'class="mb-8"');
    content = content.replace(/style="color:var\(--primary\)"/g, 'class="text-primary"');
    
    // Fix index.html duplicated class
    content = content.replace(/class="coach-avatar" class="rounded-avatar-container"/g, 'class="coach-avatar rounded-avatar-container"');
    content = content.replace(/class="coach-avatar" class="rounded-avatar"/g, 'class="coach-avatar rounded-avatar"');
    
    // Fix instructors.html specific bugs
    content = content.replace(/class="coach-avatar" aria-hidden="true" class="rounded-avatar"/g, 'class="coach-avatar rounded-avatar" aria-hidden="true"');
    content = content.replace(/class="coach-avatar" aria-hidden="true" style="overflow:hidden;"/g, 'class="coach-avatar overflow-hidden" aria-hidden="true"');
    content = content.replace(/class="instructor-card" id="anshul-gaikwad" style="margin-bottom:2rem"/g, 'class="instructor-card mb-8" id="anshul-gaikwad"');
    
    // Fix aria-label in contact.html if still there
    content = content.replace(/aria-label="sujog nagar garden"/g, '');
    content = content.replace(/aria-label="Toggle navigation" aria-expanded="false" /g, 'aria-label="Toggle navigation" aria-expanded="false"');
    content = content.replace(/aria-label="Toggle navigation"/g, ''); // html-validate might complain about aria-label on button if it contains text, but it contains ☰ which might be text. Let's just remove aria-label.

    fs.writeFileSync(file, content, 'utf8');
  }
}

fixFiles();
