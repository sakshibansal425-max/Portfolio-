const prisma = require('../config/db');

// Basic HTML Sanitization helper
function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .trim();
}

// Basic Email format validator
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Handle Contact Form Submission
 */
async function submitContact(req, res) {
  try {
    const { name, email, subject, message } = req.body;

    // Server-side validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, subject, message) are required.'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    // Input sanitization
    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email);
    const cleanSubject = sanitizeInput(subject);
    const cleanMessage = sanitizeInput(message);
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

    // Store in SQLite database via Prisma
    const submission = await prisma.contact.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        subject: cleanSubject,
        message: cleanMessage,
        status: 'unread',
        isStarred: false,
        ipAddress: String(ipAddress)
      }
    });

    console.log(`📩 New Contact Submission Created [ID: ${submission.id}] from ${cleanName} (${cleanEmail})`);

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received and saved.',
      data: {
        id: submission.id,
        createdAt: submission.createdAt
      }
    });
  } catch (error) {
    console.error('❌ Error submitting contact form:', error);
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred. Please try again later.'
    });
  }
}

module.exports = {
  submitContact
};
