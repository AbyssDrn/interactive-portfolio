import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThemeToggle from './components/ThemeToggle';
import ExtensionWarning from './components/ExtensionWarning';
import AdminPanel from './components/AdminPanel';

function App() {
  const [projects, setProjects] = useState([]);

  // Fetch projects from database
  const fetchProjects = () => {
    axios.get('http://localhost:5000/api/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // DELETE Function
  const handleDelete = async (id) => {
    // Confirm before deleting to prevent accidents
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`http://localhost:5000/api/projects/${id}`);
        // Remove the project from the UI immediately
        setProjects(projects.filter(project => project._id !== id));
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500 font-sans p-4 md:p-10">
      
      <ThemeToggle />
      <ExtensionWarning />

      <header className="max-w-6xl mx-auto mb-12 text-center pt-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          My Interactive Portfolio
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Built with MERN Stack (MongoDB, Express, React, Node)
        </p>
      </header>
      
      <AdminPanel onProjectAdded={fetchProjects} />
      
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map(project => (
          <div key={project._id} className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full group">
            
            {/* DELETE BUTTON (Trash Icon) - Only appears on hover */}
            <button 
              onClick={() => handleDelete(project._id)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2"
              title="Delete Project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white pr-8">{project.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full text-xs font-semibold uppercase tracking-wide">
                  {tech}
                </span>
              ))}
            </div>

            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors mt-auto w-fit">
              View on GitHub 
              <span className="ml-1">→</span>
            </a>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;