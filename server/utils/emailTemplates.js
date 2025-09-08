const generateAppointmentConfirmationEmail = (appointmentData) => {
  const { name, email, phone, date, message } = appointmentData;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Appointment Confirmation</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; line-height: 1.6;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
        
        <!-- Header Section -->
        <div style="background: linear-gradient(135deg, #0a1a2f 0%, #1a365d 100%); padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <div style="color: #d4af37; font-size: 28px; font-weight: bold; margin-bottom: 10px; display: flex; align-items: center; justify-content: center; gap: 10px;">
            <span style="font-size: 32px;">⚖️</span>
            Advocate Portal
          </div>
          <div style="color: #f7fafc; font-size: 16px; font-weight: 300;">
            Professional Legal Services
          </div>
        </div>

        <!-- Main Content Card -->
        <div style="padding: 40px 30px; background-color: #ffffff; border-radius: 0 0 10px 10px;">
          
          <!-- Welcome Message -->
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0a1a2f; font-size: 24px; margin-bottom: 10px; font-weight: 600;">
              Appointment Confirmed! ✅
            </h1>
            <p style="color: #4a5568; font-size: 16px; margin: 0;">
              Dear <strong style="color: #0a1a2f;">${name}</strong>, your appointment has been successfully booked.
            </p>
          </div>

          <!-- Appointment Details Table -->
          <div style="background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); border-radius: 12px; padding: 25px; margin: 25px 0; border: 2px solid #d4af37;">
            <h2 style="color: #0a1a2f; font-size: 18px; margin-bottom: 20px; text-align: center; font-weight: 600;">
              📋 Appointment Details
            </h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px 15px; font-weight: 600; color: #2d3748; width: 30%; vertical-align: top;">
                  <span style="margin-right: 8px;">👤</span>Name:
                </td>
                <td style="padding: 12px 15px; color: #4a5568;">
                  ${name}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px 15px; font-weight: 600; color: #2d3748; vertical-align: top;">
                  <span style="margin-right: 8px;">📧</span>Email:
                </td>
                <td style="padding: 12px 15px; color: #4a5568;">
                  ${email}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px 15px; font-weight: 600; color: #2d3748; vertical-align: top;">
                  <span style="margin-right: 8px;">📞</span>Phone:
                </td>
                <td style="padding: 12px 15px; color: #4a5568;">
                  ${phone}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px 15px; font-weight: 600; color: #2d3748; vertical-align: top;">
                  <span style="margin-right: 8px;">📅</span>Date & Time:
                </td>
                <td style="padding: 12px 15px; color: #4a5568; font-weight: 600;">
                  ${new Date(date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </td>
              </tr>
              ${message ? `
              <tr>
                <td style="padding: 12px 15px; font-weight: 600; color: #2d3748; vertical-align: top;">
                  <span style="margin-right: 8px;">💬</span>Message:
                </td>
                <td style="padding: 12px 15px; color: #4a5568;">
                  ${message}
                </td>
              </tr>
              ` : ''}
            </table>
          </div>

          <!-- Call to Action Button -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:${email}?subject=Re: Appointment Confirmation&body=Thank you for booking your appointment. We will contact you soon with further details." 
               style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%); color: #0a1a2f; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3); transition: all 0.3s ease;">
              📧 Confirm Appointment
            </a>
          </div>

          <!-- Important Notice -->
          <div style="background-color: #e6fffa; border-left: 4px solid #38b2ac; padding: 15px; margin: 25px 0; border-radius: 0 8px 8px 0;">
            <p style="margin: 0; color: #2d3748; font-size: 14px;">
              <strong>📌 Important:</strong> Our team will contact you within 24 hours to confirm the appointment details. 
              Please ensure your contact information is accurate.
            </p>
          </div>

          <!-- Contact Information -->
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 25px 0; text-align: center;">
            <h3 style="color: #0a1a2f; margin-bottom: 15px; font-size: 16px;">📍 Contact Information</h3>
            <p style="margin: 5px 0; color: #4a5568; font-size: 14px;">
              📧 Email: advocate.anil@example.com
            </p>
            <p style="margin: 5px 0; color: #4a5568; font-size: 14px;">
              📞 Phone: +91-9838904755
            </p>
            <p style="margin: 5px 0; color: #4a5568; font-size: 14px;">
              📍 Address: Civil Court Road, Lucknow, UP
            </p>
          </div>

        </div>

        <!-- Footer -->
        <div style="background-color: #2d3748; padding: 20px; text-align: center; border-radius: 0 0 10px 10px;">
          <p style="color: #a0aec0; font-size: 14px; margin: 0;">
            © ${new Date().getFullYear()} Advocate Portal. All rights reserved.
          </p>
          <p style="color: #718096; font-size: 12px; margin: 5px 0 0 0;">
            Professional Legal Services | Trusted Advocacy
          </p>
        </div>

      </div>
    </body>
    </html>
  `;
};

const generateAdminNotificationEmail = (appointmentData) => {
  const { name, email, phone, date, message } = appointmentData;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Appointment Notification</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; line-height: 1.6;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
        
        <!-- Header Section -->
        <div style="background: linear-gradient(135deg, #1a365d 0%, #0a1a2f 100%); padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <div style="color: #d4af37; font-size: 28px; font-weight: bold; margin-bottom: 10px; display: flex; align-items: center; justify-content: center; gap: 10px;">
            <span style="font-size: 32px;">⚖️</span>
            Admin Dashboard
          </div>
          <div style="color: #f7fafc; font-size: 16px; font-weight: 300;">
            New Appointment Notification
          </div>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px 30px; background-color: #ffffff;">
          
          <!-- Alert Badge -->
          <div style="text-align: center; margin-bottom: 25px;">
            <div style="display: inline-block; background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%); color: white; padding: 8px 20px; border-radius: 20px; font-size: 14px; font-weight: 600;">
              🔔 NEW APPOINTMENT
            </div>
          </div>

          <!-- Main Message -->
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0a1a2f; font-size: 24px; margin-bottom: 10px; font-weight: 600;">
              New Appointment Booked
            </h1>
            <p style="color: #4a5568; font-size: 16px; margin: 0;">
              A new client has scheduled an appointment. Please review the details below.
            </p>
          </div>

          <!-- Client Details Table -->
          <div style="background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); border-radius: 12px; padding: 25px; margin: 25px 0; border: 2px solid #d4af37;">
            <h2 style="color: #0a1a2f; font-size: 18px; margin-bottom: 20px; text-align: center; font-weight: 600;">
              👤 Client Information
            </h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px 15px; font-weight: 600; color: #2d3748; width: 30%; vertical-align: top;">
                  <span style="margin-right: 8px;">👤</span>Client Name:
                </td>
                <td style="padding: 12px 15px; color: #4a5568; font-weight: 600;">
                  ${name}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px 15px; font-weight: 600; color: #2d3748; vertical-align: top;">
                  <span style="margin-right: 8px;">📧</span>Email:
                </td>
                <td style="padding: 12px 15px; color: #4a5568;">
                  <a href="mailto:${email}" style="color: #3182ce; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px 15px; font-weight: 600; color: #2d3748; vertical-align: top;">
                  <span style="margin-right: 8px;">📞</span>Phone:
                </td>
                <td style="padding: 12px 15px; color: #4a5568;">
                  <a href="tel:${phone}" style="color: #3182ce; text-decoration: none;">${phone}</a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px 15px; font-weight: 600; color: #2d3748; vertical-align: top;">
                  <span style="margin-right: 8px;">📅</span>Appointment Date:
                </td>
                <td style="padding: 12px 15px; color: #e53e3e; font-weight: 600; background-color: #fed7d7; border-radius: 4px;">
                  ${new Date(date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px 15px; font-weight: 600; color: #2d3748; vertical-align: top;">
                  <span style="margin-right: 8px;">⏰</span>Booking Time:
                </td>
                <td style="padding: 12px 15px; color: #4a5568;">
                  ${new Date().toLocaleString()}
                </td>
              </tr>
              ${message ? `
              <tr>
                <td style="padding: 12px 15px; font-weight: 600; color: #2d3748; vertical-align: top;">
                  <span style="margin-right: 8px;">💬</span>Message:
                </td>
                <td style="padding: 12px 15px; color: #4a5568; background-color: #f7fafc; border-radius: 4px;">
                  "${message}"
                </td>
              </tr>
              ` : ''}
            </table>
          </div>

          <!-- Action Buttons -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:${email}?subject=Re: Your Appointment Request&body=Dear ${name},%0A%0AThank you for scheduling an appointment with us.%0A%0ABest regards,%0AAdvocate Portal Team" 
               style="display: inline-block; background: linear-gradient(135deg, #38a169 0%, #2f855a 100%); color: white; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-weight: 600; font-size: 14px; margin: 0 10px 10px 0; box-shadow: 0 4px 15px rgba(56, 161, 105, 0.3);">
              ✉️ Reply to Client
            </a>
            
            <a href="tel:${phone}" 
               style="display: inline-block; background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%); color: white; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-weight: 600; font-size: 14px; margin: 0 10px 10px 0; box-shadow: 0 4px 15px rgba(49, 130, 206, 0.3);">
              📞 Call Client
            </a>
          </div>

          <!-- Quick Actions -->
          <div style="background-color: #fef5e7; border: 1px solid #d69e2e; border-radius: 8px; padding: 15px; margin: 25px 0;">
            <h3 style="color: #744210; margin-bottom: 10px; font-size: 16px;">⚡ Quick Actions Required:</h3>
            <ul style="color: #744210; margin: 0; padding-left: 20px; font-size: 14px;">
              <li>Confirm appointment availability</li>
              <li>Add to calendar and schedule</li>
              <li>Prepare case materials if needed</li>
              <li>Send confirmation to client</li>
            </ul>
          </div>

        </div>

        <!-- Footer -->
        <div style="background-color: #2d3748; padding: 15px; text-align: center; border-radius: 0 0 10px 10px;">
          <p style="color: #a0aec0; font-size: 12px; margin: 0;">
            Advocate Portal Admin Dashboard | ${new Date().getFullYear()}
          </p>
        </div>

      </div>
    </body>
    </html>
  `;
};

module.exports = {
  generateAppointmentConfirmationEmail,
  generateAdminNotificationEmail
};
