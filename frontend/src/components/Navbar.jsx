import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const onLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          Student PDF Portal
        </Link>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/subjects" className="hover:text-blue-200">
                Subjects
              </Link>
              <Link to="/upload" className="hover:text-blue-200">
                Upload
              </Link>
              <span className="font-semibold">Hello, {user.name}</span>
              <button
                onClick={onLogout}
                className="rounded bg-white px-4 py-2 text-sm font-bold text-blue-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/signup" className="hover:underline">
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
