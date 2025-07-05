const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { sendContactEmail } = require('../controllers/contactController');
const validate = require('../middleware/validate');

// POST /api/contact
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').notEmpty().withMessage('Message is required'),
  ],
  validate,
  sendContactEmail
);

module.exports = router;
