const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const appointmentRoutes = require('./routes/appointment');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');
const { generalLimiter } = require('./middleware/rateLimit');

const app = express();

// Apply middleware
app.use(logger);
app.use(generalLimiter);
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection with detailed error handling
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    if (err.name === 'MongooseServerSelectionError') {
      console.error('➡️  Check your IP whitelist and network access settings in MongoDB Atlas.');
    }
    process.exit(1);
  }
})();

// API routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Serve static files from the React app build
app.use(express.static(path.join(__dirname, '../client/build')));

// Catch-all route: send index.html for any non-API requests (client-side routing)
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  } else {
    res.status(404).send('API route not found');
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
