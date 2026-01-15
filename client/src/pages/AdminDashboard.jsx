import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaPlus, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('projects'); // projects, resume, blogs
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '', technologies: '', githubLink: '' });
  const navigate = useNavigate();

  // Basic Security Check
  useEffect(() => {
    // In a real app, use JWT tokens. Here we rely on the password check from Navbar
    // If you want to force re-login on refresh, use sessionStorage or local prompt here.
    const isAuth = true; // Simulating logged in since we came from the password prompt
    if (!isAuth) navigate('/');
    fetchProjects();
  }, [navigate]);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_URL}/projects`);
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    const techArray = newProject.technologies.split(',').map(t => t.trim());
    try {
      await axios.post(`${API_URL}/projects`, { ...newProject, technologies: techArray });
      setIsFormOpen(false);
      setNewProject({ title: '', description: '', technologies: '', githubLink: '' });
      fetchProjects();
      alert("Project Added!");
    } catch (err) {
      alert("Error adding project");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Permanently delete this project?")) {
      try {
        await axios.delete(`${API_URL}/projects/${id}`);
        setProjects(projects.filter(p => p._id !== id));
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white font-sans flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Admin Panel</h1>
          <p className="text-xs text-gray-500 mt-1">Logged in as Amal Madhu</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('projects')} className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === 'projects' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>Manage Projects</button>
          <button onClick={() => alert("Resume Update Logic Here")} className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Update Resume</button>
          <button onClick={() => alert("Blog Logic Here")} className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Manage Blogs</button>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button onClick={() => window.close()} className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors">
            <FaSignOutAlt /> Exit Panel
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Dashboard Overview</h2>
            <button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
                <FaPlus /> New Project
            </button>
        </header>

        {/* Project List */}
        {activeTab === 'projects' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {projects.map(project => (
                    <div key={project._id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700 flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-lg">{project.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{project.description}</p>
                            <div className="mt-3 flex gap-2">
                                {project.technologies.map(t => <span key={t} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{t}</span>)}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="text-blue-500 hover:text-blue-600">Edit</button>
                            <button onClick={() => handleDelete(project._id)} className="text-red-500 hover:text-red-600"><FaTrash /></button>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* Add Project Modal */}
        {isFormOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl w-full max-w-lg shadow-2xl relative">
                    <button onClick={() => setIsFormOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">✕</button>
                    <h3 className="text-2xl font-bold mb-6">Add New Project</h3>
                    <form onSubmit={handleAddProject} className="space-y-4">
                        <input className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600" placeholder="Project Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} required />
                        <input className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600" placeholder="GitHub Link" value={newProject.githubLink} onChange={e => setNewProject({...newProject, githubLink: e.target.value})} />
                        <input className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600" placeholder="Technologies (comma separated)" value={newProject.technologies} onChange={e => setNewProject({...newProject, technologies: e.target.value})} />
                        <textarea className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 h-32" placeholder="Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} required />
                        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">Save to Database</button>
                    </form>
                </div>
            </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;