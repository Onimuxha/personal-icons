import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Github, ExternalLink } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 border-b border-white/[0.05] bg-black/80 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center glow-primary">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-semibold gradient-text">
                Personal Icons
              </h1>
              <p className="text-xs text-white/40 -mt-0.5">
                React icon library
              </p>
            </div>
          </motion.div>
          
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center space-x-2 px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white/80 glass-card glass-card-hover rounded-lg transition-colors"
            >
              <span className="font-mono">npm i personal-icons</span>
              <ExternalLink className="w-3 h-3" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-white/60 hover:text-white/80 glass-card glass-card-hover rounded-lg transition-colors"
            >
              <Github className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};