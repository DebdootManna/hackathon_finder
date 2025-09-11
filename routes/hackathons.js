const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Hackathon = require('../models/Hackathon');

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
// @access  Public (In production, this should be protected)
router.post('/', [
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
// @access  Public (In production, this should be protected)
router.put('/:id', async (req, res) => {
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
// @access  Public (In production, this should be protected)
router.delete('/:id', async (req, res) => {
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

module.exports = router;
