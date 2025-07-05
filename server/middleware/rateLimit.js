const rateLimit = require('express-rate-limit');

// Limit to 10 requests per minute per IP for sensitive endpoints
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: 'Too many requests from this IP, please try again later.'
});

module.exports = limiter;
