import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { name, email, password } = formData;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      navigate('/subjects');
    }
  }, [navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(formData);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md sm:p-8">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Create Account
        </h2>
        {error && (
          <div className="mb-4 rounded bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="mb-2 block font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded bg-green-600 p-3 font-medium text-white transition hover:bg-green-700"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
