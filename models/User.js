const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  age: {
    type: Number,
    min: 13,
    max: 100
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'non-binary', 'prefer-not-to-say'],
    default: 'prefer-not-to-say'
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  profile: {
    bio: String,
    skills: [String],
    experience: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    interests: [String],
    location: {
      city: String,
      country: String,
      timezone: String
    },
    education: {
      level: {
        type: String,
        enum: ['high-school', 'undergraduate', 'bachelors', 'graduate', 'masters', 'postgraduate', 'phd', 'other']
      },
      field: String,
      institution: String
    },
    occupation: {
      title: String,
      company: String,
      industry: String
    }
  },
  preferences: {
    domains: [{
      type: String,
      enum: [
        'artificial-intelligence',
        'machine-learning',
        'blockchain',
        'web-development',
        'mobile-development',
        'game-development',
        'cybersecurity',
        'data-science',
        'cloud-computing',
        'iot',
        'fintech',
        'healthtech',
        'edtech',
        'greentech',
        'social-impact',
        'hardware',
        'robotics',
        'ar-vr',
        'quantum-computing',
        'devops'
      ]
    }],
    hackathonTypes: [{
      type: String,
      enum: ['online', 'offline', 'hybrid']
    }],
    teamPreference: {
      type: String,
      enum: ['solo', 'small-team', 'large-team', 'any'],
      default: 'any'
    },
    difficultyLevel: [{
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'all-levels']
    }],
    prizeRange: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 1000000 }
    },
    travelWillingness: {
      type: String,
      enum: ['local-only', 'regional', 'national', 'international'],
      default: 'local-only'
    },
    availableWeekends: { type: Boolean, default: true },
    availableWeekdays: { type: Boolean, default: false },
    preferredDuration: {
      type: String,
      enum: ['24-hours', '48-hours', '72-hours', 'week-long', 'any'],
      default: 'any'
    }
  },
  bookmarkedHackathons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hackathon'
  }],
  participatedHackathons: [{
    hackathon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hackathon'
    },
    status: {
      type: String,
      enum: ['registered', 'participating', 'completed'],
      default: 'registered'
    },
    registeredAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
