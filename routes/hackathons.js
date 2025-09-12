const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Hackathon = require('../models/Hackathon');
const { auth, adminAuth } = require('../middleware/auth');

// @route   GET /api/hackathons
// @desc    Get all hackathons with optional filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      status,
      mode,
      difficulty,
      theme,
      location,
      page = 1,
      limit = 10,
      sortBy = 'startDate',
      sortOrder = 'asc'
    } = req.query;

    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (mode) filter.mode = mode;
    if (difficulty) filter.difficulty = difficulty;
    if (theme) filter.themes = { $in: [new RegExp(theme, 'i')] };
    if (location) filter.location = { $regex: location, $options: 'i' };

    // Calculate pagination
    const skip = (page - 1) * limit;
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const hackathons = await Hackathon.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Hackathon.countDocuments(filter);

    res.json({
      success: true,
      data: hackathons,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Error fetching hackathons:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching hackathons'
    });
  }
});

// @route   GET /api/hackathons/:id
// @desc    Get single hackathon by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    // Validate ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid hackathon ID format'
      });
    }

    const hackathon = await Hackathon.findById(req.params.id);
    
    if (!hackathon) {
      return res.status(404).json({
        success: false,
        message: 'Hackathon not found'
      });
    }

    res.json({
      success: true,
      data: hackathon
    });
  } catch (error) {
    console.error('Error fetching hackathon:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Hackathon not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while fetching hackathon'
    });
  }
});

// @route   POST /api/hackathons
// @desc    Create a new hackathon
// @access  Private (Admin only)
router.post('/', adminAuth, [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('organizer').notEmpty().withMessage('Organizer is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('mode').isIn(['online', 'offline', 'hybrid']).withMessage('Mode must be online, offline, or hybrid'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').isISO8601().withMessage('Valid end date is required'),
  body('registrationDeadline').isISO8601().withMessage('Valid registration deadline is required'),
  body('registrationLink').isURL().withMessage('Valid registration link is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const hackathon = new Hackathon(req.body);
    await hackathon.save();

    res.status(201).json({
      success: true,
      data: hackathon,
      message: 'Hackathon created successfully'
    });
  } catch (error) {
    console.error('Error creating hackathon:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating hackathon'
    });
  }
});

// @route   PUT /api/hackathons/:id
// @desc    Update a hackathon
// @access  Private (Admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const hackathon = await Hackathon.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!hackathon) {
      return res.status(404).json({
        success: false,
        message: 'Hackathon not found'
      });
    }

    res.json({
      success: true,
      data: hackathon,
      message: 'Hackathon updated successfully'
    });
  } catch (error) {
    console.error('Error updating hackathon:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Hackathon not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while updating hackathon'
    });
  }
});

// @route   DELETE /api/hackathons/:id
// @desc    Delete a hackathon
// @access  Private (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const hackathon = await Hackathon.findByIdAndDelete(req.params.id);

    if (!hackathon) {
      return res.status(404).json({
        success: false,
        message: 'Hackathon not found'
      });
    }

    res.json({
      success: true,
      message: 'Hackathon deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting hackathon:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Hackathon not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while deleting hackathon'
    });
  }
});

// @route   GET /api/hackathons/search/:query
// @desc    Search hackathons by title, description, or tags
// @access  Public
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const searchRegex = new RegExp(query, 'i');

    const hackathons = await Hackathon.find({
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { themes: { $in: [searchRegex] } },
        { technologies: { $in: [searchRegex] } },
        { tags: { $in: [searchRegex] } },
        { organizer: searchRegex }
      ]
    }).sort({ startDate: 1 });

    res.json({
      success: true,
      data: hackathons,
      count: hackathons.length
    });
  } catch (error) {
    console.error('Error searching hackathons:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while searching hackathons'
    });
  }
});

