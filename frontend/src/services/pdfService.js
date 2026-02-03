const API_URL = 'http://localhost:5001/api/pdfs';
import authService from './authService';

// Upload PDF
const uploadPdf = async (formData) => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const token = user?.token;

  if (!token) throw new Error('Not authorized, no token');

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      // Do NOT set Content-Type here; fetch/browser sets it automatically for FormData with boundary
    },
    body: formData,
  });

  if (response.ok) {
    return await response.json();
  } else {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error ${response.status}: Failed to upload PDF`);
  }
};

// Get PDFs by Subject
const getPdfsBySubject = async (subjectId) => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const token = user?.token;

  if (!token) throw new Error('Not authorized, no token');

  const response = await fetch(API_URL + '/' + subjectId, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error ${response.status}: Failed to fetch PDFs`);
  }
};

// Delete PDF
const deletePdf = async (id) => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const token = user?.token;

  if (!token) throw new Error('Not authorized, no token');

  const response = await fetch(API_URL + '/' + id, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error ${response.status}: Failed to delete PDF`);
  }
};

const pdfService = {
  uploadPdf,
  getPdfsBySubject,
  deletePdf,
};

export default pdfService;
