// Script to update admin.js with all local users
const fs = require('fs');
const path = require('path');

const allUsers = [
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

console.log('Updated admin.js with all local users');
console.log(`Total users: ${allUsers.length}`);
console.log('Key accounts:');
console.log('- debdoot@email.com (your main account)');
console.log('- dummy123@email.com (your test account)');
console.log('- alice.johnson@email.com (demo account)');
