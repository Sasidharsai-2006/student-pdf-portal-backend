const express = require('express');
const router = express.Router();
console.log('Subject Routes Loaded!');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get all subjects
// @route   GET /api/subjects
// @access  Private
const { getSubjects, createSubject } = require('../controllers/subjectController');

router.route('/').get(protect, getSubjects).post(protect, createSubject);

module.exports = router;
