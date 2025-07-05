
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const path = require('path');
require('dotenv').config();



const appointmentRoutes = require('./routes/appointment');
const contactRoutes = require('./routes/contact');
const rateLimit = require('./middleware/rateLimit');



const app = express();
const logger = require('./middleware/logger');
app.use(logger);
app.use(helmet());
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();



// Rate limit sensitive endpoints
app.use('/api/appointments', rateLimit, appointmentRoutes);
app.use('/api/contact', rateLimit, contactRoutes);



// Serve static files from the React app build
app.use(express.static(path.join(__dirname, '../client/build')));

// Error handling middleware (should be after all routes)
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

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