// @route   POST /api/hackathons/:id/register
// @desc    Register for a hackathon
// @access  Private
router.post('/:id/register', auth, [
  body('personalInfo.firstName').notEmpty().withMessage('First name is required'),
  body('personalInfo.lastName').notEmpty().withMessage('Last name is required'),
  body('personalInfo.email').isEmail().withMessage('Valid email is required'),
  body('personalInfo.phone').notEmpty().withMessage('Phone number is required'),
  body('personalInfo.university').notEmpty().withMessage('University is required'),
  body('personalInfo.graduationYear').isInt({ min: 2020, max: 2030 }).withMessage('Valid graduation year is required'),
  body('experience.hackathonsAttended').isInt({ min: 0 }).withMessage('Hackathons attended must be a non-negative number'),
  body('experience.programmingExperience').isIn(['beginner', 'intermediate', 'advanced']).withMessage('Programming experience must be beginner, intermediate, or advanced'),
  body('teamInfo.hasTeam').isBoolean().withMessage('Has team must be true or false'),
  body('projectInfo.projectIdea').notEmpty().withMessage('Project idea is required'),
  body('projectInfo.motivation').notEmpty().withMessage('Motivation is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    // Check if hackathon exists
    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon) {
      return res.status(404).json({
        success: false,
        message: 'Hackathon not found'
      });
    }

    // Check if registration is still open
    if (new Date() > new Date(hackathon.registrationDeadline)) {
      return res.status(400).json({
        success: false,
        message: 'Registration deadline has passed'
      });
    }

    // Create registration object
    const registration = {
      userId: req.user.id,
      hackathonId: req.params.id,
      ...req.body,
      registrationDate: new Date(),
      status: 'registered'
    };

    // In a real application, you would save this to a Registration model
    // For now, we'll just return success
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        registrationId: `reg_${Date.now()}`,
        hackathonTitle: hackathon.title,
        registrationDate: registration.registrationDate
      }
    });

  } catch (error) {
    console.error('Error registering for hackathon:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while registering for hackathon'
    });
  }
});

// @route   GET /api/hackathons/personalized
// @desc    Get personalized hackathons based on user interests
// @access  Private
router.get('/personalized', auth, async (req, res) => {
  try {
    const User = require('../models/User');
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get all hackathons - always show all hackathons
    const allHackathons = await Hackathon.find();
    
    // Score hackathons based on user preferences for sorting only
    const scoredHackathons = allHackathons.map(hackathon => {
      let score = 0;
      
      // Base score for all hackathons to ensure they appear
      score += 1;
      
      // Boost score for upcoming hackathons
      if (hackathon.status === 'upcoming') {
        score += 5;
      }
      
      // Boost score for ongoing hackathons
      if (hackathon.status === 'ongoing') {
        score += 8;
      }
      
      // Prefer hackathons with registration still open
      if (new Date() < new Date(hackathon.registrationDeadline)) {
        score += 3;
      }
      
      // Additional boost for matching user preferences (if any)
      if (user.preferences && user.preferences.length > 0) {
        const matchingThemes = hackathon.themes.filter(theme => 
          user.preferences.some(pref => 
            theme.toLowerCase().includes(pref.toLowerCase()) || 
            pref.toLowerCase().includes(theme.toLowerCase())
          )
        );
        
        // Significant boost for preference matches to prioritize them
        if (matchingThemes.length > 0) {
          score += matchingThemes.length * 20;
        }
        
        // Also check technologies array for matches
        if (hackathon.technologies && hackathon.technologies.length > 0) {
          const matchingTechs = hackathon.technologies.filter(tech => 
            user.preferences.some(pref => 
              tech.toLowerCase().includes(pref.toLowerCase()) || 
              pref.toLowerCase().includes(tech.toLowerCase())
            )
          );
          if (matchingTechs.length > 0) {
            score += matchingTechs.length * 15;
          }
        }
      }
      
      return {
        ...hackathon.toObject(),
        personalizedScore: score
      };
    });
    
    // Sort by personalized score (highest first), then by start date
    scoredHackathons.sort((a, b) => {
      if (b.personalizedScore !== a.personalizedScore) {
        return b.personalizedScore - a.personalizedScore;
      }
      return new Date(a.startDate) - new Date(b.startDate);
    });

    // Remove the personalizedScore from the response to keep it clean
    const cleanHackathons = scoredHackathons.map(({ personalizedScore, ...hackathon }) => hackathon);

    res.json({
      success: true,
      data: cleanHackathons,
      message: user.preferences && user.preferences.length > 0 
        ? `Hackathons sorted by your interests: ${user.preferences.join(', ')}` 
        : 'All hackathons (add preferences to your profile for personalized sorting)'
    });

  } catch (error) {
    console.error('Error fetching personalized hackathons:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching personalized hackathons'
    });
  }
});

module.exports = router;
