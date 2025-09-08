# ⚖️ Advocate Portal - Professional Legal Services Website

A modern, full-stack web application for Advocate Anil Kumar Singh's legal services. Built with **React.js**, **Tailwind CSS**, **Node.js**, **Express.js**, and **MongoDB**. Features professional email templates, appointment booking, admin dashboard, and responsive UI with legal-themed design.

---

## 🌐 Live Preview (Optional)

> *Available for hosting on Render, Vercel, or Netlify.*

---

## 📁 Project Structure

```
advocate-website/
├── client/                    # React frontend
│   ├── public/
│   │   └── assets/           # Images and icons
│   └── src/
│       ├── components/       # Navbar, Footer, UI components
│       │   ├── Home/         # Home page components
│       │   └── ui/           # Reusable UI components
│       ├── pages/            # Home, About, Services, Contact, Admin
│       ├── utils/            # API configuration
│       ├── App.js
│       └── index.js
├── server/                    # Node.js backend
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API endpoints
│   ├── middleware/           # Custom middleware
│   ├── utils/                # Email service & templates
│   │   ├── emailService.js   # Professional email service
│   │   └── emailTemplates.js # Modern HTML templates
│   └── server.js            # Main server file
├── .gitignore
├── package.json
├── README.md
├── CLEANED_PROJECT_STRUCTURE.md
├── ERROR_FIXES_REPORT.md
└── EMAIL_SERVICE_DOCUMENTATION.md
```

---

## ✨ Features

### 🎨 Frontend Features
* ✅ Modern homepage with professional design
* ✅ About page with background and mission
* ✅ Interactive services section with animations
* ✅ Contact page with form validation
* ✅ Appointment booking with real-time feedback
* ✅ Secure admin dashboard
* ✅ Fully responsive design (mobile/tablet/desktop)
* ✅ Professional color scheme and animations

### 🔧 Backend Features
* ✅ RESTful API with Express.js
* ✅ MongoDB integration with Mongoose
* ✅ JWT authentication for admin access
* ✅ Rate limiting and security middleware
* ✅ Input validation and error handling
* ✅ Professional email service integration

### 📧 Email System
* ✅ **Professional HTML Templates**: Modern, responsive email designs
* ✅ **Appointment Confirmations**: Branded emails with appointment details
* ✅ **Admin Notifications**: Real-time alerts for new bookings
* ✅ **Contact Form Confirmations**: Thank you emails for contact submissions
* ✅ **Email Management**: Admin tools for testing and resending emails
* ✅ **Template Customization**: Centralized email template management

---

## 🛠️ Tech Stack

* **Frontend**: React.js 18, Tailwind CSS, React Router DOM
* **Backend**: Node.js, Express.js, MongoDB Atlas
* **Email Service**: Nodemailer with professional HTML templates
* **Authentication**: JWT tokens, bcrypt password hashing
* **Security**: Rate limiting, input validation, error handling
* **Database**: MongoDB with Mongoose ODM

---

## 🧠 Advanced Concepts Used

* **React Hooks**: `useState`, `useEffect`, custom hooks
* **Async Operations**: `async/await`, Promise handling
* **API Integration**: Axios for HTTP requests
* **Email Templates**: Modern HTML with inline CSS
* **Security**: JWT authentication, rate limiting, input sanitization
* **Error Handling**: Comprehensive error management
* **Separation of Concerns**: Modular code architecture
* **Professional Email Design**: Responsive HTML templates

---

## 📝 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/asaditya25/Advocate-website.git
cd Advocate-website
```

### 2. Install dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Environment Variables

Create a `.env` file in the `/server` folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_here
EMAIL=your_gmail@gmail.com
PASSWORD=your_gmail_app_password
```

### 4. Run the project

**Option 1: Quick Start (Windows)**
```bash
# Use the convenient batch file
start-dev.bat
```

**Option 2: Manual Start**
```bash
# Terminal 1 - Start server
cd server
npm start

# Terminal 2 - Start client  
cd client
npm start
```

### 5. Access the application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Dashboard**: http://localhost:3000/admin

---

## 📧 Email Templates

The application includes 4 professional email templates:

1. **Appointment Confirmation** (Client): Modern confirmation with appointment details
2. **Admin Notification** (Appointment): Detailed alert with client information
3. **Contact Confirmation** (Client): Thank you message with response expectations  
4. **Contact Admin Notification**: Contact form details with quick reply options

All templates feature:
- Responsive design for all devices
- Professional brand colors (Navy #0a1a2f, Gold #d4af37)
- Interactive elements (mailto, tel links)
- Modern styling with gradients and shadows

---

## 🔐 API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login

### Appointments
- `GET /api/appointments` - Get all appointments (admin)
- `POST /api/appointments` - Create appointment with email notifications
- `DELETE /api/appointments/:id` - Delete appointment (admin)
- `POST /api/appointments/resend-email/:id` - Resend confirmation email (admin)
- `GET /api/appointments/email-templates` - List available templates (admin)
- `POST /api/appointments/test-email` - Send test emails (admin)

### Contact
- `POST /api/contact` - Submit contact form with dual notifications

---

## 🚀 Recent Updates

### Major Project Overhaul (Latest)
- ✅ **Email Service Integration**: Professional HTML email system
- ✅ **Code Cleanup**: Removed redundant files and optimized structure
- ✅ **Enhanced Security**: Improved validation and error handling
- ✅ **Admin Tools**: Email management and testing capabilities
- ✅ **Documentation**: Comprehensive guides and reports
- ✅ **Production Ready**: Optimized for deployment

---

## 🛡️ Security Features

- **JWT Authentication**: Secure admin access with token validation
- **Rate Limiting**: Prevents spam and abuse
- **Input Validation**: Comprehensive sanitization and validation
- **Error Handling**: Graceful error responses without data leaks
- **Environment Variables**: Secure configuration management

---

## 🚀 Future Improvements

* Calendar view for appointment management
* Case document upload system
* Multi-language support
* Email analytics and tracking
* Real-time notifications
* Payment integration
* Client portal with case tracking

---

## 📄 Documentation

- [Email Service Documentation](server/EMAIL_SERVICE_DOCUMENTATION.md)
- [Project Structure Report](CLEANED_PROJECT_STRUCTURE.md)
- [Error Fixes Report](ERROR_FIXES_REPORT.md)

---

## 🙋‍♂️ Author

**Aditya Singh**
- [GitHub](https://github.com/asaditya25)
- [LinkedIn](https://linkedin.com/in/adii25)

---

## 📄 License

This project is licensed under the MIT License.

---

> ⚖️ A professional website designed for advocates and legal advisors to enhance their digital presence with modern technology and professional email communications.
