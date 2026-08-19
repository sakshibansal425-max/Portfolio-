const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware for admin authentication
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_sakshi_obsidian_secret_2026',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  }
}));

// Static public assets (CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));

// EJS View Engine Setup
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Global View Variables (e.g. GA4 measurement ID, session status)
app.use((req, res, next) => {
  res.locals.gaMeasurementId = process.env.GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
  res.locals.isAdminAuthenticated = !!(req.session && req.session.adminUser);
  res.locals.adminUser = req.session && req.session.adminUser ? req.session.adminUser : null;
  next();
});

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

// 1. Mount API Routes FIRST
const apiRoutes = require('./src/routes/api');
app.use('/api', apiRoutes);

// 2. Mount Page Routes SECOND
const mainRoutes = require('./src/routes/index');
app.use('/', mainRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).render('index', {
    title: '404 - Page Not Found',
    activePage: ''
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err.stack);
  res.status(500).send('Internal Server Error');
});

// Start Server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 Sakshi Portfolio Server Running on http://localhost:${PORT}`);
    console.log(`🎨 Theme: Monochromatic Obsidian Parallax`);
    console.log(`📁 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`=======================================================`);
  });
}

module.exports = app;
