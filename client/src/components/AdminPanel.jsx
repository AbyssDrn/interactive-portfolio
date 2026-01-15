import React, { useState } from 'react';
import axios from 'axios';
import { FaTrash, FaPlus, FaTimes } from 'react-icons/fa';

// We accept 'projects' and 'refreshProjects' as props to manage the list
const AdminPanel = ({ projects, refreshProjects }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('add'); // 'add' or 'manage'
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubLink: '',
    image: ''
  });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // --- Form Handlers ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const techArray = formData.technologies.split(',').map(item => item.trim());
    const payload = { ...formData, technologies: techArray };

    try {
      await axios.post(`${API_URL}/projects`, payload);
      alert('Project Added!');
      setFormData({ title: '', description: '', technologies: '', githubLink: '', image: '' });
      refreshProjects(); // Refresh the main app data
    } catch (err) {
      console.error(err);
      alert('Error adding project');
    }
  };

  // --- Delete Handler ---
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`${API_URL}/projects/${id}`);
        refreshProjects(); // Refresh UI immediately
      } catch (error) {
        alert("Failed to delete");
      }
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white p-4 rounded-full shadow-2xl hover:bg-gray-700 transition-all hover:scale-110"
        title="Open Admin Panel"
      >
        <FaPlus />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <h2 className="text-2xl font-bold dark:text-white">Admin Dashboard</h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-red-500">
            <FaTimes size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b dark:border-gray-700">
          <button 
            onClick={() => setActiveTab('add')}
            className={`flex-1 p-3 font-semibold ${activeTab === 'add' ? 'bg-blue-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            Add New
          </button>
          <button 
            onClick={() => setActiveTab('manage')}
            className={`flex-1 p-3 font-semibold ${activeTab === 'manage' ? 'bg-blue-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            Manage Existing
          </button>
        </div>

        {/* Content Area (Scrollable) */}
        <div className="p-6 overflow-y-auto">
          {activeTab === 'add' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="title" placeholder="Project Title" value={formData.title} onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600" required />
              <input name="githubLink" placeholder="GitHub URL" value={formData.githubLink} onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              <input name="technologies" placeholder="Tech Stack (comma separated)" value={formData.technologies} onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 h-32" required />
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                Publish Project
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              {projects.length === 0 ? <p className="text-center text-gray-500">No projects found.</p> : projects.map(p => (
                <div key={p._id} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                  <div>
                    <h4 className="font-bold dark:text-white">{p.title}</h4>
                    <p className="text-xs text-gray-500 truncate w-48">{p.description}</p>
                  </div>
                  <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:text-red-700 p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;