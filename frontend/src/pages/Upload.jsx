import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import subjectService from '../services/subjectService';
import pdfService from '../services/pdfService';

function Upload() {
  const [subjects, setSubjects] = useState([]);
  const [title, setTitle] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await subjectService.getSubjects();
        setSubjects(data);
        if (data.length > 0) {
          setSelectedSubject(data[0]._id); // Default to first subject
        }
      } catch (err) {
        setMessage('Error loading subjects: ' + err.message);
      }
    };

    fetchSubjects();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setMessage('Error: Only PDF files are allowed');
        setFile(null);
        e.target.value = null;
        return;
      }
      setFile(selectedFile);
      setMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !selectedSubject || !file) {
      setMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subjectId', selectedSubject);
    formData.append('pdf', file);

    try {
      await pdfService.uploadPdf(formData);
      setMessage('Upload Successful! Redirecting...');
      setTimeout(() => {
        navigate(`/subject/${selectedSubject}`);
      }, 1500);
    } catch (err) {
      // Helper to give better error messages for known AWS issues
      let friendlyMsg = err.message;
      if (err.message.includes('SignatureDoesNotMatch')) {
        friendlyMsg = 'AWS Config Error: Invalid Secret Key (Signature Mismatch).';
      } else if (err.message.includes('AccessDenied')) {
        friendlyMsg = 'AWS Config Error: Access Denied (Check Bucket Permissions).';
      } else if (err.message.includes('Region')) {
        friendlyMsg = 'AWS Config Error: Region Mismatch.';
      }

      setMessage('Upload Failed: ' + friendlyMsg);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 sm:p-6">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl sm:p-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-800 text-center">Upload PDF Material</h2>

        {message && (
          <div className={`mb-4 rounded p-2 text-center text-sm font-semibold ${message.includes('Success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">PDF Title</label>
            <input
              type="text"
              placeholder="e.g., Chapter 1 Notes"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {/* Subject Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            >
              {subjects.map((subj) => (
                <option key={subj._id} value={subj._id}>
                  {subj.name} ({subj.code})
                </option>
              ))}
            </select>
          </div>

          {/* File Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">PDF File</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg py-2 font-bold text-white transition duration-200 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Uploading...' : 'Upload PDF'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload;
