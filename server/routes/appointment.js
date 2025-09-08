const express = require('express');
const Appointment = require('../models/Appointment');
const jwt = require('jsonwebtoken');
const { validateAppointment } = require('../middleware/validate');
const { formLimiter, authLimiter } = require('../middleware/rateLimit');
const emailService = require('../utils/emailService');

const router = express.Router();

// Admin login route (moved to admin routes, keeping for backward compatibility)
router.post('/admin/login', authLimiter, async (req, res) => {
  // Redirect to the new admin route
  res.status(301).json({ 
    error: 'This endpoint has moved', 
    newEndpoint: '/api/admin/login' 
  });
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

// GET /api/appointments - get all appointments (admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: -1 });
    res.status(200).json(appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// DELETE /api/appointments/:id - delete appointment by ID (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    console.error('Error deleting appointment:', err);
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
});

// POST /api/appointments - create a new appointment and send confirmation email
router.post('/', formLimiter, validateAppointment, async (req, res) => {
  try {
    const { name, email, phone, date, message } = req.body;
    
    const appointment = new Appointment({ 
      name: name.trim(), 
      email: email.trim().toLowerCase(), 
      phone: phone.trim(), 
      date: new Date(date), 
      message: message?.trim() || '' 
    });
    await appointment.save();

    // Send confirmation email to user and notification to admin
    try {
      await Promise.all([
        emailService.sendAppointmentConfirmation(appointment),
        emailService.sendAdminNotification(appointment)
      ]);
      console.log(`✅ All appointment emails sent successfully for ${name}`);
    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError.message);
      // Continue with success response even if email fails
    }

    // Return success response with appointment details
    res.status(201).json({ 
      message: 'Appointment created successfully', 
      appointment: {
        id: appointment._id,
        name: appointment.name,
        email: appointment.email,
        phone: appointment.phone,
        date: appointment.date,
        message: appointment.message,
        createdAt: appointment.createdAt
      }
    });
  } catch (err) {
    console.error('❌ Error creating appointment:', err);
    res.status(500).json({ 
      error: 'Failed to create appointment', 
      details: err.message 
    });
  }
});

// POST /api/appointments/resend-email/:id - resend confirmation email for an appointment (admin only)
router.post('/resend-email/:id', authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Resend confirmation email to user
    await emailService.sendAppointmentConfirmation(appointment);
    console.log(`✅ Confirmation email resent for appointment ${appointment._id}`);

    res.status(200).json({ 
      message: 'Confirmation email resent successfully',
      appointment: {
        id: appointment._id,
        name: appointment.name,
        email: appointment.email
      }
    });
  } catch (err) {
    console.error('❌ Error resending email:', err);
    res.status(500).json({ 
      error: 'Failed to resend email', 
      details: err.message 
    });
  }
});

// GET /api/appointments/email-templates - get available email templates (admin only)
router.get('/email-templates', authMiddleware, async (req, res) => {
  try {
    const templates = [
      {
        id: 'appointment-confirmation',
        name: 'Appointment Confirmation',
        description: 'Email sent to clients when they book an appointment',
        recipient: 'client'
      },
      {
        id: 'admin-notification',
        name: 'Admin Notification',
        description: 'Email sent to admin when a new appointment is booked',
        recipient: 'admin'
      },
      {
        id: 'contact-confirmation',
        name: 'Contact Form Confirmation',
        description: 'Email sent to clients when they submit a contact form',
        recipient: 'client'
      },
      {
        id: 'contact-admin-notification',
        name: 'Contact Admin Notification',
        description: 'Email sent to admin when a new contact form is submitted',
        recipient: 'admin'
      }
    ];

    res.status(200).json({ 
      message: 'Email templates retrieved successfully',
      templates 
    });
  } catch (err) {
    console.error('❌ Error fetching email templates:', err);
    res.status(500).json({ 
      error: 'Failed to fetch email templates', 
      details: err.message 
    });
  }
});

// POST /api/appointments/test-email - send test email (admin only)
router.post('/test-email', authMiddleware, async (req, res) => {
  try {
    const { templateType, testEmail } = req.body;

    if (!templateType || !testEmail) {
      return res.status(400).json({ 
        error: 'Template type and test email are required' 
      });
    }

    // Create a sample appointment for testing
    const sampleAppointment = {
      name: 'Test User',
      email: testEmail,
      phone: '+91-9999999999',
      date: new Date(),
      message: 'This is a test appointment for email template testing.',
      _id: 'test-appointment-id',
      createdAt: new Date()
    };

    // Send test email based on template type
    switch (templateType) {
      case 'appointment-confirmation':
        await emailService.sendAppointmentConfirmation(sampleAppointment);
        break;
      case 'admin-notification':
        await emailService.sendAdminNotification(sampleAppointment);
        break;
      default:
        return res.status(400).json({ 
          error: 'Invalid template type' 
        });
    }

    console.log(`✅ Test email sent successfully: ${templateType} to ${testEmail}`);

    res.status(200).json({ 
      message: 'Test email sent successfully',
      templateType,
      recipient: testEmail
    });
  } catch (err) {
    console.error('❌ Error sending test email:', err);
    res.status(500).json({ 
      error: 'Failed to send test email', 
      details: err.message 
    });
  }
});

module.exports = router;
