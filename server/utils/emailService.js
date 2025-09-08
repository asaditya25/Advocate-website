const nodemailer = require('nodemailer');
const { 
  generateAppointmentConfirmationEmail, 
  generateAdminNotificationEmail 
} = require('./emailTemplates');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });
  }

  async sendAppointmentConfirmation(appointmentData) {
    const { name, email } = appointmentData;
    
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Appointment Confirmation - Advocate Portal',
      html: generateAppointmentConfirmationEmail(appointmentData)
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log(`✅ Confirmation email sent to ${name} (${email})`);
      return result;
    } catch (error) {
      console.error(`❌ Failed to send confirmation email to ${email}:`, error.message);
      throw error;
    }
  }

  async sendAdminNotification(appointmentData) {
    const { name } = appointmentData;
    
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: '🔔 New Appointment Booking - Advocate Portal',
      html: generateAdminNotificationEmail(appointmentData)
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log(`✅ Admin notification sent for appointment by ${name}`);
      return result;
    } catch (error) {
      console.error(`❌ Failed to send admin notification:`, error.message);
      throw error;
    }
  }

  async sendContactConfirmation(contactData) {
    const { name, email, message } = contactData;
    
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Contact Confirmation - Advocate Portal',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Contact Confirmation</title>
        </head>
        <body style="font-family: 'Segoe UI', sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #0a1a2f 0%, #1a365d 100%); padding: 30px; text-align: center;">
              <h1 style="color: #d4af37; margin: 0; font-size: 24px;">⚖️ Advocate Portal</h1>
              <p style="color: #f7fafc; margin: 10px 0 0 0;">Thank you for contacting us</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px;">
              <h2 style="color: #0a1a2f; margin-bottom: 20px;">Hello ${name},</h2>
              <p style="color: #4a5568; line-height: 1.6; margin-bottom: 20px;">
                We have received your message and will get back to you within 24 hours.
              </p>
              
              <div style="background: #f7fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #d4af37; margin: 20px 0;">
                <h3 style="color: #0a1a2f; margin-top: 0;">Your Message:</h3>
                <p style="color: #4a5568; margin-bottom: 0;">"${message}"</p>
              </div>
              
              <p style="color: #4a5568; line-height: 1.6;">
                Best regards,<br>
                <strong style="color: #0a1a2f;">Advocate Portal Team</strong>
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background: #2d3748; padding: 20px; text-align: center;">
              <p style="color: #a0aec0; margin: 0; font-size: 14px;">
                © ${new Date().getFullYear()} Advocate Portal. All rights reserved.
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log(`✅ Contact confirmation sent to ${name} (${email})`);
      return result;
    } catch (error) {
      console.error(`❌ Failed to send contact confirmation to ${email}:`, error.message);
      throw error;
    }
  }

  async sendContactNotificationToAdmin(contactData) {
    const { name, email, message } = contactData;
    
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `📧 New Contact Message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>New Contact Message</title>
        </head>
        <body style="font-family: 'Segoe UI', sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1a365d 0%, #0a1a2f 100%); padding: 30px; text-align: center;">
              <h1 style="color: #d4af37; margin: 0; font-size: 24px;">📧 New Contact Message</h1>
              <p style="color: #f7fafc; margin: 10px 0 0 0;">Admin Notification</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px;">
              <div style="background: #f7fafc; padding: 20px; border-radius: 8px; border: 2px solid #d4af37; margin-bottom: 20px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #2d3748; width: 100px;">👤 Name:</td>
                    <td style="padding: 8px 0; color: #4a5568;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #2d3748;">📧 Email:</td>
                    <td style="padding: 8px 0; color: #4a5568;">
                      <a href="mailto:${email}" style="color: #3182ce; text-decoration: none;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #2d3748; vertical-align: top;">💬 Message:</td>
                    <td style="padding: 8px 0; color: #4a5568;">"${message}"</td>
                  </tr>
                </table>
              </div>
              
              <div style="text-align: center;">
                <a href="mailto:${email}?subject=Re: Your Contact Message&body=Dear ${name},%0A%0AThank you for contacting us." 
                   style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%); color: #0a1a2f; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-weight: 600;">
                  📧 Reply to ${name}
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #2d3748; padding: 15px; text-align: center;">
              <p style="color: #a0aec0; margin: 0; font-size: 12px;">
                Admin Dashboard | ${new Date().getFullYear()}
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log(`✅ Contact notification sent to admin for message from ${name}`);
      return result;
    } catch (error) {
      console.error(`❌ Failed to send contact notification:`, error.message);
      throw error;
    }
  }
}

module.exports = new EmailService();
