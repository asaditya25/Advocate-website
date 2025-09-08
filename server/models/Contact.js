const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
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
  message: { 
    type: String, 
    required: [true, 'Message is required'],
    trim: true,
    minlength: [10, 'Message must be at least 10 characters long']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'responded'],
    default: 'unread'
  }
});

// Index for efficient querying
contactSchema.index({ createdAt: -1 });
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });

module.exports = mongoose.model('Contact', contactSchema);
