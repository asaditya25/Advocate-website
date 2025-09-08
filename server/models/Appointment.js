const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long']
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email']
  },
  phone: { 
    type: String, 
    required: [true, 'Phone number is required'],
    trim: true
  },
  date: { 
    type: Date, 
    required: [true, 'Appointment date is required'],
    validate: {
      validator: function(value) {
        return value > new Date();
      },
      message: 'Appointment date must be in the future'
    }
  },
  message: { 
    type: String,
    trim: true,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient querying
appointmentSchema.index({ date: 1 });
appointmentSchema.index({ email: 1 });
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
