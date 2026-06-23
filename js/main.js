/* ================================================
   Arena sports universe acdemy ASUA — Shared JavaScript
   Handles: mobile menu, form validation, smooth scroll
   ================================================

   CUSTOMIZATION GUIDE
   --------------------
   • To update instructors: edit the coach cards in `index.html` and
     the full profiles in `instructors.html`. Each profile has a
     matching `id` (e.g. id="ritam-polleya") referenced by the
     home-page "View Profile" links.
   • To update contact details (email, phone, address): edit the
     `.contact-info-card` block in `contact.html`, the footer in every
     HTML file, and the location card in `about.html`.
   • Countries dropdown: see the `<select id="country">` element in
     `index.html` and `contact.html` — add/remove <option> tags as needed.
   ================================================ */

(function () {
  'use strict';

  // ---------- Mobile menu toggle ----------
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.innerHTML = isOpen ? '&times;' : '&#9776;';
    });
    // Close menu when a link is clicked (mobile)
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '&#9776;';
      });
    });
  }

  // ---------- Smooth scroll for in-page anchors ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------- Form validation ----------
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showError(group, message) {
    if (!group) return;
    group.classList.add('error');
    const err = group.querySelector('.form-error');
    if (err) err.textContent = message;
  }

  function clearError(group) {
    if (!group) return;
    group.classList.remove('error');
  }

  function validateForm(form) {
    let isValid = true;

    const nameField = form.querySelector('[name="name"]');
    const emailField = form.querySelector('[name="email"]');

    // Reset all errors first
    form.querySelectorAll('.form-group').forEach(clearError);

    if (nameField && !nameField.value.trim()) {
      showError(nameField.closest('.form-group'), 'Please enter your name.');
      isValid = false;
    }

    if (emailField) {
      const val = emailField.value.trim();
      if (!val) {
        showError(emailField.closest('.form-group'), 'Please enter your email.');
        isValid = false;
      } else if (!emailRegex.test(val)) {
        showError(emailField.closest('.form-group'), 'Please enter a valid email address.');
        isValid = false;
      }
    }

    return isValid;
  }

  document.querySelectorAll('form.inquiry-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validateForm(form)) {
        var data = new FormData(form);
        var actionUrl = form.getAttribute('action') || 'https://formspree.io/f/xnjyrero';
        fetch(actionUrl, {
          method: 'POST',
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        }).then(response => {
          if (response.ok) {
            alert('Thank you! Your inquiry has been received. Our team will contact you shortly.');
            form.reset();
          } else {
            alert('Oops! There was a problem submitting your form');
          }
        }).catch(error => {
          alert('Oops! There was a problem submitting your form');
        });
      }
    });

    // Clear error on input
    form.querySelectorAll('.form-control').forEach(function (field) {
      field.addEventListener('input', function () {
        clearError(field.closest('.form-group'));
      });
    });
  });

  // ---------- Set current year in footer ----------
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();

