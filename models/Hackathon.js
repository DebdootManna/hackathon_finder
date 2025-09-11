const mongoose = require('mongoose');

const HackathonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  organizer: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    enum: ['online', 'offline', 'hybrid'],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  registrationDeadline: {
    type: Date,
    required: true
  },
  prizePool: {
    type: String,
    default: 'TBD'
  },
  themes: [{
    type: String
  }],
  technologies: [{
    type: String
  }],
  eligibility: {
    type: String,
    default: 'Open to all'
  },
  teamSize: {
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 4
    }
  },
  registrationLink: {
    type: String,
    required: true
  },
  websiteUrl: {
    type: String
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'all-levels'],
    default: 'all-levels'
  },
  tags: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
HackathonSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Hackathon', HackathonSchema);
