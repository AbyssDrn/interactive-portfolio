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
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="bg-gray-900 w-full h-full md:w-3/4 md:h-[90vh] rounded-2xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-700 bg-gray-800">
              <h2 className="text-2xl font-bold text-white">Amal Madhu - CV / Resume</h2>
              <div className="flex gap-4">
                {/* Download Buttons - Using placeholders for now */}
                <a href="/resume.pdf" download className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  <FaDownload /> Resume
                </a>
                <a href="/cv.pdf" download className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                  <FaDownload /> CV
                </a>
                <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Body - Resume Preview */}
            <div className="flex-1 overflow-y-auto p-8 text-gray-300 space-y-6">
               {/* We create a visual resume here since we don't have a PDF file yet */}
               <div className="bg-white text-gray-900 p-8 rounded shadow-lg max-w-3xl mx-auto min-h-[1000px]">
                  <h1 className="text-4xl font-bold text-gray-900 text-center mb-2">Amal Madhu</h1>
                  <p className="text-center text-gray-600 mb-6">AI/ML Engineer & Full-Stack Developer | Thiruvananthapuram, Kerala</p>
                  
                  <hr className="my-4 border-gray-300"/>
                  
                  <h3 className="text-xl font-bold uppercase text-blue-800 mb-2">Education</h3>
                  <p><strong>M.Tech VLSI</strong> - Digital University Kerala (2025-27)</p>
                  <p><strong>B.Tech ECE</strong> - (2020-24)</p>

                  <h3 className="text-xl font-bold uppercase text-blue-800 mt-6 mb-2">Skills</h3>
                  <p>Python, React, Node.js, PyTorch, CUDA, Verilog, VLSI Design.</p>

                  <h3 className="text-xl font-bold uppercase text-blue-800 mt-6 mb-2">Projects</h3>
                  <ul className="list-disc pl-5">
                    <li>BlueDepth-Crescent (Underwater Image Enhancement)</li>
                    <li>MyDigitalEmpire (Interactive Portfolio)</li>
                    <li>Personal AI Chatbot</li>
                  </ul>
                  
                  <div className="mt-10 text-center text-sm text-gray-500">
                    * This is a preview. Click Download buttons above for the actual file. *
                  </div>
               </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;