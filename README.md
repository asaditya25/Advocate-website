# Advocate Website

A full-stack web application for Advocate Anil Kumar Singh's legal services. Built using **React.js**, **Tailwind CSS**, **Node.js**, **Express.js**, and **MongoDB**. This website includes appointment booking, contact form, admin dashboard, and responsive UI with legal-themed design.

---

## 🌐 Live Preview (Optional)

> *link if hosted on Render, Vercel, or Netlify.*

---

## 📁 Folder Structure

```
advocate-website/
├── client/               # React frontend
│   ├── public/
│   │   └── assets/       # Images and icons
│   └── src/
│       ├── components/   # Navbar, Footer, etc.
│       ├── pages/        # Home, About, Services, Contact, Admin
│       ├── App.js
│       └── index.js
├── server/               # Node.js backend
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API endpoints
│   └── server.js
├── .gitignore
├── package.json
└── README.md
```

---

## ✨ Features

* ✅ Homepage with cover image and intro
* ✅ About page with background and mission
* ✅ Services section with hoverable cards
* ✅ Contact page with form and embedded Google Maps
* ✅ Appointment Booking (form + MongoDB save)
* ✅ Admin Dashboard to view appointments
* ✅ Live Chat Widget (Tawk.to)
* ✅ Fully Responsive (mobile/tablet friendly)
* ✅ Tailwind CSS animations and dark shades for legal theme

---

## 🛠️ Tech Stack

* **Frontend**: React.js, Tailwind CSS
* **Backend**: Node.js, Express.js
* **Database**: MongoDB Atlas
* **Email Service**: Nodemailer (for booking confirmations)
* **Deployment**: (add if deployed)

---

## 🧠 Concepts Used

* `useState` and `useEffect` hooks for state and lifecycle
* `async/await` for backend calls
* `fetch()` and `axios` for API integration
* REST APIs with Express
* Mongoose for schema validation and MongoDB
* Error handling and form validation
* Routing with React Router DOM

---

## 📝 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/advocate-website.git
```

### 2. Navigate to project

```bash
cd advocate-website
```

### 3. Install dependencies

```bash
cd client
npm install
cd ../server
npm install
```

### 4. Environment Variables

Create a `.env` file in the `/server` folder:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password
```

### 5. Run the project

```bash
# Run backend
cd server
npm start

# Run frontend
cd ../client
npm start
```

---

## 🚀 Future Improvements

* Admin authentication
* Case document uploads
* Calendar view for appointments
* Notifications and dashboard analytics

---

## 🙋‍♂️ Author

**Aditya Singh**
[GitHub](https://github.com/asaditya25 • [LinkedIn](https://linkedin.com/in/adii25)

---

## 📄 License

This project is licensed under the MIT License.

---

> ⚖️ A professional website designed for advocates and legal advisors to improve their digital presence.
