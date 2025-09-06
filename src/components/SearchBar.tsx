import React from 'react';
import { motion } from 'framer-motion';
import { Search, X, Command } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search icons..."
}) => {
  return (
    <div className="relative group">
      <motion.div
        className="relative"
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 gradient-primary rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        
        <div className="relative glass-card rounded-2xl overflow-hidden">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
          
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-11 pr-20 py-4 bg-transparent text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 text-sm"
          />
          
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {value && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                onClick={() => onChange('')}
                className="p-1 text-white/40 hover:text-white/60 transition-colors rounded-md"
              >
                <X className="w-3 h-3" />
              </motion.button>
            )}
            
            <div className="flex items-center space-x-1 px-2 py-1 bg-white/[0.05] rounded-md">
              <Command className="w-3 h-3 text-white/30" />
              <span className="text-xs text-white/30 font-medium">K</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};