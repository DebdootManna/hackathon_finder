const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

async function createFirstAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.email);
      process.exit(0);
    }

    // Create first admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@hackathonfinder.com',
      password: 'admin123456', // Will be hashed automatically
      role: 'admin'
    });

    await adminUser.save();
    console.log('✅ First admin user created successfully!');
    console.log('Email: admin@hackathonfinder.com');
    console.log('Password: admin123456');
    console.log('⚠️  Please change the password after first login!');

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createFirstAdmin();
