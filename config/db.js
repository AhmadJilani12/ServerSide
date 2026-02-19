// config/db.js
const mongoose = require('mongoose');

let isConnected = false; // Cached connection for serverless

const connectDB = async () => {
  if (isConnected) return; // Already connected

  const db = await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  });

  isConnected = db.connections[0].readyState;
  console.log('✅ MongoDB Connected');
};

module.exports = connectDB;
