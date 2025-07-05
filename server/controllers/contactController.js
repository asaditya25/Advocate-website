const nodemailer = require('nodemailer');

exports.sendContactEmail = async (req, res) => {
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
};
