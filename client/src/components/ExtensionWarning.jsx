import React, { useEffect, useState } from 'react';

const ExtensionWarning = () => {
  const [hasExtension, setHasExtension] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check for common attributes added by Dark Reader and similar extensions
    const checkExtension = () => {
      const html = document.documentElement;
      if (html.getAttribute('data-darkreader-mode') || 
          html.getAttribute('data-darkreader-scheme')) {
        setHasExtension(true);
      }
    };

    // Check immediately and then every 2 seconds just in case it loads late
    checkExtension();
    const interval = setInterval(checkExtension, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!hasExtension || !isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:w-96 bg-red-600 text-white p-4 rounded-lg shadow-2xl z-[100] animate-bounce-slow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">⚠️ Dark Mode Extension Detected</h3>
          <p className="text-sm mt-1 opacity-90">
            It looks like you have a dark mode extension (like Dark Reader) on. 
            Please turn it off for this site to see the portfolio colors and animations properly!
          </p>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="ml-4 text-white hover:text-gray-200 font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ExtensionWarning;