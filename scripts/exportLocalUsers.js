const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

// Connect to local MongoDB
mongoose.connect('mongodb://localhost:27017/hackathon_finder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to local MongoDB'))
.catch(err => console.log('MongoDB connection error:', err));

async function exportUsers() {
  try {
    // Get all users from local database
    const users = await User.find({}).select('-__v -createdAt -updatedAt');
    
    console.log(`Found ${users.length} users in local database`);
    
    // Convert to plain objects and format for seeding
    const exportedUsers = users.map(user => {
      const userObj = user.toObject();
      
      // Remove MongoDB-specific fields
      delete userObj._id;
      delete userObj.__v;
      delete userObj.createdAt;
      delete userObj.updatedAt;
      
      // Keep the hashed password as-is for production
      return userObj;
    });
    
    console.log('\n=== EXPORTED USERS FOR PRODUCTION SEEDING ===');
    console.log('Copy this array and replace the users array in routes/admin.js:\n');
    console.log('const users = ' + JSON.stringify(exportedUsers, null, 2) + ';');
    
    console.log(`\n=== USER CREDENTIALS FOR TESTING ===`);
    exportedUsers.forEach((user, index) => {
      console.log(`${index + 1}. Email: ${user.email}`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Note: Password is already hashed from local DB\n`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Export error:', error);
    process.exit(1);
  }
}

exportUsers();
