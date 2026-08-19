/**
 * Main Client JavaScript Module - Sakshi Bansal Portfolio
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('⚡ Sakshi Portfolio System Initialized [Phase 1 - Monochromatic Parallax UI Active]');

  // Smooth scroll for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Dynamic Contact Form AJAX submission stub (Phase 1 & 2 integration ready)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const formAlert = document.getElementById('formAlert');
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="10"></circle>
          </svg>
          Sending Message...
        `;
      }

      const formData = {
        name: contactForm.querySelector('[name="name"]')?.value,
        email: contactForm.querySelector('[name="email"]')?.value,
        subject: contactForm.querySelector('[name="subject"]')?.value,
        message: contactForm.querySelector('[name="message"]')?.value
      };

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok && data.success) {
          if (formAlert) {
            formAlert.className = 'alert alert-success';
            formAlert.innerHTML = `✓ Thank you, ${formData.name}! Your message has been saved into the database. Sakshi will respond shortly.`;
            formAlert.style.display = 'block';
          }
          contactForm.reset();
        } else {
          throw new Error(data.message || 'Failed to send message.');
        }
      } catch (err) {
        if (formAlert) {
          formAlert.className = 'alert alert-error';
          formAlert.innerHTML = `⚠️ ${err.message || 'Notice: Form handling endpoint /api/contact will be fully wired in Phase 2.'}`;
          formAlert.style.display = 'block';
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `Send Message →`;
        }
      }
    });
  }
});
