const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    if (err.name === 'MongooseServerSelectionError') {
      console.error('➡️  Check your IP whitelist and network access settings in MongoDB Atlas.');
    }
    process.exit(1);
  }
};

module.exports = connectDB;
