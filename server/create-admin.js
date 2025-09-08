const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const readline = require('readline');
require('dotenv').config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function createAdmin() {
  try {
    if (!process.env.MONGO_URI) {
      console.error('❌ Error: MONGO_URI not found in .env file');
      console.log('Please set up your .env file with MongoDB connection string');
      process.exit(1);
    }

    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    let email, password;
    
    // Check if command line arguments are provided
    if (process.argv[2] && process.argv[3]) {
      email = process.argv[2];
      password = process.argv[3];
    } else {
      // Interactive mode
      console.log('\n👨‍💼 Creating Admin User');
      console.log('===================');
      email = await askQuestion('Enter admin email: ');
      password = await askQuestion('Enter admin password (min 6 characters): ');
    }

    // Validate input
    if (!email || !email.includes('@')) {
      console.error('❌ Error: Please provide a valid email address');
      process.exit(1);
    }
    
    if (!password || password.length < 6) {
      console.error('❌ Error: Password must be at least 6 characters long');
      process.exit(1);
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      const overwrite = await askQuestion(`⚠️  Admin with email ${email} already exists. Overwrite? (y/N): `);
      if (overwrite.toLowerCase() !== 'y') {
        console.log('❌ Admin creation cancelled');
        process.exit(0);
      }
      await Admin.deleteOne({ email });
      console.log('🗑️  Existing admin removed');
    }

    // Create new admin
    const admin = new Admin({ email, password });
    await admin.save();
    
    console.log('✅ Admin created successfully!');
    console.log(`📧 Email: ${email}`);
    console.log('🔐 Password: [hidden]');
    console.log('\n🚀 You can now log in to the admin dashboard');
    
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    if (error.name === 'ValidationError') {
      console.error('Validation errors:', Object.values(error.errors).map(e => e.message));
    }
  } finally {
    rl.close();
    await mongoose.disconnect();
    process.exit(0);
  }
}

createAdmin();
