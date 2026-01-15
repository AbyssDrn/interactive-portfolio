import React from 'react';
import { motion } from 'framer-motion';

const blogPosts = [
  {
    id: 1,
    title: "Building UNet Models for Image Enhancement",
    date: "Oct 15, 2025",
    category: "AI / Computer Vision",
    summary: "Exploring how deep learning architectures can remove haze and turbidity from underwater footage.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "From ECE to Full-Stack: A Developer's Journey",
    date: "Nov 02, 2025",
    category: "Career",
    summary: "How I bridged the gap between hardware VLSI design and modern web development using the MERN stack.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Understanding Neuromorphic VLSI",
    date: "Dec 10, 2025",
    category: "Hardware Engineering",
    summary: "Why mimicking the human brain's neural structure in silicon chips is the future of energy-efficient computing.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
  }
];

const Blog = () => {
  return (
    <div className="max-w-6xl mx-auto">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {blogPosts.map((post) => (
           <motion.div 
             key={post.id}
             whileHover={{ y: -10 }}
             className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col h-full"
           >
             <div className="h-48 overflow-hidden">
               <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
             </div>
             <div className="p-6 flex flex-col flex-grow">
               <div className="flex justify-between items-center text-xs font-bold text-blue-500 uppercase tracking-wide mb-2">
                 <span>{post.category}</span>
                 <span>{post.date}</span>
               </div>
               <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white leading-tight">{post.title}</h3>
               <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">{post.summary}</p>
               <button className="text-blue-600 dark:text-blue-400 font-semibold hover:underline text-left mt-auto">
                 Read Article →
               </button>
             </div>
           </motion.div>
         ))}
       </div>
    </div>
  );
};

export default Blog;