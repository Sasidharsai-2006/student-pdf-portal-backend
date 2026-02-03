const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5001') + '/api/subjects';
import authService from './authService';

// Get all subjects
const getSubjects = async () => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const token = user?.token;

  if (!token) return [];

  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error ${response.status}: Failed to fetch subjects`);
  }
};

const subjectService = {
  getSubjects,
};

export default subjectService;
