const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI);
  const email = 'qqqq1245@gmail.com'; // change as needed
  const password = 'advocate11122'; // change as needed
  // Always remove existing admin with this email
  await Admin.deleteOne({ email });
  const admin = new Admin({ email, password });
  await admin.save();
  console.log('Admin created or updated:', email);
  process.exit();
}

createAdmin();
