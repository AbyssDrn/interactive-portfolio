import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaDiscord, FaTwitter, FaFileAlt } from 'react-icons/fa';
import ParticlesBackground from './components/ParticlesBackground';
import ResumeModal from './components/ResumeModal';
import AdminPanel from './components/AdminPanel';
import ExtensionWarning from './components/ExtensionWarning';
import Navbar from './components/Navbar';
import Blog from './components/Blog';
import Contact from './components/Contact';
import axios from 'axios';

// --- DATA ---
const socialLinks = [
  { icon: <FaGithub />, url: "https://github.com/AbyssDrn" },
  { icon: <FaLinkedin />, url: "https://linkedin.com" },
  { icon: <FaInstagram />, url: "https://instagram.com" },
  { icon: <FaTwitter />, url: "https://x.com" },
  { icon: <FaDiscord />, url: "https://discord.com" },
];

const skills = [
  { category: "Programming", items: ["Python", "JavaScript", "C++", "Verilog", "MATLAB"] },
  { category: "AI/ML", items: ["PyTorch", "TensorFlow", "Computer Vision", "CUDA", "UNet"] },
  { category: "Full Stack", items: ["React", "Node.js", "MongoDB", "Tailwind", "FastAPI"] },
  { category: "Hardware", items: ["VLSI Design", "FPGA", "Embedded Systems", "IoT"] },
  { category: "Creative", items: ["Blender", "Godot", "Figma", "Video Editing"] },
];

// Configuration for API URL (Scalable for deployment)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
  const [projects, setProjects] = useState([]);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const fetchProjects = () => {
    axios.get(`${API_URL}/projects`)
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this project?")) {
      try {
        await axios.delete(`${API_URL}/projects/${id}`);
        setProjects(projects.filter(p => p._id !== id));
      } catch (error) {
        alert("Failed to delete");
      }
    }
  };

  // Reusable Section Component for smooth animations
  const Section = ({ id, title, children, className = "" }) => (
    <section id={id} className={`min-h-screen py-24 px-6 relative ${className}`}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
          >
            {title}
          </motion.h2>
        )}
        {children}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-sans transition-colors duration-500 overflow-x-hidden">
      <ParticlesBackground />
      <ExtensionWarning />
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      
      {/* Navbar now handles the Theme Toggle and Navigation */}
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6 relative">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 z-10 text-center lg:text-left"
          >
            <h2 className="text-lg text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">
              AI/ML Engineer & VLSI Student
            </h2>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Building the <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Intelligent Future
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

            <div 
              onClick={() => setIsResumeOpen(true)}
              className="mt-8 inline-flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <FaFileAlt className="group-hover:rotate-12 transition-transform" />
              <span>View Resume / CV</span>
            </div>
          </motion.div>

          {/* Interactive Photo */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center perspective-1000 z-10"
          >
            <div 
              className={`relative w-80 h-[28rem] md:w-96 md:h-[32rem] transition-transform duration-700 transform-style-3d cursor-pointer ${flipped ? 'rotate-y-180' : ''}`}
              onClick={() => setFlipped(!flipped)}
            >
              <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                <img src="https://via.placeholder.com/400x600" alt="Amal Madhu" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-white text-center text-sm font-medium animate-pulse">Tap photo to see my traits</p>
                </div>
              </div>

              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gray-900/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-700 flex flex-col justify-center text-center">
                <h3 className="text-2xl font-bold text-white mb-6">Behind the Code</h3>
                <div className="space-y-4 text-left">
                  <div>
                    <h4 className="text-blue-400 font-bold uppercase text-xs">Strengths</h4>
                    <p className="text-gray-300 text-sm">Rapid learner, Hardware-Software integration, Problem-solving.</p>
                  </div>
                  <div>
                    <h4 className="text-purple-400 font-bold uppercase text-xs">Focus</h4>
                    <p className="text-gray-300 text-sm">Computer Vision, VLSI, MERN Stack.</p>
                  </div>
                  <div>
                    <h4 className="text-pink-400 font-bold uppercase text-xs">Hobbies</h4>
                    <p className="text-gray-300 text-sm">Cycling, Anime, Game Dev, Research.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <Section id="about" className="bg-gray-100/50 dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             viewport={{ once: true }}
           >
             <h2 className="text-4xl font-bold mb-8 text-center">My Journey</h2>
             <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 leading-relaxed text-lg text-gray-700 dark:text-gray-300 space-y-6">
               <p>
                 I am currently an <strong>M.Tech student in VLSI</strong> at Digital University Kerala, passionate about bridging the gap between hardware and software. My journey started with a B.Tech in ECE, where I discovered my love for building things from scratch.
               </p>
               <p>
                 My goal is to become a versatile developer capable of building the entire stack: from the silicon chip (VLSI) to the backend API and the frontend user experience. 
               </p>
             </div>
           </motion.div>
        </div>
      </Section>

      {/* --- SKILLS SECTION --- */}
      <Section id="skills" title="Technical Arsenal">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map(item => (
                  <span key={item} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* --- PROJECTS SECTION --- */}
      <Section id="projects" title="Projects & Innovations" className="bg-gray-100/50 dark:bg-gray-800/50">
        <AdminPanel onProjectAdded={fetchProjects} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col h-full group"
            >
              {/* Delete Button */}
              <button 
                onClick={() => handleDelete(project._id)}
                className="absolute top-6 right-6 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
              
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-blue-500 transition-colors">{project.title}</h3>
                <a href={project.githubLink} className="text-gray-400 hover:text-white text-2xl"><FaGithub /></a>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">{project.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span key={tech} className="px-3 py-1 text-xs font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-lg uppercase tracking-wide">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* --- BLOG SECTION --- */}
      <Section id="blog" title="Latest Articles">
        <Blog />
      </Section>

      {/* --- CONTACT SECTION --- */}
      <Section id="contact" title="Get In Touch" className="bg-gray-100/50 dark:bg-gray-800/50">
        <Contact />
      </Section>

      {/* --- FOOTER --- */}
      <footer className="py-12 text-center border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="flex justify-center gap-6 mb-4">
          {socialLinks.map((link, index) => (
             <a key={index} href={link.url} className="text-gray-400 hover:text-blue-500 text-xl transition-colors">{link.icon}</a>
          ))}
        </div>
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Amal Madhu. Engineered with MERN Stack.</p>
      </footer>
    </div>
  );
}

export default App;