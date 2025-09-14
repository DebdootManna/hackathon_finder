# 🚀 Hackathon Finder - Complete MERN Stack Platform

A comprehensive web platform built with the MERN stack to discover, track, and participate in global hackathon events. Features personalized recommendations, detailed event information, and seamless registration flow.

## ✨ Features

- 🔍 **Discover Hackathons**: Browse through 10+ diverse hackathons across multiple domains
- 🎯 **Personalized Recommendations**: Smart sorting based on user interests and preferences
- 📋 **Detailed Event Pages**: Comprehensive hackathon information with themes, technologies, and requirements
- 📝 **Registration System**: Complete registration flow with team management and project details
- 👤 **User Profiles**: Personalized dashboards with preferences, skills, and participation history
- 🔐 **Secure Authentication**: JWT-based authentication with profile management
- 🏷️ **Advanced Filtering**: Filter by status, mode, difficulty, themes, and technologies
- 📱 **Responsive Design**: Beautiful UI that works seamlessly on all devices
- 🔄 **Real-time Updates**: Dynamic content loading with proper navigation handling

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3 with modern design
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with bcrypt password hashing
- **Deployment**: Vercel (Frontend & Backend)
- **Development**: Nodemon for hot reloading

## 📁 Project Structure

```
hackathon_finder/
├── config/                 # Configuration files
│   └── database.js        # MongoDB connection setup
├── middleware/             # Express middleware
│   └── auth.js            # JWT authentication middleware
├── models/                 # MongoDB schemas
│   ├── Hackathon.js       # Hackathon data model with validation
│   └── User.js            # User data model with preferences
├── public/                 # Frontend static files
│   ├── index.html         # Main homepage with hackathon listing
│   ├── event-details.html # Detailed hackathon information page
│   ├── register.html      # Hackathon registration form
│   ├── profile.html       # User profile management
│   └── admin.html         # Admin panel for database management
├── routes/                 # API routes
│   ├── admin.js           # Admin operations & database seeding
│   ├── auth.js            # Authentication & user management
│   ├── hackathons.js      # Hackathon CRUD & personalization
│   └── users.js           # User profile operations
├── scripts/                # Utility scripts
│   ├── createDemoUsers.js # Create demo user accounts
│   ├── exportLocalUsers.js # Export users for production
│   ├── fixAllPasswords.js # Password management utilities
│   └── updateAdminUsers.js # Update admin seeding data
├── server.js              # Express server entry point
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (create from .env.example)
└── .env.example           # Environment variables template
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/DebdootManna/hackathon_finder/
cd hackathon_finder
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### 4. Configure Your Environment
Update `.env` with your settings:
```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/hackathon_finder
JWT_SECRET=5612b142fbd22bf0a5763bf05d80182d1d77cddc95ab60807f9250f70fa2a7b8f5f1c17cbac759e9692f68a1ea7bff62a4db12f636e7dc35458a00a2a8cc0af3
```

### 5. Set Up MongoDB Database

#### Option A: Local MongoDB
```bash
# Install MongoDB (macOS with Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb/brew/mongodb-community

# Verify MongoDB is running
mongosh --eval "db.adminCommand('ismaster')"
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string and update `MONGODB_URI` in `.env`
4. Whitelist your IP address in Atlas security settings

### 6. Seed the Database
```bash
# Start the server first
npm start

# In another terminal, seed with sample data
curl -X POST http://localhost:3001/api/admin/seed

# Or use the admin panel at http://localhost:3001/admin.html
```

### 7. Start the Application
```bash
# Development mode with auto-reload
npm start

# The application will be available at:
# http://localhost:3001
```

## 📡 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user account
- `POST /api/auth/login` - User login with email/password
- `GET /api/auth/profile` - Get current user profile (requires JWT)
- `PUT /api/auth/profile` - Update user profile (requires JWT)

### Hackathon Endpoints
- `GET /api/hackathons` - Get all hackathons with optional filtering
- `GET /api/hackathons/personalized` - Get personalized hackathon recommendations (requires JWT)
- `GET /api/hackathons/:id` - Get specific hackathon details
- `POST /api/hackathons/:id/register` - Register for hackathon (requires JWT)
- `POST /api/hackathons` - Create new hackathon (admin)
- `PUT /api/hackathons/:id` - Update hackathon (admin)
- `DELETE /api/hackathons/:id` - Delete hackathon (admin)

### Admin Endpoints
- `POST /api/admin/seed` - Seed database with sample data
- `GET /api/admin/status` - Get database status and statistics
- `DELETE /api/admin/reset` - Reset database (development only)

### User Management
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get specific user by ID
- `PUT /api/users/:id` - Update user information
- `DELETE /api/users/:id` - Delete user account

## 🎯 Sample Data Overview

The seeded database includes **10 diverse hackathons** across multiple domains:

