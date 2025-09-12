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

    // Allow re-seeding if requested via query parameter
    const forceReseed = req.query.force === 'true';
    
    if ((existingHackathons > 0 || existingUsers > 0) && !forceReseed) {
      return res.json({
        success: true,
        message: 'Database already seeded. Use ?force=true to re-seed.',
        data: {
          hackathons: existingHackathons,
          users: existingUsers
        }
      });
    }

    // Clear existing data (just in case)
    await Hackathon.deleteMany({});
    await User.deleteMany({});

    // Comprehensive hackathons data based on your local database
    const hackathons = [
      {
        title: "Mobile App Development Sprint",
        organizer: "Mobile Developers United",
        description: "Create innovative mobile applications that enhance user experience and solve everyday problems.",
        location: "New York Tech Hub",
        mode: "offline",
        startDate: new Date('2024-02-10'),
        endDate: new Date('2024-02-12'),
        registrationDeadline: new Date('2024-02-05'),
        prizePool: "$25,000",
        teamSize: { min: 1, max: 3 },
        themes: ["mobile-development", "web-development"],
        technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
        difficulty: "beginner",
        status: "completed",
        registrationLink: "https://mobilesprint2024.com/register",
        websiteUrl: "https://mobilesprint2024.com",
        eligibility: "Mobile developers of all levels",
        tags: ["Mobile", "UX", "Apps"]
      },
      {
        title: "FinTech Revolution 2024",
        organizer: "Financial Innovation Labs",
        description: "Build the next generation of financial technology solutions that will transform how we handle money and financial services.",
        location: "London, UK",
        mode: "hybrid",
        startDate: new Date('2024-03-22'),
        endDate: new Date('2024-03-24'),
        registrationDeadline: new Date('2024-03-17'),
        prizePool: "$80,000",
        teamSize: { min: 2, max: 5 },
        themes: ["fintech", "blockchain", "artificial-intelligence"],
        technologies: ["React", "Node.js", "Python", "Solidity", "APIs"],
        difficulty: "intermediate",
        status: "upcoming",
        registrationLink: "https://fintechrev2024.com/register",
        websiteUrl: "https://fintechrev2024.com",
        eligibility: "Fintech enthusiasts and developers",
        tags: ["FinTech", "Banking", "Innovation"]
      },
      {
        title: "Global AI Innovation Challenge 2024",
        organizer: "TechCorp International",
        description: "Join the world's largest AI hackathon where innovators build solutions using artificial intelligence and machine learning technologies.",
        location: "San Francisco, CA",
        mode: "hybrid",
        startDate: new Date('2024-03-15'),
        endDate: new Date('2024-03-17'),
        registrationDeadline: new Date('2024-03-10'),
        prizePool: "$100,000",
        teamSize: { min: 2, max: 4 },
        themes: ["artificial-intelligence", "machine-learning", "data-science"],
        technologies: ["Python", "TensorFlow", "PyTorch", "JavaScript", "React"],
        difficulty: "intermediate",
        status: "upcoming",
        registrationLink: "https://aichallenge2024.com/register",
        websiteUrl: "https://aichallenge2024.com",
        eligibility: "Students and professionals",
        tags: ["AI", "ML", "Innovation"]
      },
      {
        title: "Green Tech Innovation Hub",
        organizer: "Sustainable Future Foundation",
        description: "Create technology solutions to combat climate change and promote environmental sustainability.",
        location: "Berlin, Germany",
        mode: "offline",
        startDate: new Date('2024-04-12'),
        endDate: new Date('2024-04-14'),
        registrationDeadline: new Date('2024-04-07'),
        prizePool: "$60,000",
        teamSize: { min: 3, max: 6 },
        themes: ["greentech", "sustainability", "environmental"],
        technologies: ["IoT", "Sensors", "React", "Node.js", "Python"],
        difficulty: "intermediate",
        status: "upcoming",
        registrationLink: "https://greentech2024.org/register",
        websiteUrl: "https://greentech2024.org",
        eligibility: "Environmental tech enthusiasts",
        tags: ["GreenTech", "Climate", "Sustainability"]
      },
      {
        title: "Blockchain for Good Hackathon",
        organizer: "CryptoForChange Foundation",
        description: "Build blockchain solutions that create positive social impact and address real-world problems using decentralized technology.",
        location: "Toronto, Canada",
        mode: "online",
        startDate: new Date('2024-04-20'),
        endDate: new Date('2024-04-22'),
        registrationDeadline: new Date('2024-04-15'),
        prizePool: "$75,000",
        teamSize: { min: 2, max: 5 },
        themes: ["blockchain", "social-impact", "fintech"],
        technologies: ["Solidity", "Web3.js", "Ethereum", "React", "Node.js"],
        difficulty: "advanced",
        status: "upcoming",
        registrationLink: "https://blockchainforgoood.org/register",
        websiteUrl: "https://blockchainforgoood.org",
        eligibility: "Blockchain developers and enthusiasts",
        tags: ["Blockchain", "Social Impact", "DeFi"]
      },
      {
        title: "Quantum Computing Challenge",
        organizer: "Quantum Research Institute",
        description: "Explore the frontiers of quantum computing and develop algorithms for next-generation quantum systems.",
        location: "MIT Campus, Cambridge",
        mode: "hybrid",
        startDate: new Date('2024-05-25'),
        endDate: new Date('2024-05-27'),
        registrationDeadline: new Date('2024-05-20'),
        prizePool: "$150,000",
        teamSize: { min: 2, max: 4 },
        themes: ["quantum-computing", "artificial-intelligence", "data-science"],
        technologies: ["Qiskit", "Cirq", "Python", "Q#", "Quantum Assembly"],
        difficulty: "advanced",
        status: "upcoming",
        registrationLink: "https://quantumchallenge2024.edu/register",
        websiteUrl: "https://quantumchallenge2024.edu",
        eligibility: "Quantum computing researchers and advanced students",
        tags: ["Quantum", "Research", "Algorithms"]
      },
      {
        title: "Cybersecurity Defense Challenge",
        organizer: "CyberSafe Alliance",
        description: "Develop cutting-edge security solutions and defend against cyber threats in this intensive cybersecurity hackathon.",
        location: "Austin, TX",
        mode: "offline",
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-06-03'),
        registrationDeadline: new Date('2024-05-27'),
        prizePool: "$90,000",
        teamSize: { min: 2, max: 4 },
        themes: ["cybersecurity", "artificial-intelligence", "cloud-computing"],
        technologies: ["Python", "Kali Linux", "Wireshark", "Metasploit", "Docker"],
        difficulty: "advanced",
        status: "upcoming",
        registrationLink: "https://cyberdefense2024.com/register",
        websiteUrl: "https://cyberdefense2024.com",
        eligibility: "Cybersecurity professionals and students",
        tags: ["Security", "Defense", "Ethical Hacking"]
      },
      {
        title: "Healthcare Innovation Challenge",
        organizer: "MedTech Innovators",
        description: "Create technology solutions that improve healthcare delivery and patient outcomes using cutting-edge medical technology.",
        location: "Boston, MA",
        mode: "hybrid",
        startDate: new Date('2024-07-10'),
        endDate: new Date('2024-07-12'),
        registrationDeadline: new Date('2024-07-05'),
        prizePool: "$120,000",
        teamSize: { min: 3, max: 5 },
        themes: ["healthtech", "artificial-intelligence", "data-science"],
        technologies: ["Python", "TensorFlow", "React", "Node.js", "FHIR"],
        difficulty: "intermediate",
        status: "upcoming",
        registrationLink: "https://healthtech2024.com/register",
        websiteUrl: "https://healthtech2024.com",
        eligibility: "Healthcare professionals and developers",
        tags: ["HealthTech", "Medical", "Innovation"]
      },
      {
        title: "Gaming & VR Experience Jam",
        organizer: "Interactive Entertainment Collective",
        description: "Design immersive gaming experiences and virtual reality applications that push the boundaries of interactive entertainment.",
        location: "Los Angeles, CA",
        mode: "offline",
        startDate: new Date('2024-08-16'),
        endDate: new Date('2024-08-18'),
        registrationDeadline: new Date('2024-08-11'),
        prizePool: "$70,000",
        teamSize: { min: 2, max: 6 },
        themes: ["game-development", "ar-vr", "artificial-intelligence"],
        technologies: ["Unity", "Unreal Engine", "C#", "JavaScript", "Blender"],
        difficulty: "intermediate",
        status: "upcoming",
        registrationLink: "https://gamingjam2024.com/register",
        websiteUrl: "https://gamingjam2024.com",
        eligibility: "Game developers and VR enthusiasts",
        tags: ["Gaming", "VR", "Entertainment"]
      },
      {
        title: "EdTech Learning Revolution",
        organizer: "Education Technology Foundation",
        description: "Transform education through innovative technology solutions that enhance learning experiences and accessibility.",
        location: "Austin, TX",
        mode: "hybrid",
        startDate: new Date('2024-09-20'),
        endDate: new Date('2024-09-22'),
        registrationDeadline: new Date('2024-09-15'),
        prizePool: "$85,000",
        teamSize: { min: 2, max: 4 },
        themes: ["edtech", "artificial-intelligence", "web-development"],
        technologies: ["React", "Node.js", "Python", "MongoDB", "WebRTC"],
        difficulty: "beginner",
        status: "upcoming",
        registrationLink: "https://edtech2024.org/register",
        websiteUrl: "https://edtech2024.org",
        eligibility: "Educators and developers",
        tags: ["EdTech", "Learning", "Education"]
      }
    ];

    // Your actual local users data (exported from local database)
    const users = [
      {
        "profile": {
          "location": {
            "city": "San Francisco",
            "country": "USA",
            "timezone": "PST"
          },
          "education": {
            "level": "bachelors",
            "field": "Computer Science",
            "institution": "UC Berkeley"
          },
          "occupation": {
            "title": "Software Engineer",
            "company": "TechCorp",
            "industry": "Technology"
          },
          "bio": "Full-stack developer passionate about AI and machine learning. Love building innovative solutions that make a difference.",
          "skills": [
            "JavaScript",
            "Python",
            "React",
            "Node.js",
            "TensorFlow",
            "MongoDB"
          ],
          "experience": "intermediate",
          "interests": [
            "Artificial Intelligence",
            "Machine Learning",
            "Web Development",
            "Data Science"
          ]
        },
        "preferences": {
          "prizeRange": {
            "min": 0,
            "max": 1000000
          },
          "domains": [],
          "hackathonTypes": [],
          "teamPreference": "any",
          "difficultyLevel": [],
          "travelWillingness": "local-only",
          "availableWeekends": true,
          "availableWeekdays": false,
          "preferredDuration": "any",
          "emailNotifications": true,
          "reminderDays": 3
        },
        "name": "Alice Johnson",
        "email": "alice.johnson@email.com",
        "password": "$2a$10$MFpMaOoVKrrxX4I/8REKzusNvtcmOkIZcyzqiX5hjwXMgF81xlbMG",
        "age": 24,
        "gender": "female",
        "phoneNumber": "+1-555-0101",
        "bookmarkedHackathons": [],
        "participatedHackathons": []
      },
      {
        "profile": {
          "location": {
            "city": "Vadodara",
            "country": "India"
          },
          "education": {
            "level": "bachelors",
            "field": "Computer Science and Engineering"
          },
          "occupation": {
            "title": "Nerd",
            "company": "Nothing"
          },
          "interests": [],
          "bio": "A musician who hacks computers",
          "experience": "advanced",
          "skills": [
            "NextJS"
          ]
        },
        "preferences": {
          "prizeRange": {
            "min": 0,
            "max": 1000000
          },
          "hackathonTypes": [],
          "difficultyLevel": [],
          "preferredDuration": "any",
          "domains": [
            "artificial-intelligence",
            "web-development",
            "mobile-development",
            "data-science"
          ],
          "teamPreference": "solo",
          "travelWillingness": "international",
          "availableWeekends": true,
          "availableWeekdays": true
        },
        "name": "Debdoot Manna",
        "email": "debdoot@email.com",
        "password": "$2a$10$8Xbty.fYRJVU707nzhdaW.lmHjdG7u3gMyR5NqZCnlBigIjCWhjvu",
        "age": 21,
        "gender": "male",
        "phoneNumber": "987654321",
        "bookmarkedHackathons": [],
        "participatedHackathons": []
      },
      {
        "profile": {
          "location": {
            "city": "timepass",
            "country": "jbdfhaj"
          },
          "education": {
            "level": "phd",
            "field": "COmputer"
          },
          "occupation": {
            "title": "timepass",
            "company": "nothing"
          },
          "interests": [],
          "bio": "time pass",
          "experience": "advanced",
          "skills": [
            "cyber"
          ]
        },
        "preferences": {
          "prizeRange": {
            "min": 0,
            "max": 1000000
          },
          "hackathonTypes": [],
          "difficultyLevel": [],
          "preferredDuration": "any",
          "domains": [
            "artificial-intelligence",
            "machine-learning",
            "web-development",
            "social-impact"
          ],
          "teamPreference": "large-team",
          "travelWillingness": "regional",
          "availableWeekends": true,
          "availableWeekdays": true
        },
        "name": "Jadiya Bhaijaan",
        "email": "dummy123@email.com",
        "password": "$2a$10$lgO28BvyXhsTNQpnlZAfUe9cj.I8xFlG/QzDikBIces96iWBoq9fy",
        "age": 69,
        "gender": "male",
        "phoneNumber": "987654321",
        "bookmarkedHackathons": [],
        "participatedHackathons": []
      }
    ];

    // Insert hackathons
    const insertedHackathons = await Hackathon.insertMany(hackathons);
    console.log(`Inserted ${insertedHackathons.length} hackathons`);

    // Insert users directly (passwords are already hashed from local DB)
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
