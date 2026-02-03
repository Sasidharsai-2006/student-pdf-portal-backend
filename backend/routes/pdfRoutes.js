const express = require('express');
const router = express.Router();
console.log('PDF Routes Loaded!');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../config/s3');
const { uploadPdf, getPdfsBySubject } = require('../controllers/pdfController');

// Upload PDF (expects 'pdf' field in form-data)
// Upload PDF (expects 'pdf' field in form-data)
// Wrapper to catch Multer/S3 errors
router.post('/', protect, (req, res, next) => {
  const uploadSingle = upload.single('pdf');

  uploadSingle(req, res, (err) => {
    if (err) {
      console.error('Multer/S3 Upload Error:', err);
      // Log full error object for debugging
      if (err.name) console.error('Error Name:', err.name);
      if (err.message) console.error('Error Message:', err.message);
      if (err.$metadata) console.error('Error Metadata:', err.$metadata);

      return res.status(500).json({
        message: 'Upload failed: ' + (err.message || 'Unknown error'),
        error: err
      });
    }
    // Everything went fine, proceed to controller
    next();
  });
}, uploadPdf);

// Get PDFs for a specific subject
router.get('/:subjectId', protect, getPdfsBySubject);

// Delete PDF
const { deletePdf } = require('../controllers/pdfController');
router.delete('/:id', protect, deletePdf);

module.exports = router;
