const mongoose = require('mongoose');

const pdfSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title for the PDF'],
    },
    url: {
      type: String,
      required: [true, 'S3 URL is missing'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Subject',
    },
    fileName: {
      type: String, // Original filename
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Pdf', pdfSchema);
