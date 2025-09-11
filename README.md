# Hackathon Finder - MERN Stack Platform

A comprehensive web platform built with the MERN stack to aggregate, track, and provide easy access to global hackathon events.

## Features

- 🔍 **Discover Hackathons**: Browse and search through a comprehensive database of global hackathon events
- 📅 **Event Tracking**: Track upcoming, ongoing, and completed hackathons
- 🔖 **Bookmarking**: Save interesting hackathons for later
- 👤 **User Profiles**: Personalized dashboards for participants
- 🏷️ **Advanced Filtering**: Filter by location, mode, difficulty, themes, and more
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS3 with modern design principles

## Project Structure

```
hackathon_finder/
├── models/                 # MongoDB schemas
│   ├── Hackathon.js       # Hackathon data model
│   └── User.js            # User data model
├── routes/                # API routes
│   ├── hackathons.js      # Hackathon CRUD operations
│   └── users.js           # User management
├── scripts/               # Utility scripts
│   ├── seedData.js        # Database seeding
│   └── testCRUD.js        # CRUD operations testing
├── config/                # Configuration files
│   └── database.js        # Database connection
├── client/                # React frontend (to be created)
├── server.js              # Express server entry point
├── package.json           # Dependencies and scripts
└── .env                   # Environment variables
```

## Installation & Setup

1. **Clone and navigate to the project**:
   ```bash
   cd hackathon_finder
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up MongoDB**:
   - Install MongoDB locally or use MongoDB Atlas
   - Update the `MONGODB_URI` in `.env` file

4. **Seed the database with sample data**:
   ```bash
   node scripts/seedData.js
   ```

5. **Test CRUD operations**:
   ```bash
   node scripts/testCRUD.js
   ```

6. **Start the development server**:
   ```bash
   npm run dev
   ```

## API Endpoints

### Hackathons
- `GET /api/hackathons` - Get all hackathons with filtering and pagination
- `GET /api/hackathons/:id` - Get specific hackathon by ID
- `POST /api/hackathons` - Create new hackathon
- `PUT /api/hackathons/:id` - Update hackathon
- `DELETE /api/hackathons/:id` - Delete hackathon
- `GET /api/hackathons/search/:query` - Search hackathons

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get specific user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Sample Data

The database includes 10 diverse hackathons covering various domains:
- AI/ML Challenges
- Blockchain & Crypto
- Mobile Development
- Quantum Computing
- Green Technology
- FinTech
- Healthcare Innovation
- Gaming & VR
- Cybersecurity
- EdTech

## Environment Variables

Create a `.env` file with the following variables:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hackathon_finder
JWT_SECRET=your_jwt_secret_key_here
```

## Development Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run client` - Start React development server
- `npm run server` - Start backend server only

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
