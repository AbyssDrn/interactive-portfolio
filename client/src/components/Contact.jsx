import React, { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! I will get back to you soon.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Left: Info */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-10 text-white flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-bold mb-6">Let's Chat!</h3>
            <p className="text-blue-100 mb-8 leading-relaxed">
              Whether you have a question about VLSI, want to collaborate on an AI project, or just want to say hi, my inbox is always open.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <FaEnvelope /> <span>amalmadhu04022001@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt /> <span>Thiruvananthapuram, Kerala, India</span>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <p className="text-sm opacity-70">© 2026 Amal Madhu</p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
              <input 
                type="text" required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Email</label>
              <input 
                type="email" required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
              <textarea 
                rows="4" required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white resize-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              Send Message <FaPaperPlane className="text-sm" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;