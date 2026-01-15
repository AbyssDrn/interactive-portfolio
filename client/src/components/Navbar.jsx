import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaLock } from 'react-icons/fa'; // Added Lock icon
import ThemeToggle from './ThemeToggle';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // FAST ADMIN ACCESS: Double Click the Logo
  const handleAdminAccess = () => {
    const password = prompt("Enter Admin Password:");
    if (password === "admin123") {
       // Navigate immediately in the same tab to ensure speed
       navigate('/admin'); 
    } else if (password) {
       alert("Access Denied");
    }
  };

  const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Blog', to: 'blog' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* LOGO AREA */}
        <div className="flex items-center gap-2">
            <div 
                onDoubleClick={handleAdminAccess} // Double click is safer than Shift+Click
                className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 cursor-pointer select-none"
                title="Double tap for Admin"
            >
            <Link to="home" smooth={true} duration={500}>Amal Madhu</Link>
            </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              smooth={true}
              duration={500} // Faster scroll
              spy={true}
              offset={-80} // Perfect offset for sticky header
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
            </Link>
          ))}
          <div className="ml-4 pl-4 border-l border-gray-300 dark:border-gray-700">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-gray-300">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-gray-700 dark:text-gray-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;