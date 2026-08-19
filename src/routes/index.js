const express = require('express');
const router = express.Router();
const { requireAdmin } = require('../middleware/auth');
const prisma = require('../config/db');

// Home Page
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Home',
    activePage: 'home'
  });
});

// About Page
router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Journey',
    activePage: 'about'
  });
});

// Services Page
router.get('/services', (req, res) => {
  res.render('services', {
    title: 'Services & Expertise',
    activePage: 'services'
  });
});

// Contact Page
router.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact Sakshi',
    activePage: 'contact'
  });
});

// Admin Login Screen Page
router.get('/admin/login', (req, res) => {
  if (req.session && req.session.adminUser) {
    return res.redirect('/admin/dashboard');
  }
  res.render('admin/login', {
    title: 'Admin Portal Login',
    activePage: 'admin',
    error: req.query.error || null
  });
});

// Admin Submissions Dashboard Page (Auth Protected)
router.get('/admin/dashboard', requireAdmin, async (req, res) => {
  try {
    const submissions = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' }
    });

    const unreadCount = submissions.filter(s => s.status === 'unread').length;
    const starredCount = submissions.filter(s => s.isStarred).length;

    res.render('admin/dashboard', {
      title: 'Admin Submissions Dashboard',
      activePage: 'admin',
      adminUser: req.session.adminUser,
      submissions: submissions,
      stats: {
        total: submissions.length,
        unread: unreadCount,
        starred: starredCount
      }
    });
  } catch (error) {
    console.error('❌ Error rendering admin dashboard:', error);
    res.status(500).send('Error loading admin dashboard.');
  }
});

module.exports = router;
