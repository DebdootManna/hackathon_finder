const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hackathon = require('../models/Hackathon');
const User = require('../models/User');

dotenv.config();

const testCRUDOperations = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB for CRUD testing');
    console.log('\n=== TESTING CRUD OPERATIONS ===\n');

    // CREATE - Test creating a new hackathon
    console.log('1. CREATE Operation:');
    const newHackathon = new Hackathon({
      title: "Test Hackathon CRUD",
      description: "This is a test hackathon for CRUD operations",
      organizer: "Test Organizer",
      location: "Test Location",
      mode: "online",
      startDate: new Date("2024-12-01T10:00:00Z"),
      endDate: new Date("2024-12-03T18:00:00Z"),
      registrationDeadline: new Date("2024-11-25T23:59:59Z"),
      prizePool: "$10,000",
      themes: ["Testing", "CRUD"],
      technologies: ["Node.js", "MongoDB"],
      registrationLink: "https://test.com/register",
      status: "upcoming",
      difficulty: "beginner",
      tags: ["test", "crud"]
    });

    const createdHackathon = await newHackathon.save();
    console.log(`✅ Created hackathon: ${createdHackathon.title} (ID: ${createdHackathon._id})`);

    // READ - Test reading hackathons
    console.log('\n2. READ Operations:');
    
    // Read all hackathons
    const allHackathons = await Hackathon.find();
    console.log(`✅ Found ${allHackathons.length} total hackathons`);

    // Read specific hackathon by ID
    const foundHackathon = await Hackathon.findById(createdHackathon._id);
    console.log(`✅ Found hackathon by ID: ${foundHackathon.title}`);

    // Read with filters
    const onlineHackathons = await Hackathon.find({ mode: 'online' });
    console.log(`✅ Found ${onlineHackathons.length} online hackathons`);

    // Search functionality
    const searchResults = await Hackathon.find({
      $or: [
        { title: /AI/i },
        { themes: { $in: [/AI/i] } }
      ]
    });
    console.log(`✅ Found ${searchResults.length} AI-related hackathons`);

    // UPDATE - Test updating a hackathon
    console.log('\n3. UPDATE Operation:');
    const updatedHackathon = await Hackathon.findByIdAndUpdate(
      createdHackathon._id,
      { 
        title: "Updated Test Hackathon CRUD",
        prizePool: "$15,000",
        updatedAt: Date.now()
      },
      { new: true }
    );
    console.log(`✅ Updated hackathon: ${updatedHackathon.title} - Prize: ${updatedHackathon.prizePool}`);

    // DELETE - Test deleting a hackathon
    console.log('\n4. DELETE Operation:');
    const deletedHackathon = await Hackathon.findByIdAndDelete(createdHackathon._id);
    console.log(`✅ Deleted hackathon: ${deletedHackathon.title}`);

    // Verify deletion
    const verifyDeletion = await Hackathon.findById(createdHackathon._id);
    console.log(`✅ Verification - Hackathon exists after deletion: ${verifyDeletion ? 'Yes' : 'No'}`);

    // Test User CRUD operations
    console.log('\n=== USER CRUD OPERATIONS ===\n');

    // CREATE User
    console.log('1. CREATE User:');
    const newUser = new User({
      name: "Test User",
      email: "testuser@crud.com",
      password: "testpassword123",
      profile: {
        bio: "Test user for CRUD operations",
        skills: ["Testing", "MongoDB"],
        experience: "beginner",
        interests: ["CRUD", "Testing"]
      }
    });

    const createdUser = await newUser.save();
    console.log(`✅ Created user: ${createdUser.name} (ID: ${createdUser._id})`);

    // READ User
    console.log('\n2. READ User:');
    const foundUser = await User.findById(createdUser._id).select('-password');
    console.log(`✅ Found user: ${foundUser.name} - Email: ${foundUser.email}`);

    // UPDATE User
    console.log('\n3. UPDATE User:');
    const updatedUser = await User.findByIdAndUpdate(
      createdUser._id,
      { 
        name: "Updated Test User",
        'profile.bio': "Updated bio for CRUD testing"
      },
      { new: true }
    ).select('-password');
    console.log(`✅ Updated user: ${updatedUser.name}`);

    // DELETE User
    console.log('\n4. DELETE User:');
    const deletedUser = await User.findByIdAndDelete(createdUser._id);
    console.log(`✅ Deleted user: ${deletedUser.name}`);

    // Advanced queries
    console.log('\n=== ADVANCED QUERIES ===\n');

    // Pagination test
    const page1 = await Hackathon.find().limit(3).skip(0);
    console.log(`✅ Pagination - Page 1: ${page1.length} hackathons`);

    // Sorting test
    const sortedByDate = await Hackathon.find().sort({ startDate: 1 }).limit(3);
    console.log(`✅ Sorted by start date: First hackathon starts on ${sortedByDate[0]?.startDate.toDateString()}`);

    // Aggregation test
    const statusCounts = await Hackathon.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    console.log('✅ Status distribution:');
    statusCounts.forEach(item => {
      console.log(`   ${item._id}: ${item.count}`);
    });

    console.log('\n🎉 All CRUD operations completed successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during CRUD testing:', error);
    process.exit(1);
  }
};

// Run the CRUD tests
testCRUDOperations();
