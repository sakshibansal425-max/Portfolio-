const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const adminController = require('../controllers/adminController');
const chatController = require('../controllers/chatController');
const { requireAdmin } = require('../middleware/auth');

// Public Contact Form Submission
router.post('/contact', contactController.submitContact);

// Admin Auth Routes
router.post('/admin/login', adminController.login);
router.post('/admin/logout', adminController.logout);

// Protected Admin Submissions API Routes
router.get('/admin/submissions', requireAdmin, adminController.getSubmissions);
router.put('/admin/submissions/:id', requireAdmin, adminController.updateSubmission);
router.delete('/admin/submissions/:id', requireAdmin, adminController.deleteSubmission);

// Interactive Side Chatbot API
router.post('/chat', chatController.handleChat);

module.exports = router;
