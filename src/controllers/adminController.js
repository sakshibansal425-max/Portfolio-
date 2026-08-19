const prisma = require('../config/db');
const bcrypt = require('bcryptjs');

/**
 * Admin Login Handler
 */
async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Both username and password are required.'
      });
    }

    // Find admin by username or email
    const admin = await prisma.adminUser.findFirst({
      where: {
        OR: [
          { username: username.trim() },
          { email: username.trim() }
        ]
      }
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. User not found.'
      });
    }

    // Verify password hash
    const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Password incorrect.'
      });
    }

    // Update last login timestamp
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() }
    });

    // Set Session
    req.session.adminUser = {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role
    };

    console.log(`🔐 Admin User Logged In: ${admin.username}`);

    // If API request (JSON)
    if (req.xhr || req.headers.accept?.includes('application/json') || req.path.startsWith('/api/')) {
      return res.json({
        success: true,
        message: 'Authentication successful.',
        redirectUrl: '/admin/dashboard'
      });
    }

    // Standard form submit redirect
    return res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('❌ Error during admin login:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication.'
    });
  }
}

/**
 * Admin Logout Handler
 */
function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error('❌ Error destroying session:', err);
    }
    res.clearCookie('connect.sid');
    res.redirect('/admin/login');
  });
}

/**
 * Get Contact Form Submissions List
 */
async function getSubmissions(req, res) {
  try {
    const { status } = req.query; // 'all', 'unread', 'read', 'starred'
    let whereClause = {};

    if (status === 'unread') {
      whereClause.status = 'unread';
    } else if (status === 'read') {
      whereClause.status = 'read';
    } else if (status === 'starred') {
      whereClause.isStarred = true;
    }

    const submissions = await prisma.contact.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    });

    return res.json({
      success: true,
      count: submissions.length,
      data: submissions
    });
  } catch (error) {
    console.error('❌ Error fetching submissions:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve contact submissions.'
    });
  }
}

/**
 * Update Submission Status (Read/Starred)
 */
async function updateSubmission(req, res) {
  try {
    const { id } = req.params;
    const { status, isStarred } = req.body;

    const submissionId = parseInt(id, 10);
    if (isNaN(submissionId)) {
      return res.status(400).json({ success: false, message: 'Invalid submission ID.' });
    }

    const updateData = {};
    if (typeof status === 'string') updateData.status = status;
    if (typeof isStarred === 'boolean') updateData.isStarred = isStarred;

    const updated = await prisma.contact.update({
      where: { id: submissionId },
      data: updateData
    });

    return res.json({
      success: true,
      message: 'Submission updated successfully.',
      data: updated
    });
  } catch (error) {
    console.error('❌ Error updating submission:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update submission status.'
    });
  }
}

/**
 * Delete Submission Record
 */
async function deleteSubmission(req, res) {
  try {
    const { id } = req.params;
    const submissionId = parseInt(id, 10);

    if (isNaN(submissionId)) {
      return res.status(400).json({ success: false, message: 'Invalid submission ID.' });
    }

    await prisma.contact.delete({
      where: { id: submissionId }
    });

    console.log(`🗑️ Deleted Contact Submission [ID: ${submissionId}]`);

    return res.json({
      success: true,
      message: `Submission #${submissionId} deleted successfully.`
    });
  } catch (error) {
    console.error('❌ Error deleting submission:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete submission.'
    });
  }
}

module.exports = {
  login,
  logout,
  getSubmissions,
  updateSubmission,
  deleteSubmission
};