### 🤖 **AI & Machine Learning**
- **AI Innovation Challenge 2024** - Advanced ML solutions
- **EduTech Revolution** - AI-powered educational tools

### 🔗 **Blockchain & Web3**
- **Blockchain for Good** - Social impact blockchain solutions
- **CryptoFinance Hackathon** - DeFi and cryptocurrency innovations

### 📱 **Mobile & Gaming**
- **Mobile App Challenge** - Cross-platform mobile applications
- **GameDev Jam 2024** - VR/AR gaming experiences

### 🌱 **Sustainability & Health**
- **Green Tech Challenge** - Environmental sustainability solutions
- **HealthTech Innovation** - Digital healthcare platforms

### 🔒 **Security & Infrastructure**
- **CyberSecurity Challenge** - Cybersecurity and privacy tools
- **Quantum Computing Hackathon** - Quantum algorithm development

### 👥 **Demo Users**
The database includes 15 pre-created users with different preferences:
- **Emails**: `user1@example.com` to `user15@example.com`
- **Password**: `password123` (for all demo accounts)
- **Varied interests**: Different combinations of themes and technologies

## 🔧 Database Setup Details

### MongoDB Collections Structure

#### Users Collection
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  password: "hashed_password",
  profile: {
    bio: "Full-stack developer passionate about AI",
    skills: ["JavaScript", "Python", "React"],
    experience: "intermediate",
    education: {
      level: "undergraduate",
      field: "Computer Science"
    },
    preferences: {
      themes: ["AI/ML", "Web Development"],
      technologies: ["JavaScript", "Python"],
      mode: "hybrid",
      teamSize: "small"
    }
  },
  registrations: [hackathon_ids],
  createdAt: Date,
  updatedAt: Date
}
```

#### Hackathons Collection
```javascript
{
  title: "AI Innovation Challenge 2024",
  organizer: "TechCorp Inc.",
  description: "Build the next generation of AI solutions",
  startDate: Date,
  endDate: Date,
  registrationDeadline: Date,
  location: {
    type: "hybrid",
    venue: "TechHub San Francisco",
    address: "123 Tech Street, SF, CA"
  },
  themes: ["AI/ML", "Data Science"],
  technologies: ["Python", "TensorFlow", "PyTorch"],
  difficulty: "advanced",
  maxParticipants: 500,
  currentParticipants: 0,
  prizes: {
    first: "$10,000",
    second: "$5,000",
    third: "$2,500"
  },
  requirements: ["Portfolio", "Resume"],
  status: "upcoming"
}
```

### Database Seeding Process
1. **Clears existing data** - Removes all users and hackathons
2. **Creates hackathons** - Inserts 10 diverse hackathon events
3. **Creates users** - Inserts 15 demo users with hashed passwords
4. **Validates data** - Ensures all required fields and relationships

### Verification Commands
```bash
# Check database connection
mongosh hackathon_finder --eval "db.stats()"

# Count documents
mongosh hackathon_finder --eval "db.hackathons.countDocuments()"
mongosh hackathon_finder --eval "db.users.countDocuments()"

# View sample data
mongosh hackathon_finder --eval "db.hackathons.findOne()"
mongosh hackathon_finder --eval "db.users.findOne()"
```

## 🚀 Development Workflow

### Available Scripts
```bash
# Start development server
npm start

# Create demo users
node scripts/createDemoUsers.js

# Export users for production
node scripts/exportLocalUsers.js

# Fix password hashing issues
node scripts/fixAllPasswords.js

# Update admin seeding data
node scripts/updateAdminUsers.js
```

### Testing the Application
1. **Start the server**: `npm start`
2. **Open browser**: Navigate to `http://localhost:3001`
3. **Seed database**: Use admin panel or API endpoint
4. **Test login**: Use demo credentials (`user1@example.com` / `password123`)
5. **Browse hackathons**: View personalized recommendations
6. **Register for events**: Test the complete registration flow

### Troubleshooting Common Issues

#### Port Conflicts
```bash
# If port 3001 is in use, kill the process
lsof -ti:3001 | xargs kill -9

# Or change port in server.js and .env
```

#### MongoDB Connection Issues
```bash
# Check MongoDB status
brew services list | grep mongodb

# Restart MongoDB
brew services restart mongodb/brew/mongodb-community

# Check connection string format
mongodb://localhost:27017/hackathon_finder
```

#### JWT Authentication Issues
```bash
# Generate new JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Update .env file with new secret
```

## 🌐 Deployment

### Vercel Deployment
The application is configured for Vercel deployment:

1. **Connect repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Automatic deployment on git push

### Environment Variables for Production
```env
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hackathon_finder
JWT_SECRET=your_secure_production_jwt_secret
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow existing code style and structure
- Add comments for complex logic
- Test all new features thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the console logs for error messages
3. Ensure all dependencies are installed correctly
4. Verify MongoDB connection and seeding

For additional help, please open an issue in the repository.
