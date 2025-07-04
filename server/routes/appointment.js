const express = require('express');
const Appointment = require('../models/Appointment');
const nodemailer = require('nodemailer');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

// Admin login route
router.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log('Admin not found for email:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    console.log('Admin found:', admin.email, 'Hashed password:', admin.password);
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log('Password match result:', isMatch);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
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
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// GET /api/appointments - get all appointments
router.get('/', authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: -1 });
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// DELETE /api/appointments/:id - delete appointment by ID
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
});

// POST /api/appointments - create a new appointment and send confirmation email
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, date, message } = req.body;
    if (!name || !email || !phone || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const appointment = new Appointment({ name, email, phone, date: new Date(date), message });
    await appointment.save();

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    // Confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Appointment Confirmation',
      text: `Dear ${name},\n\nYour appointment is confirmed for ${new Date(date).toLocaleString()}.\n\nMessage: ${message || 'N/A'}\n\nThank you for booking with us!`
    };

    // Notification email to admin (optional)
    const adminMailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: 'New Appointment Booked',
      text: `New appointment booked:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${new Date(date).toLocaleString()}\nMessage: ${message || 'N/A'}`
    };

    // Send emails
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    res.status(201).json({ message: 'Appointment created and confirmation email sent', appointment });
  } catch (err) {
    console.error('Error creating appointment or sending email:', err);
    res.status(500).json({ error: 'Failed to create appointment or send email', details: err.message });
  }
});

module.exports = router;
