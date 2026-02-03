import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Sasidhar Sai. All rights reserved.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Contact: <a href="mailto:sasidharsai26@gmail.com" className="hover:text-blue-400">sasidharsai26@gmail.com</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
