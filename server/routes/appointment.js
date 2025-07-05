const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { getAppointments, deleteAppointment, createAppointment } = require('../controllers/appointmentController');
const { authMiddleware } = require('../controllers/adminController');
const validate = require('../middleware/validate');



// GET /api/appointments - get all appointments
router.get('/', authMiddleware, getAppointments);

// DELETE /api/appointments/:id - delete appointment by ID
router.delete('/:id', authMiddleware, deleteAppointment);

// POST /api/appointments - create a new appointment and send confirmation email
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').notEmpty().withMessage('Phone is required'),
    body('date').notEmpty().withMessage('Date is required'),
  ],
  validate,
  createAppointment
);

module.exports = router;
