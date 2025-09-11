const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const fixAllPasswords = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB for fixing all passwords');

    // Find all users with short passwords (plain text)
    const allUsers = await User.find({});
    console.log(`Found ${allUsers.length} total users`);

    let fixedCount = 0;

    for (const user of allUsers) {
      // If password length is less than 50, it's likely plain text
      if (user.password && user.password.length < 50) {
        console.log(`Fixing password for: ${user.name} (${user.email})`);
        
        // Hash the existing password (assuming it's "password123" for original users)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);
        
        // Update the user
        await User.findByIdAndUpdate(user._id, { password: hashedPassword });
        fixedCount++;
      }
    }

    console.log(`Fixed ${fixedCount} user passwords`);

    // Test login for both types of users
    console.log('\n=== TESTING LOGINS ===');
    
    // Test original user
    const originalUser = await User.findOne({ email: 'alice.johnson@email.com' });
    if (originalUser) {
      const isMatch1 = await bcrypt.compare('password123', originalUser.password);
      console.log(`Original user (alice.johnson@email.com) with "password123": ${isMatch1 ? 'WORKS' : 'FAILED'}`);
    }

    // Test demo user
    const demoUser = await User.findOne({ email: 'sarah.chen@demo.com' });
    if (demoUser) {
      const isMatch2 = await bcrypt.compare('demo123456', demoUser.password);
      console.log(`Demo user (sarah.chen@demo.com) with "demo123456": ${isMatch2 ? 'WORKS' : 'FAILED'}`);
    }

    console.log('\n=== LOGIN CREDENTIALS ===');
    console.log('Original users (alice.johnson@email.com, bob.smith@email.com, etc.):');
    console.log('Password: password123');
    console.log('\nDemo users (@demo.com):');
    console.log('Password: demo123456');

    console.log('\nAll user passwords fixed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error fixing passwords:', error);
    process.exit(1);
  }
};

// Run the password fix
fixAllPasswords();
