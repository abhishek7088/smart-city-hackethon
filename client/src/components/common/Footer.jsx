import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white text-center py-6 border-t">
      <div className="flex justify-center space-x-8 text-gray-700 mb-4">
        <a href="/About" className="hover:text-blue-500 transition">About Us</a>
        <a href="/Contact" className="hover:text-blue-500 transition">Contact Us</a>
      </div>
      <p className="text-gray-500">&copy; 2025 Smart City. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
