/**
 * Admin Authentication Middleware
 */
function requireAdmin(req, res, next) {
  if (req.session && req.session.adminUser) {
    return next();
  }

  // If request is an API call, return 401 Unauthorized
  if (req.path.startsWith('/api/') || req.xhr || (req.headers.accept && req.headers.accept.includes('application/json'))) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Admin authentication required.'
    });
  }

  // Otherwise redirect to login page
  res.redirect('/admin/login?error=session_expired');
}

module.exports = {
  requireAdmin
};
