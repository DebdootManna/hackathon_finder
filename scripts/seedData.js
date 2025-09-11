const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hackathon = require('../models/Hackathon');
const User = require('../models/User');

dotenv.config();

const hackathonsData = [
  {
    title: "Global AI Innovation Challenge 2024",
    description: "Join the world's largest AI hackathon where innovators build solutions for real-world problems using artificial intelligence and machine learning technologies.",
    organizer: "TechCorp International",
    location: "San Francisco, CA (Hybrid)",
    mode: "hybrid",
    startDate: new Date("2024-03-15T09:00:00Z"),
    endDate: new Date("2024-03-17T18:00:00Z"),
    registrationDeadline: new Date("2024-03-10T23:59:59Z"),
    prizePool: "$100,000",
    themes: ["Artificial Intelligence", "Machine Learning", "Healthcare AI", "Climate Tech"],
    technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI API", "Hugging Face"],
    eligibility: "Open to all developers worldwide",
    teamSize: { min: 1, max: 4 },
    registrationLink: "https://aichallenge2024.com/register",
    websiteUrl: "https://aichallenge2024.com",
    status: "upcoming",
    difficulty: "intermediate",
    tags: ["AI", "ML", "Innovation", "Global"]
  },
  {
    title: "Blockchain for Good Hackathon",
    description: "Build decentralized applications that solve social and environmental challenges using blockchain technology.",
    organizer: "Crypto Foundation",
    location: "Online",
    mode: "online",
    startDate: new Date("2024-04-20T10:00:00Z"),
    endDate: new Date("2024-04-22T20:00:00Z"),
    registrationDeadline: new Date("2024-04-15T23:59:59Z"),
    prizePool: "$75,000",
    themes: ["Blockchain", "Social Impact", "Sustainability", "DeFi"],
    technologies: ["Solidity", "Web3.js", "Ethereum", "IPFS", "React"],
    eligibility: "Students and professionals",
    teamSize: { min: 2, max: 5 },
    registrationLink: "https://blockchainforgood.org/register",
    websiteUrl: "https://blockchainforgood.org",
    status: "upcoming",
    difficulty: "advanced",
    tags: ["Blockchain", "Social Impact", "Crypto", "DeFi"]
  },
  {
    title: "Mobile App Development Sprint",
    description: "Create innovative mobile applications that enhance user experience and solve everyday problems.",
    organizer: "Mobile Developers United",
    location: "New York, NY",
    mode: "offline",
    startDate: new Date("2024-02-10T09:00:00Z"),
    endDate: new Date("2024-02-11T18:00:00Z"),
    registrationDeadline: new Date("2024-02-05T23:59:59Z"),
    prizePool: "$25,000",
    themes: ["Mobile Development", "UX/UI", "Productivity", "Social Networking"],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    eligibility: "All skill levels welcome",
    teamSize: { min: 1, max: 3 },
    registrationLink: "https://mobiledevsprint.com/register",
    websiteUrl: "https://mobiledevsprint.com",
    status: "completed",
    difficulty: "beginner",
    tags: ["Mobile", "Apps", "UX", "UI"]
  },
  {
    title: "Quantum Computing Challenge",
    description: "Explore the frontiers of quantum computing and develop algorithms for quantum systems.",
    organizer: "Quantum Research Institute",
    location: "Boston, MA (Hybrid)",
    mode: "hybrid",
    startDate: new Date("2024-05-01T08:00:00Z"),
    endDate: new Date("2024-05-03T17:00:00Z"),
    registrationDeadline: new Date("2024-04-25T23:59:59Z"),
    prizePool: "$150,000",
    themes: ["Quantum Computing", "Quantum Algorithms", "Cryptography", "Optimization"],
    technologies: ["Qiskit", "Cirq", "Q#", "Python", "Quantum Assembly"],
    eligibility: "Graduate students and researchers",
    teamSize: { min: 1, max: 4 },
    registrationLink: "https://quantumchallenge.edu/register",
    websiteUrl: "https://quantumchallenge.edu",
    status: "upcoming",
    difficulty: "advanced",
    tags: ["Quantum", "Research", "Computing", "Algorithms"]
  },
  {
    title: "Green Tech Innovation Hub",
    description: "Develop sustainable technology solutions to combat climate change and promote environmental conservation.",
    organizer: "EcoTech Alliance",
    location: "Seattle, WA",
    mode: "offline",
    startDate: new Date("2024-04-12T09:00:00Z"),
    endDate: new Date("2024-04-14T19:00:00Z"),
    registrationDeadline: new Date("2024-04-07T23:59:59Z"),
    prizePool: "$80,000",
    themes: ["Climate Tech", "Renewable Energy", "Sustainability", "IoT"],
    technologies: ["Arduino", "Raspberry Pi", "Node.js", "MongoDB", "React"],
    eligibility: "Open to all",
    teamSize: { min: 2, max: 6 },
    registrationLink: "https://greentechhub.org/register",
    websiteUrl: "https://greentechhub.org",
    status: "upcoming",
    difficulty: "all-levels",
    tags: ["GreenTech", "Climate", "Sustainability", "IoT"]
  },
  {
    title: "FinTech Revolution 2024",
    description: "Build the next generation of financial technology solutions that democratize access to financial services.",
    organizer: "Financial Innovation Labs",
    location: "Online",
    mode: "online",
    startDate: new Date("2024-03-08T10:00:00Z"),
    endDate: new Date("2024-03-10T22:00:00Z"),
    registrationDeadline: new Date("2024-03-03T23:59:59Z"),
    prizePool: "$120,000",
    themes: ["FinTech", "Digital Banking", "Payment Systems", "RegTech"],
    technologies: ["Node.js", "PostgreSQL", "Stripe API", "Plaid API", "Vue.js"],
    eligibility: "Developers and finance professionals",
    teamSize: { min: 2, max: 4 },
    registrationLink: "https://fintechrev2024.com/register",
    websiteUrl: "https://fintechrev2024.com",
    status: "ongoing",
    difficulty: "intermediate",
    tags: ["FinTech", "Banking", "Payments", "Finance"]
  },
  {
    title: "Healthcare Innovation Challenge",
    description: "Create technology solutions that improve healthcare delivery and patient outcomes worldwide.",
    organizer: "MedTech Innovators",
    location: "Chicago, IL (Hybrid)",
    mode: "hybrid",
    startDate: new Date("2024-06-15T09:00:00Z"),
    endDate: new Date("2024-06-17T18:00:00Z"),
    registrationDeadline: new Date("2024-06-10T23:59:59Z"),
    prizePool: "$200,000",
    themes: ["HealthTech", "Telemedicine", "Medical AI", "Patient Care"],
    technologies: ["Python", "TensorFlow", "FHIR", "React", "AWS"],
    eligibility: "Healthcare professionals and developers",
    teamSize: { min: 3, max: 5 },
    registrationLink: "https://healthinnovation.med/register",
    websiteUrl: "https://healthinnovation.med",
    status: "upcoming",
    difficulty: "intermediate",
    tags: ["HealthTech", "Medical", "AI", "Telemedicine"]
  },
  {
    title: "Gaming & VR Experience Jam",
    description: "Design immersive gaming experiences and virtual reality applications that push the boundaries of interactive entertainment.",
    organizer: "GameDev Studios Collective",
    location: "Los Angeles, CA",
    mode: "offline",
    startDate: new Date("2024-07-20T10:00:00Z"),
    endDate: new Date("2024-07-21T20:00:00Z"),
    registrationDeadline: new Date("2024-07-15T23:59:59Z"),
    prizePool: "$50,000",
    themes: ["Game Development", "Virtual Reality", "Augmented Reality", "Interactive Media"],
    technologies: ["Unity", "Unreal Engine", "C#", "Oculus SDK", "Blender"],
    eligibility: "Game developers and designers",
    teamSize: { min: 1, max: 6 },
    registrationLink: "https://gamingvrjam.com/register",
    websiteUrl: "https://gamingvrjam.com",
    status: "upcoming",
    difficulty: "all-levels",
    tags: ["Gaming", "VR", "AR", "Unity"]
  },
  {
    title: "Cybersecurity Defense Challenge",
    description: "Build robust security solutions and defend against cyber threats in this intensive security-focused hackathon.",
    organizer: "CyberSec Alliance",
    location: "Online",
    mode: "online",
    startDate: new Date("2024-05-25T08:00:00Z"),
    endDate: new Date("2024-05-26T20:00:00Z"),
    registrationDeadline: new Date("2024-05-20T23:59:59Z"),
    prizePool: "$90,000",
    themes: ["Cybersecurity", "Ethical Hacking", "Network Security", "Cryptography"],
    technologies: ["Python", "Kali Linux", "Wireshark", "Metasploit", "OpenSSL"],
    eligibility: "Security professionals and students",
    teamSize: { min: 1, max: 3 },
    registrationLink: "https://cybersecdefense.org/register",
    websiteUrl: "https://cybersecdefense.org",
    status: "upcoming",
    difficulty: "advanced",
    tags: ["Cybersecurity", "Hacking", "Security", "Defense"]
  },
  {
    title: "EdTech Learning Revolution",
    description: "Transform education through innovative technology solutions that make learning more accessible and engaging.",
    organizer: "Education Technology Foundation",
    location: "Austin, TX (Hybrid)",
    mode: "hybrid",
    startDate: new Date("2024-08-10T09:00:00Z"),
    endDate: new Date("2024-08-12T17:00:00Z"),
    registrationDeadline: new Date("2024-08-05T23:59:59Z"),
    prizePool: "$60,000",
    themes: ["EdTech", "E-Learning", "Educational Games", "Accessibility"],
    technologies: ["React", "Node.js", "MongoDB", "WebRTC", "Three.js"],
    eligibility: "Educators and developers",
    teamSize: { min: 2, max: 4 },
    registrationLink: "https://edtechrevolution.edu/register",
    websiteUrl: "https://edtechrevolution.edu",
    status: "upcoming",
    difficulty: "beginner",
    tags: ["EdTech", "Education", "Learning", "Accessibility"]
  }
];

