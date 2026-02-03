const Pdf = require('../models/Pdf');
const Subject = require('../models/Subject');

// @desc    Upload a PDF
// @route   POST /api/pdfs
// @access  Private
const uploadPdf = async (req, res) => {
  try {
    console.log('Upload Request Body:', req.body);
    console.log('Upload Request File:', req.file);

    if (!req.file) {
      console.error('Upload Error: No file received');
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { title, subjectId } = req.body;

    if (!title || !subjectId) {
      return res.status(400).json({ message: 'Please provide title and subject' });
    }

    // Verify subject exists
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const pdf = await Pdf.create({
      title,
      url: req.file.location, // S3 URL from multer-s3
      fileName: req.file.originalname,
      subject: subjectId,
      user: req.user.id,
    });

    console.log('PDF Created Successfully:', pdf);
    res.status(201).json(pdf);
  } catch (error) {
    console.error('Upload Controller Error:', error);
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

// @desc    Get PDFs by Subject
// @route   GET /api/pdfs/:subjectId
// @access  Private
const getPdfsBySubject = async (req, res) => {
  try {
    const { subjectId } = req.params;

    // Verify subject exists
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const pdfs = await Pdf.find({ subject: subjectId })
      .populate('user', 'name') // Show who uploaded it
      .sort({ createdAt: 1 }); // Oldest first (Ascending)

    res.status(200).json(pdfs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const { DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { s3 } = require('../config/s3');

// ... existing code ...

// @desc    Delete a PDF
// @route   DELETE /api/pdfs/:id
// @access  Private
const deletePdf = async (req, res) => {
  try {
    console.log(`[DELETE] Request received for PDF ID: ${req.params.id}`);

    const pdf = await Pdf.findById(req.params.id);

    if (!pdf) {
      console.warn(`[DELETE] PDF not found in DB: ${req.params.id}`);
      return res.status(404).json({ message: 'PDF not found' });
    }

    // Check if user is the owner
    // req.user.id is string from authMiddleware, pdf.user is ObjectId
    if (!pdf.user) {
      console.warn('[DELETE] PDF has no user field. Denying delete.');
      return res.status(403).json({ message: 'PDF ownership unknown, cannot delete' });
    }

    if (pdf.user.toString() !== req.user.id) {
      console.warn(`[DELETE] Unauthorized delete attempt by user ${req.user.id} on PDF ${pdf._id}`);
      return res.status(403).json({ message: 'User not authorized to delete this PDF' });
    }

    // Extract Key from URL safely
    // Handles cases where URL characters are encoded (e.g., spaces as %20)
    const urlParts = new URL(pdf.url);
    const key = decodeURIComponent(urlParts.pathname.substring(1)); // Remove leading '/'

    console.log(`[DELETE] Original URL: ${pdf.url}`);
    console.log(`[DELETE] Derived S3 Key: ${key}`);

    // Delete from S3
    const deleteParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    };

    try {
      await s3.send(new DeleteObjectCommand(deleteParams));
      console.log(`[DELETE] S3 Object deleted successfully`);
    } catch (s3Error) {
      console.error('[DELETE] S3 Delete Error:', s3Error);
      return res.status(500).json({ message: 'Failed to delete file from S3' });
    }

    // Delete from MongoDB
    await pdf.deleteOne();
    console.log(`[DELETE] MongoDB record deleted successfully`);

    res.status(200).json({ message: 'PDF deleted successfully', id: req.params.id });
  } catch (error) {
    console.error('[DELETE] Controller Error:', error);
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

module.exports = {
  uploadPdf,
  getPdfsBySubject,
  deletePdf,
};
