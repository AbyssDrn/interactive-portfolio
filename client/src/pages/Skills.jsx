import React from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../data'; // Importing your specific gradient data

const Skills = () => {
  return (
    <div className="max-w-7xl mx-auto px-4" id="skills">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SKILL_CATEGORIES.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            {/* Category Title with Gradient */}
            <h3 className={`text-xl font-bold mb-6 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
              {category.title}
            </h3>
            
            <div className="flex flex-wrap gap-3">
              {category.items.map((item) => (
                <motion.div
                  key={item}
                  className="relative group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  {/* The Independent Gradient Border/Glow */}
                  <div className={`absolute -inset-[1px] bg-gradient-to-r ${category.gradient} rounded-lg opacity-70 group-hover:opacity-100 blur-[2px] transition duration-200`} />
                  
                  {/* The Badge Content */}
                  <div className="relative px-4 py-2 bg-white dark:bg-gray-900 rounded-lg flex items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {item}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;