import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    // Find the <button> tag and replace the className with this:
  <button
    onClick={() => setDarkMode(!darkMode)}
    className="relative p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-500 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none group"
    aria-label="Toggle Dark Mode"
  >
      <div className="relative w-8 h-8 flex items-center justify-center">
        
        {/* OPEN EYE (Active in Light Mode) */}
        {/* Changed duration-300 to duration-500 and ease-out to ease-in-out for realistic weight */}
        <svg 
          className={`w-6 h-6 text-gray-800 absolute transition-all duration-500 ease-in-out origin-center
            ${darkMode ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100'}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>

        {/* CLOSED EYELID (Active in Dark Mode) */}
        {/* Matches the same timing for a seamless swap */}
        <svg 
          className={`w-6 h-6 text-yellow-400 absolute transition-all duration-500 ease-in-out origin-center
            ${darkMode ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.929 13C6.2 15.906 9.184 18 12 18c2.816 0 5.8-2.094 7.071-5" />
        </svg>

      </div>
    </button>
  );
};

export default ThemeToggle;