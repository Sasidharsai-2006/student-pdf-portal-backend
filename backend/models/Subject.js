const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a subject name'],
      unique: true,
    },
    code: {
      type: String,
      required: [true, 'Please add a subject code (e.g., MATH101)'],
      unique: true,
    },
    description: {
      type: String,
      default: '',
    },
    image: {
      type: String, // URL to subject icon/image
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Subject', subjectSchema);
