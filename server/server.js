const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const appointmentRoutes = require('./routes/appointment');

const app = express();
app.use(cors());
app.use(express.json());

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

// Appointment API routes
app.use('/api/appointments', appointmentRoutes);

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL,
      subject: `Message from ${name}`,
      text: message,
    });

    res.send("Email sent successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error sending email");
  }
});

// Serve static files from the React app build (only in production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Wildcard route for React Router (after API routes)
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    } else {
      res.status(404).send('API route not found');
    }
  });
}

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
