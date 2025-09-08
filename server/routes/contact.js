const express = require('express');
const Contact = require('../models/Contact');
const { validateContact } = require('../middleware/validate');
const { formLimiter } = require('../middleware/rateLimit');
const emailService = require('../utils/emailService');

const router = express.Router();

// POST /api/contact - send contact message
router.post('/', formLimiter, validateContact, async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save contact message to database
    const contact = new Contact({ name, email, message });
    await contact.save();
    console.log(`✅ New contact message saved from ${name}`);

    // Send confirmation email to user and notification to admin
    try {
      await Promise.all([
        emailService.sendContactConfirmation(contact),
        emailService.sendContactNotificationToAdmin(contact)
      ]);
      console.log(`✅ All contact emails sent successfully for ${name}`);
    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError.message);
      // Continue with success response even if email fails
    }

    res.status(201).json({ 
      message: 'Contact message sent successfully',
      contact: { 
        id: contact._id,
        name: contact.name, 
        email: contact.email, 
        message: contact.message,
        createdAt: contact.createdAt
      }
    });
  } catch (err) {
    console.error('❌ Error processing contact message:', err);
    res.status(500).json({ 
      error: 'Failed to send contact message', 
      details: err.message 
    });
  }
});

module.exports = router;
