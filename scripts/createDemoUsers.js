const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const demoUsers = [
  {
    name: "Sarah Chen",
    email: "sarah.chen@demo.com",
    password: "demo123456",
    age: 24,
    gender: "female",
    phoneNumber: "+1-555-0101",
    profile: {
      bio: "AI/ML enthusiast and full-stack developer passionate about creating intelligent solutions for real-world problems.",
      skills: ["Python", "TensorFlow", "React", "Node.js", "MongoDB", "Docker"],
      experience: "intermediate",
      interests: ["Machine Learning", "Web Development", "Data Science", "Computer Vision"],
      location: {
        city: "San Francisco",
        country: "USA",
        timezone: "PST"
      },
      education: {
        level: "graduate",
        field: "Computer Science",
        institution: "Stanford University"
      },
      occupation: {
        title: "Software Engineer",
        company: "TechCorp",
        industry: "Technology"
      }
    },
    preferences: {
      domains: ["artificial-intelligence", "machine-learning", "web-development", "data-science"],
      hackathonTypes: ["hybrid", "online"],
      teamPreference: "small-team",
      difficultyLevel: ["intermediate", "advanced"],
      prizeRange: { min: 5000, max: 100000 },
      travelWillingness: "national",
      availableWeekends: true,
      availableWeekdays: false,
      preferredDuration: "48-hours"
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
      bio: "Blockchain developer and cryptocurrency enthusiast building the future of decentralized finance.",
      skills: ["Solidity", "Web3.js", "Ethereum", "React", "JavaScript", "Smart Contracts"],
      experience: "advanced",
      interests: ["Blockchain", "DeFi", "Cryptocurrency", "Smart Contracts", "Web3"],
      location: {
        city: "Austin",
        country: "USA",
        timezone: "CST"
      },
      education: {
        level: "undergraduate",
        field: "Computer Engineering",
        institution: "University of Texas"
      },
      occupation: {
        title: "Blockchain Developer",
        company: "CryptoStartup Inc",
        industry: "Fintech"
      }
    },
    preferences: {
      domains: ["blockchain", "fintech", "web-development"],
      hackathonTypes: ["online", "hybrid"],
      teamPreference: "small-team",
      difficultyLevel: ["advanced"],
      prizeRange: { min: 10000, max: 200000 },
      travelWillingness: "international",
      availableWeekends: true,
      availableWeekdays: true,
      preferredDuration: "72-hours"
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
      bio: "Mobile app developer and UX designer creating beautiful and functional mobile experiences.",
      skills: ["Flutter", "React Native", "Swift", "Kotlin", "Figma", "Adobe XD"],
      experience: "intermediate",
      interests: ["Mobile Development", "UI/UX Design", "Flutter", "iOS", "Android"],
      location: {
        city: "Seattle",
        country: "USA",
        timezone: "PST"
      },
      education: {
        level: "undergraduate",
        field: "Design and Computer Science",
        institution: "University of Washington"
      },
      occupation: {
        title: "Mobile App Developer",
        company: "AppStudio",
        industry: "Technology"
      }
    },
    preferences: {
      domains: ["mobile-development", "web-development"],
      hackathonTypes: ["offline", "hybrid"],
      teamPreference: "small-team",
      difficultyLevel: ["beginner", "intermediate"],
      prizeRange: { min: 1000, max: 50000 },
      travelWillingness: "national",
      availableWeekends: true,
      availableWeekdays: false,
      preferredDuration: "24-hours"
    }
  },
  {
    name: "David Kim",
    email: "david.kim@demo.com",
    password: "demo123456",
    age: 26,
    gender: "male",
    phoneNumber: "+1-555-0104",
    profile: {
      bio: "Cybersecurity specialist and ethical hacker protecting digital infrastructure from threats.",
      skills: ["Python", "Penetration Testing", "Network Security", "Kali Linux", "Wireshark"],
      experience: "advanced",
      interests: ["Cybersecurity", "Ethical Hacking", "Network Security", "Cryptography"],
      location: {
        city: "New York",
        country: "USA",
        timezone: "EST"
      },
      education: {
        level: "graduate",
        field: "Cybersecurity",
        institution: "NYU"
      },
      occupation: {
        title: "Security Analyst",
        company: "SecureNet Corp",
        industry: "Cybersecurity"
      }
    },
    preferences: {
      domains: ["cybersecurity", "blockchain"],
      hackathonTypes: ["online", "hybrid"],
      teamPreference: "solo",
      difficultyLevel: ["advanced"],
      prizeRange: { min: 15000, max: 150000 },
      travelWillingness: "local-only",
      availableWeekends: true,
      availableWeekdays: true,
      preferredDuration: "48-hours"
    }
  },
  {
    name: "Emily Johnson",
    email: "emily.johnson@demo.com",
    password: "demo123456",
    age: 25,
    gender: "female",
    phoneNumber: "+1-555-0105",
    profile: {
      bio: "Healthcare technology researcher developing AI solutions for better patient outcomes.",
      skills: ["Python", "R", "TensorFlow", "Healthcare Analytics", "FHIR", "Medical Imaging"],
      experience: "intermediate",
      interests: ["HealthTech", "Medical AI", "Data Science", "Healthcare Analytics"],
      location: {
        city: "Boston",
        country: "USA",
        timezone: "EST"
      },
      education: {
        level: "graduate",
        field: "Biomedical Engineering",
        institution: "MIT"
      },
      occupation: {
        title: "Healthcare Data Scientist",
        company: "MedTech Solutions",
        industry: "Healthcare"
      }
    },
    preferences: {
      domains: ["healthtech", "artificial-intelligence", "data-science"],
      hackathonTypes: ["hybrid", "offline"],
      teamPreference: "large-team",
      difficultyLevel: ["intermediate", "advanced"],
      prizeRange: { min: 5000, max: 200000 },
      travelWillingness: "international",
      availableWeekends: true,
      availableWeekdays: false,
      preferredDuration: "72-hours"
    }
  },
  {
    name: "Alex Thompson",
    email: "alex.thompson@demo.com",
    password: "demo123456",
    age: 19,
    gender: "non-binary",
    phoneNumber: "+1-555-0106",
    profile: {
      bio: "Computer science student passionate about game development and virtual reality experiences.",
      skills: ["Unity", "C#", "Blender", "Unreal Engine", "JavaScript", "Python"],
      experience: "beginner",
      interests: ["Game Development", "Virtual Reality", "3D Modeling", "Interactive Media"],
      location: {
        city: "Los Angeles",
        country: "USA",
        timezone: "PST"
      },
      education: {
        level: "undergraduate",
        field: "Computer Science",
        institution: "UCLA"
      },
      occupation: {
        title: "Student",
        company: "UCLA",
        industry: "Education"
      }
    },
    preferences: {
      domains: ["game-development", "ar-vr", "web-development"],
      hackathonTypes: ["offline", "hybrid"],
      teamPreference: "any",
      difficultyLevel: ["beginner", "all-levels"],
      prizeRange: { min: 0, max: 25000 },
      travelWillingness: "local-only",
      availableWeekends: true,
      availableWeekdays: true,
      preferredDuration: "any"
    }
  },
  {
    name: "Dr. Rajesh Gupta",
    email: "rajesh.gupta@demo.com",
    password: "demo123456",
    age: 35,
    gender: "male",
    phoneNumber: "+1-555-0107",
    profile: {
      bio: "Quantum computing researcher and professor exploring the frontiers of quantum algorithms.",
      skills: ["Qiskit", "Python", "Quantum Algorithms", "Linear Algebra", "Research", "Teaching"],
      experience: "advanced",
      interests: ["Quantum Computing", "Quantum Algorithms", "Research", "Physics"],
      location: {
        city: "Chicago",
        country: "USA",
        timezone: "CST"
      },
      education: {
        level: "postgraduate",
        field: "Quantum Physics",
        institution: "University of Chicago"
      },
      occupation: {
        title: "Professor of Quantum Computing",
        company: "University of Chicago",
        industry: "Academia"
      }
    },
    preferences: {
      domains: ["quantum-computing", "artificial-intelligence"],
      hackathonTypes: ["hybrid", "offline"],
      teamPreference: "small-team",
      difficultyLevel: ["advanced"],
      prizeRange: { min: 20000, max: 500000 },
      travelWillingness: "international",
      availableWeekends: false,
      availableWeekdays: true,
      preferredDuration: "week-long"
    }
  },
  {
    name: "Maya Singh",
    email: "maya.singh@demo.com",
    password: "demo123456",
    age: 23,
    gender: "female",
    phoneNumber: "+1-555-0108",
    profile: {
      bio: "Environmental engineer and green tech advocate building sustainable technology solutions.",
      skills: ["Arduino", "Raspberry Pi", "IoT", "Python", "Environmental Modeling", "Sustainability"],
      experience: "intermediate",
      interests: ["Green Technology", "Sustainability", "IoT", "Environmental Science"],
      location: {
        city: "Portland",
        country: "USA",
        timezone: "PST"
      },
      education: {
        level: "graduate",
        field: "Environmental Engineering",
        institution: "Oregon State University"
      },
      occupation: {
        title: "Environmental Engineer",
        company: "GreenTech Solutions",
        industry: "Environmental"
      }
    },
    preferences: {
      domains: ["greentech", "iot", "social-impact"],
      hackathonTypes: ["offline", "hybrid"],
      teamPreference: "large-team",
      difficultyLevel: ["intermediate", "all-levels"],
      prizeRange: { min: 2000, max: 80000 },
      travelWillingness: "national",
      availableWeekends: true,
      availableWeekdays: false,
      preferredDuration: "72-hours"
    }
  }
];

const createDemoUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB for demo user creation');

    // Clear existing demo users
    await User.deleteMany({ email: { $regex: '@demo.com$' } });
    console.log('Cleared existing demo users');

    // Create demo users
    const createdUsers = await User.insertMany(demoUsers);
    console.log(`Created ${createdUsers.length} demo users`);

    // Display user summary
    console.log('\n=== DEMO USERS CREATED ===');
    createdUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email})`);
      console.log(`   Age: ${user.age}, Gender: ${user.gender}`);
      console.log(`   Location: ${user.profile.location.city}, ${user.profile.location.country}`);
      console.log(`   Experience: ${user.profile.experience}`);
      console.log(`   Domains: ${user.preferences.domains ? user.preferences.domains.join(', ') : 'None'}`);
      console.log(`   Team Preference: ${user.preferences.teamPreference || 'Any'}`);
      console.log('');
    });

    console.log('All demo users created successfully!');
    console.log('\nLogin credentials for all users:');
    console.log('Password: demo123456');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating demo users:', error);
    process.exit(1);
  }
};

// Run the demo user creation
createDemoUsers();
