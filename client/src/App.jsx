import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { FaGithub, FaLinkedin, FaInstagram, FaDiscord, FaTwitter, FaFileAlt } from 'react-icons/fa';
import ParticlesBackground from './components/ParticlesBackground';
import ResumeModal from './components/ResumeModal';
import ExtensionWarning from './components/ExtensionWarning';
import Navbar from './components/Navbar';
import Blog from './components/Blog';
import Contact from './components/Contact';
import axios from 'axios';

// Import Pages
import About from './pages/About';
import Skills from './pages/Skills';
import AdminDashboard from './pages/AdminDashboard'; 

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const socialLinks = [
  { icon: <FaGithub />, url: "https://github.com/AbyssDrn" },
  { icon: <FaLinkedin />, url: "https://linkedin.com" },
  { icon: <FaInstagram />, url: "https://instagram.com" },
  { icon: <FaTwitter />, url: "https://x.com" },
  { icon: <FaDiscord />, url: "https://discord.com" },
];

const MainPortfolio = () => {
  const [projects, setProjects] = useState([]);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const fetchProjects = () => {
    axios.get(`${API_URL}/projects`)
      .then(res => setProjects(res.data))
      .catch(err => console.error("Backend offline", err));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const Section = ({ id, title, children, className = "" }) => (
    <section id={id} className={`py-20 px-4 md:px-8 relative z-10 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
          >
            {title}
          </motion.h2>
        )}
        {children}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-sans transition-colors duration-300 overflow-x-hidden">
      <ParticlesBackground />
      <ExtensionWarning />
      
      {/* Resume Modal with internal animations is called here */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      
      <Navbar />

      <Section id="home" className="min-h-screen flex items-center justify-center pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center lg:text-left"
          >
            <h2 className="text-lg text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest">
              M.Tech VLSI & AI Engineer
            </h2>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Amal <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Madhu
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto lg:mx-0">
              Bridging hardware and software—from neuromorphic VLSI circuits to deep learning models and full-stack web applications.
            </p>
            
            <div className="flex gap-6 justify-center lg:justify-start pt-4">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-500 hover:text-blue-500 transition-colors transform hover:scale-110">
                  {link.icon}
                </a>
              ))}
            </div>

            <div className="flex gap-4 justify-center lg:justify-start mt-8">
              
              {/* --- 1. ANIMATED RESUME BUTTON --- */}
              <motion.button 
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsResumeOpen(true)}
                className="group relative px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-bold shadow-lg flex items-center gap-3 overflow-hidden"
              >
                {/* Icon Animation: Wiggle/Rotate on Hover */}
                <motion.span 
                  variants={{ hover: { rotate: [0, -15, 15, -15, 0], transition: { duration: 0.5 } } }}
                >
                  <FaFileAlt />
                </motion.span>
                <span className="relative z-10">View Resume</span>
                
                {/* Background Sweep Animation */}
                <div className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 -z-0"></div>
              </motion.button>
              
              {/* --- 2. SMOOTH CONTACT BUTTON --- */}
              <ScrollLink 
                to="contact" 
                smooth={true} 
                duration={500} 
                offset={-80}
              >
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-bold transition-all cursor-pointer text-gray-700 dark:text-white"
                >
                  Contact Me
                </motion.button>
              </ScrollLink>

            </div>
          </motion.div>

          {/* Profile Card */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center perspective-1000"
          >
            <div 
              className={`relative w-80 h-[28rem] cursor-pointer transform-style-3d transition-transform duration-700 ${flipped ? 'rotate-y-180' : ''}`}
              onClick={() => setFlipped(!flipped)}
            >
               <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 bg-gray-200">
                  <img src="https://via.placeholder.com/400x600" alt="Amal Madhu" className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <p className="text-white text-center text-sm font-medium animate-pulse">Tap photo to see stats</p>
                  </div>
               </div>
               <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gray-900/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-700 flex flex-col justify-center text-center">
                  <h3 className="text-2xl font-bold text-white mb-6">Quick Stats</h3>
                  <div className="space-y-4 text-left">
                     <p className="text-gray-300"><strong className="text-blue-400">Typing:</strong> 70+ WPM</p>
                     <p className="text-gray-300"><strong className="text-purple-400">Age:</strong> 25</p>
                     <p className="text-gray-300"><strong className="text-pink-400">Location:</strong> Kerala, India</p>
                     <p className="text-gray-300"><strong className="text-green-400">Focus:</strong> VLSI & Full Stack</p>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </Section>

      <Section id="about" className="bg-gray-50 dark:bg-gray-900"><About /></Section>
      <Section id="skills" title="Technical Arsenal"><Skills /></Section>
      
      <Section id="projects" title="Projects & Innovations">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 group hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">{project.title}</h3>
                <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white text-xl"><FaGithub /></a>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.technologies.map(tech => (
                  <span key={tech} className="px-3 py-1 text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-300 rounded-lg">{tech}</span>
                ))}
              </div>
            </motion.div>
          ))}
          {projects.length === 0 && <p className="text-center w-full text-gray-500">Loading projects...</p>}
        </div>
      </Section>

      <Section id="blog" title="Latest Articles"><Blog /></Section>
      <Section id="contact" title="Get In Touch"><Contact /></Section>

      <footer className="py-8 text-center border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Amal Madhu. Engineered with MERN Stack.</p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPortfolio />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;