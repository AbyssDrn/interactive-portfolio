import React, { useState } from 'react';
import axios from 'axios';

const AdminPanel = ({ onProjectAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubLink: '',
    image: ''
  });

  // Handle typing in the input boxes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Split the comma-separated string into an array (e.g., "React, Node" -> ["React", "Node"])
    const techArray = formData.technologies.split(',').map(item => item.trim());

    const payload = {
      ...formData,
      technologies: techArray
    };

    try {
      await axios.post('http://localhost:5000/api/projects', payload);
      alert('Project Added Successfully!');
      
      // Clear form and close it
      setFormData({ title: '', description: '', technologies: '', githubLink: '', image: '' });
      setIsOpen(false);
      
      // Tell the main App to refresh the list
      onProjectAdded(); 
    } catch (err) {
      console.error(err);
      alert('Error adding project');
    }
  };

  return (
    <div className="max-w-6xl mx-auto mb-8">
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 dark:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
      >
        {isOpen ? '✕ Close Admin Panel' : '+ Add New Project'}
      </button>

      {/* The Form */}
      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in-down">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Add a New Project</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              name="title" 
              placeholder="Project Title" 
              value={formData.title} 
              onChange={handleChange} 
              className="p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required 
            />
            <input 
              name="githubLink" 
              placeholder="GitHub URL" 
              value={formData.githubLink} 
              onChange={handleChange} 
              className="p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600" 
            />
            <input 
              name="technologies" 
              placeholder="Technologies (comma separated: React, Node)" 
              value={formData.technologies} 
              onChange={handleChange} 
              className="p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 md:col-span-2" 
            />
            <textarea 
              name="description" 
              placeholder="Project Description" 
              value={formData.description} 
              onChange={handleChange} 
              className="p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 md:col-span-2 h-24" 
              required
            />
          </div>

          <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-bold transition-colors">
            Save Project
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminPanel;