import React from 'react';
import { motion } from 'framer-motion';
import { TIMELINE_DATA } from '../data'; // Importing your specific data

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4" id="about">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          My Journey
        </h2>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 max-w-4xl mx-auto text-left">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
            I am an <strong>M.Tech VLSI student</strong> at Digital University Kerala and an AI/ML Engineer. 
            My philosophy is simple: be a "Strategic Learner" and a "Hardware-Software Bridge Builder."
            I navigate the entire stack—from the silicon logic gates (VLSI) to the high-level web interfaces (MERN/FastAPI) and the AI models that power them.
          </p>
        </div>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Vertical Line (Desktop: Center, Mobile: Left) */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-cyan-500 to-purple-500 opacity-30 rounded-full" />
        <div className="md:hidden absolute left-4 w-1 h-full bg-gray-200 dark:bg-gray-700 rounded-full" />

        <div className="space-y-12">
          {TIMELINE_DATA.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              } items-center w-full relative`}
            >
              {/* Spacer for Desktop Alignment */}
              <div className="hidden md:block w-1/2" />

              {/* Center Dot (Desktop Only) */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 z-10 hidden md:block border-4 border-white dark:border-gray-900 shadow-lg" />

              {/* Card Content */}
              <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <div className="relative group p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:-translate-y-2 transition-all duration-300">
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

                  {/* Year Badge */}
                  <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider text-white uppercase rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-md">
                    {item.year}
                  </span>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-purple-600 dark:text-purple-400 text-sm font-semibold mb-2">
                    {item.institution}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                    {item.details}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <span key={skill} className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 rounded border border-gray-200 dark:border-gray-600">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;