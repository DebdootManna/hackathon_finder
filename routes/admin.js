const express = require('express');
const router = express.Router();
const Hackathon = require('../models/Hackathon');
const User = require('../models/User');

// @route   POST /api/admin/seed
// @desc    Seed production database (one-time use)
// @access  Public (but should be secured in real production)
router.post('/seed', async (req, res) => {
  try {
    // Check if data already exists
    const existingHackathons = await Hackathon.countDocuments();
    const existingUsers = await User.countDocuments();

    if (existingHackathons > 0 || existingUsers > 0) {
      return res.json({
        success: true,
        message: 'Database already seeded',
        data: {
          hackathons: existingHackathons,
          users: existingUsers
        }
      });
    }

    // Clear existing data (just in case)
    await Hackathon.deleteMany({});
    await User.deleteMany({});

    // Sample hackathons data
    const hackathons = [
      {
        title: "Global AI Innovation Challenge 2024",
        organizer: "TechCorp International",
        description: "Join the world's largest AI hackathon where innovators build solutions using artificial intelligence and machine learning technologies.",
        startDate: new Date('2024-03-15'),
        endDate: new Date('2024-03-17'),
        registrationDeadline: new Date('2024-03-10'),
        location: {
          type: "hybrid",
          venue: "San Francisco, CA (Hybrid)",
          address: "123 Tech Street, San Francisco, CA 94105"
        },
        prizePool: "$100,000",
        maxTeamSize: 4,
        themes: ["artificial-intelligence", "machine-learning", "data-science"],
        technologies: ["Python", "TensorFlow", "PyTorch", "JavaScript", "React"],
        difficulty: "intermediate",
        status: "upcoming",
        requirements: ["Basic programming knowledge", "Team of 2-4 members"],
        rules: ["Original code only", "48-hour time limit", "Open source preferred"],
        sponsors: ["TechCorp", "AI Ventures", "DataFlow Inc"],
        judges: ["Dr. Sarah Chen - AI Research Lead", "Marcus Johnson - CTO at DataFlow"],
        schedule: [
          { time: "09:00", event: "Registration & Welcome" },
          { time: "10:00", event: "Keynote & Challenge Announcement" },
          { time: "11:00", event: "Hacking Begins" }
        ],
        contactEmail: "info@techcorp.com",
        website: "https://aichallenge2024.com",
        socialMedia: {
          twitter: "@AIChallenge2024",
          linkedin: "ai-innovation-challenge"
        }
      },
      {
        title: "Blockchain for Good Hackathon",
        organizer: "CryptoForChange",
        description: "Build blockchain solutions that create positive social impact and address real-world problems.",
        startDate: new Date('2024-04-20'),
        endDate: new Date('2024-04-22'),
        registrationDeadline: new Date('2024-04-15'),
        location: {
          type: "online",
          venue: "Virtual Event",
          address: "Online"
        },
        prizePool: "$75,000",
        maxTeamSize: 5,
        themes: ["blockchain", "social-impact", "fintech"],
        technologies: ["Solidity", "Web3.js", "Ethereum", "React", "Node.js"],
        difficulty: "advanced",
        status: "upcoming",
        requirements: ["Blockchain development experience", "Team of 3-5 members"],
        rules: ["Must use blockchain technology", "Focus on social impact", "72-hour time limit"],
        sponsors: ["CryptoForChange", "Ethereum Foundation", "ConsenSys"],
        judges: ["Alex Rivera - Blockchain Architect", "Dr. Kim Park - DeFi Expert"],
        schedule: [
          { time: "08:00", event: "Virtual Check-in" },
          { time: "09:00", event: "Opening Ceremony" },
          { time: "10:00", event: "Hacking Begins" }
        ],
        contactEmail: "hello@cryptoforchange.org",
        website: "https://blockchainforgoood.org",
        socialMedia: {
          twitter: "@BlockchainForGood",
          discord: "blockchain-for-good"
        }
      },
      {
        title: "Mobile App Development Sprint",
        organizer: "Mobile Developers United",
        description: "Create innovative mobile applications that enhance user experience and solve everyday problems.",
        startDate: new Date('2024-02-10'),
        endDate: new Date('2024-02-12'),
        registrationDeadline: new Date('2024-02-05'),
        location: {
          type: "offline",
          venue: "New York Tech Hub",
          address: "456 Innovation Ave, New York, NY 10001"
        },
        prizePool: "$25,000",
        maxTeamSize: 3,
        themes: ["mobile-development", "user-experience", "productivity"],
        technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
        difficulty: "beginner",
        status: "completed",
        requirements: ["Basic mobile development knowledge", "Bring your own device"],
        rules: ["Mobile-first approach", "Must work on iOS or Android", "48-hour limit"],
        sponsors: ["Mobile Developers United", "App Store", "Google Play"],
        judges: ["Lisa Wong - Senior iOS Developer", "James Miller - Android Expert"],
        schedule: [
          { time: "09:00", event: "Registration & Breakfast" },
          { time: "10:00", event: "Challenge Briefing" },
          { time: "11:00", event: "Development Begins" }
        ],
        contactEmail: "events@mobiledevs.org",
        website: "https://mobilesprint2024.com",
        socialMedia: {
          twitter: "@MobileDevSprint",
          instagram: "mobiledevsunited"
        }
      },
      {
        title: "Quantum Computing Challenge",
        organizer: "Quantum Research Institute",
        description: "Explore the frontiers of quantum computing and develop algorithms for next-generation quantum systems.",
        startDate: new Date('2024-05-25'),
        endDate: new Date('2024-05-27'),
        registrationDeadline: new Date('2024-05-20'),
        location: {
          type: "hybrid",
          venue: "MIT Campus, Cambridge (Hybrid)",
          address: "77 Massachusetts Ave, Cambridge, MA 02139"
        },
        prizePool: "$150,000",
        maxTeamSize: 4,
        themes: ["quantum-computing", "algorithms", "research"],
        technologies: ["Qiskit", "Cirq", "Python", "Q#", "Quantum Assembly"],
        difficulty: "advanced",
        status: "upcoming",
        requirements: ["Quantum computing background", "Advanced mathematics", "Team of 2-4"],
        rules: ["Must use quantum algorithms", "Theoretical solutions accepted", "72-hour limit"],
        sponsors: ["Quantum Research Institute", "IBM Quantum", "Google Quantum AI"],
        judges: ["Dr. Alice Quantum - Quantum Physicist", "Prof. Bob Entanglement - MIT"],
        schedule: [
          { time: "08:00", event: "Registration & Quantum Coffee" },
          { time: "09:00", event: "Quantum State Preparation" },
          { time: "10:00", event: "Challenge Superposition Begins" }
        ],
        contactEmail: "quantum@research-institute.edu",
        website: "https://quantumchallenge2024.edu",
        socialMedia: {
          twitter: "@QuantumChallenge",
          linkedin: "quantum-research-institute"
        }
      },
      {
        title: "GreenTech Sustainability Hackathon",
        organizer: "EcoTech Solutions",
        description: "Develop technology solutions to combat climate change and promote environmental sustainability.",
        startDate: new Date('2024-06-08'),
        endDate: new Date('2024-06-10'),
        registrationDeadline: new Date('2024-06-03'),
        location: {
          type: "offline",
          venue: "Seattle Green Building",
          address: "789 Eco Way, Seattle, WA 98101"
        },
        prizePool: "$50,000",
        maxTeamSize: 5,
        themes: ["greentech", "sustainability", "environmental"],
        technologies: ["IoT", "Sensors", "React", "Node.js", "Python", "Arduino"],
        difficulty: "intermediate",
        status: "upcoming",
        requirements: ["Passion for environment", "Basic programming skills", "Team of 3-5"],
        rules: ["Focus on sustainability", "Real-world impact", "48-hour development"],
        sponsors: ["EcoTech Solutions", "Green Energy Corp", "Sustainable Future Fund"],
        judges: ["Dr. Green Leaf - Environmental Scientist", "Eco Johnson - Sustainability Expert"],
        schedule: [
          { time: "09:00", event: "Eco-Friendly Registration" },
          { time: "10:00", event: "Sustainability Keynote" },
          { time: "11:00", event: "Green Coding Begins" }
        ],
        contactEmail: "green@ecotech-solutions.org",
        website: "https://greentechhack2024.org",
        socialMedia: {
          twitter: "@GreenTechHack",
          instagram: "ecotechsolutions"
        }
      }
    ];

    // Sample users data
    const users = [
      {
        name: "Sarah Chen",
        email: "sarah.chen@demo.com",
        password: "demo123456",
        age: 24,
        gender: "female",
        phoneNumber: "+1-555-0101",
        profile: {
          bio: "Full-stack developer passionate about AI and machine learning. Love building innovative solutions that make a difference.",
          skills: ["JavaScript", "Python", "React", "Node.js", "TensorFlow", "MongoDB"],
          experience: "intermediate",
          location: {
            city: "San Francisco",
            country: "USA",
            timezone: "PST"
          },
          education: {
            level: "bachelors",
            field: "Computer Science",
            institution: "UC Berkeley"
          },
          occupation: {
            title: "Software Engineer",
            company: "TechCorp",
            industry: "Technology"
          }
        },
        preferences: {
          domains: ["artificial-intelligence", "machine-learning", "web-development"],
          teamPreference: "small-team",
          travelWillingness: "national",
          availableWeekends: true,
          availableWeekdays: false
        }
      },
      {
        name: "Marcus Rodriguez",
        email: "marcus.rodriguez@demo.com",
        password: "demo123456",
        age: 28,
        gender: "male",
        phoneNumber: "+1-555-0102",
        profile: {
          bio: "Blockchain developer and cryptocurrency enthusiast. Building the future of decentralized applications.",
          skills: ["Solidity", "Web3.js", "Ethereum", "React", "Node.js", "Smart Contracts"],
          experience: "advanced",
          location: {
            city: "Austin",
            country: "USA",
            timezone: "CST"
          },
          education: {
            level: "masters",
            field: "Computer Engineering",
            institution: "UT Austin"
          },
          occupation: {
            title: "Blockchain Developer",
            company: "CryptoTech",
            industry: "Cryptocurrency"
          }
        },
        preferences: {
          domains: ["blockchain", "fintech", "web-development"],
          teamPreference: "any",
          travelWillingness: "international",
          availableWeekends: true,
          availableWeekdays: true
        }
      },
      {
        name: "Priya Patel",
        email: "priya.patel@demo.com",
        password: "demo123456",
        age: 22,
        gender: "female",
        phoneNumber: "+1-555-0103",
        profile: {
          bio: "Mobile app developer specializing in React Native and Flutter. Creating beautiful, user-friendly mobile experiences.",
          skills: ["React Native", "Flutter", "Dart", "Swift", "Kotlin", "Firebase"],
          experience: "intermediate",
          location: {
            city: "Seattle",
            country: "USA",
            timezone: "PST"
          },
          education: {
            level: "bachelors",
            field: "Software Engineering",
            institution: "University of Washington"
          },
          occupation: {
            title: "Mobile Developer",
            company: "AppCraft",
            industry: "Mobile Technology"
          }
        },
        preferences: {
          domains: ["mobile-development", "user-experience", "design"],
          teamPreference: "small-team",
          travelWillingness: "regional",
          availableWeekends: true,
          availableWeekdays: false
        }
      }
    ];

    // Insert hackathons
    const insertedHackathons = await Hackathon.insertMany(hackathons);
    console.log(`Inserted ${insertedHackathons.length} hackathons`);

    // Insert users
    const insertedUsers = await User.insertMany(users);
    console.log(`Inserted ${insertedUsers.length} users`);

    // Add some bookmarks and participations
    if (insertedUsers.length > 0 && insertedHackathons.length > 0) {
      const user1 = insertedUsers[0];
      const user2 = insertedUsers[1];
      
      // Add bookmarks
      user1.bookmarkedHackathons = [insertedHackathons[0]._id, insertedHackathons[1]._id];
      user2.bookmarkedHackathons = [insertedHackathons[2]._id];
      
      // Add participations
      user1.participatedHackathons = [{
        hackathon: insertedHackathons[2]._id,
        status: 'completed',
        registeredAt: new Date('2024-02-01')
      }];
      
      user2.participatedHackathons = [{
        hackathon: insertedHackathons[0]._id,
        status: 'registered',
        registeredAt: new Date()
      }];
      
      await user1.save();
      await user2.save();
    }

    res.json({
      success: true,
      message: 'Production database seeded successfully!',
      data: {
        hackathons: insertedHackathons.length,
        users: insertedUsers.length,
        summary: {
          totalHackathons: insertedHackathons.length,
          totalUsers: insertedUsers.length,
          statusDistribution: {
            upcoming: insertedHackathons.filter(h => h.status === 'upcoming').length,
            completed: insertedHackathons.filter(h => h.status === 'completed').length,
            ongoing: insertedHackathons.filter(h => h.status === 'ongoing').length
          }
        }
      }
    });

  } catch (error) {
    console.error('Seeding error:', error);
    res.status(500).json({
      success: false,
      message: 'Error seeding database',
      error: error.message
    });
  }
});

// @route   GET /api/admin/status
// @desc    Check database status
// @access  Public
router.get('/status', async (req, res) => {
  try {
    const hackathonCount = await Hackathon.countDocuments();
    const userCount = await User.countDocuments();
    
    const hackathonsByStatus = await Hackathon.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        hackathons: hackathonCount,
        users: userCount,
        statusDistribution: hackathonsByStatus.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        isEmpty: hackathonCount === 0 && userCount === 0
      }
    });
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking database status',
      error: error.message
    });
  }
});

module.exports = router;
