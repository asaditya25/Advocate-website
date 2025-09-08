#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🚀 Setting up Advocate Website...\n');

// Generate JWT secret
const jwtSecret = crypto.randomBytes(64).toString('hex');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists. Please configure it manually.');
  console.log('📝 Use .env.example as a reference.\n');
} else {
  // Create .env from .env.example
  try {
    const envExample = fs.readFileSync(envExamplePath, 'utf8');
    const envContent = envExample.replace(
      'JWT_SECRET=your_very_secure_jwt_secret_key_at_least_32_characters_long',
      `JWT_SECRET=${jwtSecret}`
    );
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created .env file with generated JWT secret');
  } catch (error) {
    console.error('❌ Error creating .env file:', error.message);
  }
}

console.log('\n📋 Next steps:');
console.log('1. Configure your MongoDB connection string in .env');
console.log('2. Set up your email credentials in .env');
console.log('3. Configure MongoDB Atlas API keys if using addIpToWhitelist.js');
console.log('4. Run "npm install" to install dependencies');
console.log('5. Run "node create-admin.js" to create an admin user');
console.log('6. Run "npm start" to start the server\n');

console.log('🔧 For client setup:');
console.log('1. cd ../client');
console.log('2. npm install');
console.log('3. npm start\n');

console.log('📚 Documentation and troubleshooting available in README.md');