const usersData = [
  {
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    password: "password123",
    profile: {
      bio: "Full-stack developer passionate about AI and machine learning",
      skills: ["JavaScript", "Python", "React", "TensorFlow"],
      experience: "intermediate",
      interests: ["AI", "Web Development", "Data Science"]
    }
  },
  {
    name: "Bob Smith",
    email: "bob.smith@email.com",
    password: "password123",
    profile: {
      bio: "Blockchain enthusiast and smart contract developer",
      skills: ["Solidity", "Web3.js", "Ethereum", "Node.js"],
      experience: "advanced",
      interests: ["Blockchain", "DeFi", "Cryptocurrency"]
    }
  },
  {
    name: "Carol Davis",
    email: "carol.davis@email.com",
    password: "password123",
    profile: {
      bio: "Mobile app developer with focus on user experience",
      skills: ["React Native", "Flutter", "Swift", "Kotlin"],
      experience: "intermediate",
      interests: ["Mobile Development", "UX/UI", "iOS", "Android"]
    }
  },
  {
    name: "David Wilson",
    email: "david.wilson@email.com",
    password: "password123",
    profile: {
      bio: "Cybersecurity specialist and ethical hacker",
      skills: ["Python", "Penetration Testing", "Network Security", "Cryptography"],
      experience: "advanced",
      interests: ["Cybersecurity", "Ethical Hacking", "Network Security"]
    }
  },
  {
    name: "Emma Brown",
    email: "emma.brown@email.com",
    password: "password123",
    profile: {
      bio: "Healthcare technology researcher and data scientist",
      skills: ["Python", "R", "Machine Learning", "Healthcare Analytics"],
      experience: "intermediate",
      interests: ["HealthTech", "Data Science", "Medical AI"]
    }
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await Hackathon.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Insert hackathons
    const insertedHackathons = await Hackathon.insertMany(hackathonsData);
    console.log(`Inserted ${insertedHackathons.length} hackathons`);

    // Insert users
    const insertedUsers = await User.insertMany(usersData);
    console.log(`Inserted ${insertedUsers.length} users`);

    // Add some bookmarks and participations for demo purposes
    const user1 = insertedUsers[0];
    const user2 = insertedUsers[1];
    
    user1.bookmarkedHackathons = [insertedHackathons[0]._id, insertedHackathons[3]._id];
    user1.participatedHackathons = [{
      hackathon: insertedHackathons[2]._id,
      status: 'completed'
    }];
    await user1.save();

    user2.bookmarkedHackathons = [insertedHackathons[1]._id, insertedHackathons[4]._id];
    user2.participatedHackathons = [{
      hackathon: insertedHackathons[5]._id,
      status: 'participating'
    }];
    await user2.save();

    console.log('Added sample bookmarks and participations');
    console.log('Database seeded successfully!');
    
    // Display summary
    console.log('\n=== SEEDING SUMMARY ===');
    console.log(`Total Hackathons: ${insertedHackathons.length}`);
    console.log(`Total Users: ${insertedUsers.length}`);
    console.log('\nHackathon Status Distribution:');
    const statusCounts = {};
    insertedHackathons.forEach(h => {
      statusCounts[h.status] = (statusCounts[h.status] || 0) + 1;
    });
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`  ${status}: ${count}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase();
