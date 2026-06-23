# Arena sports universe acdemy ASUA — Static Website

A complete, multi-page, production-ready static website for "Arena sports universe acdemy ASUA" — a martial arts training organization. Built with vanilla HTML, CSS, and JavaScript. No frameworks, no build step.

## 📁 Project Structure

```
karate-site/
├── index.html          # Home — hero, coaches grid, values, inquiry form
├── about.html          # Mission, vision, GKSF affiliation, embedded map
├── instructors.html    # Full profiles for each sensei (with anchor IDs)
├── contact.html        # Contact info card + second inquiry form
├── css/
│   └── styles.css      # Single shared stylesheet
├── js/
│   └── main.js         # Mobile menu, form validation, smooth scroll
└── README.md           # This file
```

## 🚀 Running Locally

This is a fully static site — no build step needed. Just open `index.html` in a browser, or serve the folder with any static server:

```bash
# Option 1 — Python
python3 -m http.server 8000

# Option 2 — Node (npx)
npx serve .
```

Then visit `http://localhost:8000`.

## 🛠️ Customisation Guide

### Update Instructor List
Three instructors are defined in **two places** that must stay in sync:

1. **`index.html`** — coach cards inside the `.coaches-grid` section (around line 70). Each card uses the anchor id `instructors.html#<id>`.
2. **`instructors.html`** — full profiles inside `<article class="instructor-profile" id="...">` blocks. **The `id` attribute** is what the home-page card links to.

To add a new instructor:
- Copy one of the existing `.coach-card` blocks in `index.html`, update name/rank/role/location/phone, and point `View Full Profile →` to a new `#anchor-id`.
- Copy one of the existing `<article class="instructor-profile">` blocks in `instructors.html`, change the `id` to match, and fill in bio / achievements / certifications.

### Update Contact Details
Email, phone, and address appear in **four places**. Search & replace across all HTML files for:
- `anshulgaikwad1924@gmail.com` — main email
- `+91-9168679994` — main phone
- `sujog nagar garden ,nagpur - 440027 ,maharastra ,india` — address

The footer is duplicated across all four HTML files (there's no template engine) — keep them in sync.

### Update Country Dropdown
Edit the `<select id="country">` in `index.html` AND the `<select id="c-country">` in `contact.html`. Add / remove `<option>` tags as needed. Currently 35 countries are listed.

### Change Brand Colours
All colours are defined as CSS variables at the top of `css/styles.css`:

```css
:root {
  --primary: #B22222;   /* deep red */
  --secondary: #2C2C2C; /* charcoal */
  --accent: #FFD700;    /* gold */
  ...
}
```

Changing one variable updates the entire site.

### Hook Up a Real Form Backend
Forms currently call `alert()` only. To send to a real backend, open `js/main.js` and locate the `form.addEventListener('submit', ...)` block. Replace the `alert(...)` line with a `fetch()` POST to your endpoint (Formspree, Netlify Forms, your own API, etc.).

## ✨ Features Included

- ✅ Sticky responsive header with mobile hamburger menu
- ✅ Hero section with martial-arts background
- ✅ 3-column responsive coaches grid (collapses to 1 col on mobile)
- ✅ Two inquiry forms with client-side validation (name required, email format check)
- ✅ 35-country dropdown with dial codes
- ✅ Embedded Google Map on About page
- ✅ Full instructor profile page with deep-link anchors
- ✅ SEO meta tags + Open Graph tags on every page
- ✅ Semantic HTML5 + ARIA labels for accessibility
- ✅ Smooth in-page scrolling
- ✅ Responsive across mobile / tablet / desktop (breakpoints: 480px, 700px, 900px, 1024px)
- ✅ Auto-updating copyright year in footer

## 🌐 Deployment

Deploy to any static host — no configuration needed:

- **Cloudflare Pages** — upload the folder, set the build command to none, output directory to `/`.
- **Netlify** — drag & drop the folder onto netlify.com/drop.
- **GitHub Pages** — push the folder to a repo and enable Pages in repo settings.
- **Vercel** — `vercel deploy` from inside the folder.

## 📦 Browser Support

Tested on modern Chrome, Firefox, Safari, and Edge. Uses standard ES5+/CSS Grid features supported by all browsers from the last 5 years.

---

© 2026 Arena sports universe acdemy ASUA. All rights reserved.





