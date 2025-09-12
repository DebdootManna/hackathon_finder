const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { auth, adminAuth } = require('../middleware/auth');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('age').optional().isInt({ min: 13, max: 100 }).withMessage('Age must be between 13 and 100'),
  body('gender').optional().isIn(['male', 'female', 'non-binary', 'prefer-not-to-say']).withMessage('Invalid gender'),
  body('phoneNumber').optional().isMobilePhone().withMessage('Invalid phone number')
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

    const { name, email, password, age, gender, phoneNumber, profile, preferences } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role: 'user', // Default role
      age,
      gender,
      phoneNumber,
      profile: profile || {},
      preferences: preferences || {}
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userResponse,
        token
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
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

    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userResponse,
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('bookmarkedHackathons')
      .populate('participatedHackathons.hackathon');

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // Allow email updates but validate uniqueness
    if (updateData.email && updateData.email !== req.user.email) {
      const existingUser = await User.findOne({ email: updateData.email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use by another account'
        });
      }
    }
    
    delete updateData.password; // Don't allow password updates through this route

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile'
    });
  }
});

// @route   POST /api/auth/bookmark/:hackathonId
// @desc    Bookmark/unbookmark a hackathon
// @access  Private
router.post('/bookmark/:hackathonId', auth, async (req, res) => {
  try {
    const { hackathonId } = req.params;
    const user = await User.findById(req.user._id);

    const isBookmarked = user.bookmarkedHackathons.includes(hackathonId);

    if (isBookmarked) {
      // Remove bookmark
      user.bookmarkedHackathons = user.bookmarkedHackathons.filter(
        id => id.toString() !== hackathonId
      );
    } else {
      // Add bookmark
      user.bookmarkedHackathons.push(hackathonId);
    }

    await user.save();

    res.json({
      success: true,
      message: isBookmarked ? 'Hackathon unbookmarked' : 'Hackathon bookmarked',
      data: {
        bookmarked: !isBookmarked,
        bookmarkedHackathons: user.bookmarkedHackathons
      }
    });
  } catch (error) {
    console.error('Bookmark error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while bookmarking'
    });
  }
});

// @route   POST /api/auth/participate/:hackathonId
// @desc    Register participation in a hackathon
// @access  Private
router.post('/participate/:hackathonId', auth, async (req, res) => {
  try {
    const { hackathonId } = req.params;
    const user = await User.findById(req.user._id);

    // Check if already participating
    const alreadyParticipating = user.participatedHackathons.some(
      p => p.hackathon.toString() === hackathonId
    );

    if (alreadyParticipating) {
      return res.status(400).json({
        success: false,
        message: 'Already registered for this hackathon'
      });
    }

    user.participatedHackathons.push({
      hackathon: hackathonId,
      status: 'registered'
    });

    await user.save();

    res.json({
      success: true,
      message: 'Successfully registered for hackathon',
      data: {
        participatedHackathons: user.participatedHackathons
      }
    });
  } catch (error) {
    console.error('Participation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while registering participation'
    });
  }
});

// @route   POST /api/auth/admin/register
// @desc    Register a new admin user
// @access  Private (Admin only)
router.post('/admin/register', adminAuth, [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
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

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create new admin user
    const adminUser = new User({
      name,
      email,
      password,
      role: 'admin'
    });

    await adminUser.save();

    // Generate token
    const token = generateToken(adminUser._id);

    // Remove password from response
    const userResponse = adminUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'Admin user created successfully',
      data: {
        user: userResponse,
        token
      }
    });
  } catch (error) {
    console.error('Admin registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during admin registration'
    });
  }
});

// @route   POST /api/auth/create-first-admin
// @desc    Create the first admin user (only works if no admins exist)
// @access  Public
router.post('/create-first-admin', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('adminKey').equals('HACKATHON_FINDER_ADMIN_2024').withMessage('Invalid admin key')
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

    // Check if any admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin user already exists. Use regular admin registration.'
      });
    }

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create first admin user
    const adminUser = new User({
      name,
      email,
      password,
      role: 'admin'
    });

    await adminUser.save();

    // Generate token
    const token = generateToken(adminUser._id);

    // Remove password from response
    const userResponse = adminUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'First admin user created successfully',
      data: {
        user: userResponse,
        token
      }
    });
  } catch (error) {
    console.error('First admin creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during first admin creation'
    });
  }
});

module.exports = router;
