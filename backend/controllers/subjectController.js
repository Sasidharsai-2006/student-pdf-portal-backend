const Subject = require('../models/Subject');

// @desc    Get all subjects
// @route   GET /api/subjects
// @access  Private
const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ order: 1 });
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new subject
// @route   POST /api/subjects
// @access  Private (Admin only - for future/seed)
const createSubject = async (req, res) => {
  try {
    const { name, code, description, image } = req.body;

    if (!name || !code) {
      return res.status(400).json({ message: 'Please add name and code' });
    }

    const subject = await Subject.create({
      name,
      code,
      description,
      image,
    });

    res.status(201).json(subject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getSubjects,
  createSubject,
};
