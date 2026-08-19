/**
 * Google Analytics 4 (GA4) Custom Event Helper Module
 */
function trackGA4Event(eventName, eventParams = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams);
    console.log(`[GA4 Tracked Event] ${eventName}:`, eventParams);
  } else {
    console.log(`[GA4 Placeholder Log] ${eventName}:`, eventParams);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Track Contact Form Submissions
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', () => {
      trackGA4Event('contact_form_submit', {
        page_location: window.location.pathname,
        subject: contactForm.querySelector('[name="subject"]')?.value || 'general'
      });
    });
  }

  // Track Chatbot Open Events
  const chatbotToggleBtn = document.getElementById('chatbotToggleBtn');
  if (chatbotToggleBtn) {
    chatbotToggleBtn.addEventListener('click', () => {
      trackGA4Event('chatbot_widget_open', {
        page_location: window.location.pathname
      });
    });
  }

  // Track Project Card Clicks
  document.querySelectorAll('.project-card a').forEach(link => {
    link.addEventListener('click', () => {
      const cardTitle = link.closest('.project-card')?.querySelector('h3')?.textContent || 'project';
      trackGA4Event('project_card_click', {
        project_title: cardTitle,
        link_href: link.getAttribute('href')
      });
    });
  });
});
