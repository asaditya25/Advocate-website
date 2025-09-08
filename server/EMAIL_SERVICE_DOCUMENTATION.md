# Email Service Integration - Advocate Portal

## Overview
The Advocate Portal now includes a modern email service system with professional HTML templates for appointment confirmations and contact form responses.

## File Structure
```
server/
├── utils/
│   ├── emailService.js          # Main email service class
│   └── emailTemplates.js        # HTML email templates
└── routes/
    ├── appointment.js           # Updated with email service integration
    └── contact.js              # Updated with email service integration
```

## Email Service Features

### 1. EmailService Class (`utils/emailService.js`)
- **Purpose**: Centralized email handling with modern HTML templates
- **Methods**:
  - `sendAppointmentConfirmation(appointmentData)` - Sends professional confirmation to clients
  - `sendAdminNotification(appointmentData)` - Sends detailed notification to admin
  - `sendContactConfirmation(contactData)` - Sends confirmation for contact form submissions
  - `sendContactNotificationToAdmin(contactData)` - Sends contact form notification to admin

### 2. Email Templates (`utils/emailTemplates.js`)
- **Purpose**: Separation of concerns - templates separate from business logic
- **Features**:
  - Modern HTML design with professional styling
  - Responsive layout for all devices
  - Brand colors (Navy: #0a1a2f, Gold: #d4af37)
  - Interactive elements (mailto links, call buttons)
  - Proper email client compatibility

## API Endpoints

### Appointment Routes (`/api/appointments`)

#### Existing Endpoints (Updated)
- **POST** `/` - Create appointment with professional email notifications
- **GET** `/` - Get all appointments (admin only)
- **DELETE** `/:id` - Delete appointment (admin only)

#### New Email Management Endpoints
- **POST** `/resend-email/:id` - Resend confirmation email for specific appointment (admin only)
- **GET** `/email-templates` - Get list of available email templates (admin only)
- **POST** `/test-email` - Send test emails for template testing (admin only)

### Contact Routes (`/api/contact`)
- **POST** `/` - Submit contact form with dual email notifications (user + admin)

## Email Template Types

### 1. Appointment Confirmation (Client)
- **Subject**: "Appointment Confirmation - Advocate Portal"
- **Features**:
  - Professional header with branding
  - Detailed appointment information table
  - Contact information section
  - Call-to-action buttons
  - Important notice about follow-up

### 2. Admin Notification (Appointment)
- **Subject**: "🔔 New Appointment Booking - Advocate Portal"
- **Features**:
  - Alert badge for new appointments
  - Client information table
  - Quick action buttons (Reply, Call)
  - Action checklist for admin
  - Professional admin dashboard styling

### 3. Contact Confirmation (Client)
- **Subject**: "Contact Confirmation - Advocate Portal"
- **Features**:
  - Thank you message
  - Message confirmation
  - Response time expectation
  - Professional branding

### 4. Contact Admin Notification
- **Subject**: "📧 New Contact Message from [Name]"
- **Features**:
  - Message details
  - Quick reply button
  - Contact information
  - Professional admin styling

## Usage Examples

### Basic Appointment Creation
```javascript
// The email service is automatically called when creating appointments
const appointment = new Appointment(appointmentData);
await appointment.save();

// Emails are sent automatically:
await Promise.all([
  emailService.sendAppointmentConfirmation(appointment),
  emailService.sendAdminNotification(appointment)
]);
```

### Resend Email (Admin)
```javascript
// POST /api/appointments/resend-email/123
// Resends confirmation email for appointment ID 123
```

### Test Email Templates (Admin)
```javascript
// POST /api/appointments/test-email
{
  "templateType": "appointment-confirmation",
  "testEmail": "test@example.com"
}
```

## Email Configuration
Ensure these environment variables are set:
```
EMAIL=your-gmail@gmail.com
PASSWORD=your-app-password
JWT_SECRET=your-jwt-secret
```

## Error Handling
- Email failures don't block appointment/contact creation
- Detailed error logging for troubleshooting
- Graceful fallback when email service is unavailable
- Clear success/error messages in API responses

## Benefits
1. **Professional Appearance**: Modern HTML templates with brand styling
2. **Separation of Concerns**: Templates separate from business logic
3. **Maintainability**: Centralized email service for easy updates
4. **Admin Tools**: Test and resend email functionality
5. **Error Resilience**: Appointments still created even if emails fail
6. **Responsive Design**: Templates work on all devices and email clients

## Future Enhancements
- Email template customization through admin panel
- Email analytics and tracking
- Multiple email providers support
- Template versioning and A/B testing
- Automated follow-up email sequences
