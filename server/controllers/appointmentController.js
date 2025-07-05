const Appointment = require('../models/Appointment');
const nodemailer = require('nodemailer');

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: -1 });
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const { name, email, phone, date, message } = req.body;
    if (!name || !email || !phone || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const appointment = new Appointment({ name, email, phone, date: new Date(date), message });
    await appointment.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    const userMailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Appointment Confirmation',
      text: `Dear ${name},\n\nYour appointment is confirmed for ${new Date(date).toLocaleString()}.\n\nMessage: ${message || 'N/A'}\n\nThank you for booking with us!`
    };

    const adminMailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: 'New Appointment Booked',
      text: `New appointment booked:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${new Date(date).toLocaleString()}\nMessage: ${message || 'N/A'}`
    };

    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    res.status(201).json({ message: 'Appointment created and confirmation email sent', appointment });
  } catch (err) {
    console.error('Error creating appointment or sending email:', err);
    res.status(500).json({ error: 'Failed to create appointment or send email', details: err.message });
  }
};
