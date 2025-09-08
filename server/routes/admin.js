const express = require('express');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validateAdminLogin } = require('../middleware/validate');
const { authLimiter } = require('../middleware/rateLimit');

const router = express.Router();

// POST /api/admin/login - admin login
router.post('/login', authLimiter, validateAdminLogin, async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log('Admin not found for email:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('Admin found:', admin.email);
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log('Password match result:', isMatch);
    
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { adminId: admin._id, email: admin.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );
    
    res.json({ 
      token,
      admin: {
        id: admin._id,
        email: admin.email
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// JWT auth middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// GET /api/admin/profile - get admin profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.adminId).select('-password');
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.json(admin);
  } catch (err) {
    console.error('Error fetching admin profile:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/admin/verify-token - verify if token is valid
router.post('/verify-token', authMiddleware, (req, res) => {
  res.json({ valid: true, admin: req.admin });
});

module.exports = router;
