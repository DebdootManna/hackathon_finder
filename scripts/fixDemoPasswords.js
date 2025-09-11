const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const fixDemoPasswords = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB for password fix');

    // Find all demo users
    const demoUsers = await User.find({ email: { $regex: '@demo.com$' } });
    console.log(`Found ${demoUsers.length} demo users to fix`);

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('demo123456', salt);

    // Update all demo users with hashed password
    const result = await User.updateMany(
      { email: { $regex: '@demo.com$' } },
      { $set: { password: hashedPassword } }
    );

    console.log(`Updated ${result.modifiedCount} user passwords`);

    // Verify one user
    const testUser = await User.findOne({ email: 'sarah.chen@demo.com' });
    const isMatch = await bcrypt.compare('demo123456', testUser.password);
    console.log(`Password verification test: ${isMatch ? 'PASSED' : 'FAILED'}`);

    console.log('Demo user passwords fixed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error fixing passwords:', error);
    process.exit(1);
  }
};

// Run the password fix
fixDemoPasswords();
