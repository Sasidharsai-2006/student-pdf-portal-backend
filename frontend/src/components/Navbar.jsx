import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import authService from '../services/authService';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const onLogout = () => {
    authService.logout();
    navigate('/login');
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold" onClick={closeMenu}>
          <img src="/studysphere-logo.png" alt="Logo" className="h-10 w-10 rounded-full object-cover" />
          <span>StudySphere</span>
        </Link>

        {/* Hamburger Menu Button */}
        <button
          className="block rounded border border-blue-400 p-2 text-blue-100 hover:border-white hover:text-white md:hidden"
          onClick={toggleMenu}
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>

        {/* Menu Items */}
        <div className={`w-full md:flex md:w-auto md:items-center ${isOpen ? 'block' : 'hidden'}`}>
          {user ? (
            <div className="mt-4 flex flex-col gap-4 md:mt-0 md:flex-row md:items-center">
              <Link to="/subjects" className="block hover:text-blue-200 md:inline-block" onClick={closeMenu}>
                Subjects
              </Link>
              <Link to="/upload" className="block hover:text-blue-200 md:inline-block" onClick={closeMenu}>
                Upload
              </Link>
              <span className="block font-semibold md:inline-block">Hello, {user.name}</span>
              <button
                onClick={onLogout}
                className="w-full rounded bg-white px-4 py-2 text-center text-sm font-bold text-blue-600 hover:bg-gray-100 md:w-auto"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="mt-4 flex flex-col gap-4 md:mt-0 md:flex-row">
              <Link to="/login" className="block hover:underline md:inline-block" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/signup" className="block hover:underline md:inline-block" onClick={closeMenu}>
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
