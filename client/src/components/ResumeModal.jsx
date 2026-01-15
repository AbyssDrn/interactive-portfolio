import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaTimes } from 'react-icons/fa';

const ResumeModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Close when clicking background
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
            className="bg-white dark:bg-gray-900 w-full max-w-4xl h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
              <h2 className="text-xl font-bold dark:text-white">Resume Preview</h2>
              <div className="flex gap-4">
                <a 
                  href="/resume.pdf" 
                  download="Amal_Madhu_Resume.pdf"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <FaDownload /> Download
                </a>
                <button onClick={onClose} className="text-gray-500 hover:text-red-500">
                  <FaTimes size={24} />
                </button>
              </div>
            </div>

            {/* Resume Viewer (Iframe or Image) */}
            <div className="flex-1 bg-gray-100 dark:bg-gray-800 overflow-y-auto p-4 flex justify-center">
               {/* Replace src with your actual resume PDF path in public folder */}
               <iframe 
                  src="/resume.pdf" 
                  title="Resume"
                  className="w-full h-full rounded shadow-lg"
               >
                  <p>Your browser does not support PDFs. <a href="/resume.pdf">Download the PDF</a>.</p>
               </iframe>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;