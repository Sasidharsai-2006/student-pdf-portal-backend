const API_URL = 'http://localhost:5001/api/auth/';

// Register user
const register = async (userData) => {
  const response = await fetch(API_URL + 'signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || 'Registration failed');
  }
};

// Login user
const login = async (userData) => {
  const response = await fetch(API_URL + 'login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (response.ok) {
    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
    }
    return data;
  } else {
    throw new Error(data.message || 'Login failed');
  }
};

// Get current user (Protected)
const getCurrentUser = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  if (!token) return null;

  const response = await fetch(API_URL + 'me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    return null;
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  logout,
  login,
  getCurrentUser,
};

export default authService;
