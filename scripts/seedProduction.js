// Run this script once to seed your production database
// node scripts/seedProduction.js

require('dotenv').config();
const mongoose = require('mongoose');

// Use your production MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI || 'your_atlas_connection_string_here';

async function seedProduction() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to production MongoDB');
    
    // Import and run your existing seed script
    const seedData = require('./seedData');
    console.log('Production database seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding production database:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedProduction();
