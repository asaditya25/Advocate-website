// Validation middleware functions

const validateAppointment = (req, res, next) => {
  const { name, email, phone, date } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!email || !isValidEmail(email)) {
    errors.push('Valid email is required');
  }

  if (!phone || !isValidPhone(phone)) {
    errors.push('Valid phone number is required');
  }

  if (!date || !isValidDate(date)) {
    errors.push('Valid date is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') });
  }

  next();
};

const validateContact = (req, res, next) => {
  const { name, email, message } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!email || !isValidEmail(email)) {
    errors.push('Valid email is required');
  }

  if (!message || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') });
  }

  next();
};

const validateAdminLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !isValidEmail(email)) {
    errors.push('Valid email is required');
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') });
  }

  next();
};

// Helper functions
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

const isValidDate = (date) => {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime()) && parsedDate > new Date();
};

module.exports = {
  validateAppointment,
  validateContact,
  validateAdminLogin
};