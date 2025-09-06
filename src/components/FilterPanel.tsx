import React from 'react';
import { motion } from 'framer-motion';
import { IconWeight } from '../types/icon';

interface FilterPanelProps {
  selectedWeight: IconWeight;
  onWeightChange: (weight: IconWeight) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  iconStyle: 'all' | 'regular' | 'duotone';
  onIconStyleChange: (style: 'all' | 'regular' | 'duotone') => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedWeight,
  onWeightChange,
  selectedCategory,
  onCategoryChange,
  categories,
  iconStyle,
  onIconStyleChange
}) => {
  const weights: IconWeight[] = ['all','thin', 'light', 'regular', 'fill'];
  const iconStyles = [
    { value: 'all' as const, label: 'All Styles' },
    { value: 'regular' as const, label: 'Regular' },
    { value: 'duotone' as const, label: 'Duotone' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Icon Style Filter */}
      <div className="bg-black/20 border border-white/[0.08] rounded-2xl p-5">
        <h3 className="text-sm font-medium text-white/90 mb-4 flex items-center">
          <div className="w-1 h-4 bg-white/20 rounded-full mr-3" />
          Style
        </h3>
        <div className="space-y-1.5">
          {iconStyles.map((style) => (
            <motion.button
              key={style.value}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onIconStyleChange(style.value)}
              className={`w-full px-3 py-2.5 rounded-lg text-xs font-medium text-left transition-all duration-200 ${
                iconStyle === style.value
                  ? 'bg-white/[0.12] text-white border border-white/[0.15] shadow-sm'
                  : 'text-white/60 hover:text-white/80 hover:bg-white/[0.06]'
              }`}
            >
              {style.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Weight Filter - Hidden for duotone style */}
      {iconStyle !== 'duotone' && (
        <div className="bg-black/20 border border-white/[0.08] rounded-2xl p-5">
          <h3 className="text-sm font-medium text-white/90 mb-4 flex items-center">
            <div className="w-1 h-4 bg-white/20 rounded-full mr-3" />
            Weight
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {weights.map((weight) => (
              <motion.button
                key={weight}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onWeightChange(weight)}
                className={`px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  selectedWeight === weight
                    ? 'bg-white/[0.12] text-white border border-white/[0.15] shadow-sm'
                    : 'bg-white/[0.04] text-white/60 hover:text-white/80 hover:bg-white/[0.08] border border-transparent'
                }`}
              >
                {weight.charAt(0).toUpperCase() + weight.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="bg-black/20 border border-white/[0.08] rounded-2xl p-5">
        <h3 className="text-sm font-medium text-white/90 mb-4 flex items-center">
          <div className="w-1 h-4 bg-white/20 rounded-full mr-3" />
          Category
        </h3>
        <div className="space-y-1.5 max-h-64 overflow-y-auto">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onCategoryChange('all')}
            className={`w-full px-3 py-2.5 rounded-lg text-xs font-medium text-left transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'bg-white/[0.12] text-white border border-white/[0.15] shadow-sm'
                : 'text-white/60 hover:text-white/80 hover:bg-white/[0.06]'
            }`}
          >
            All Categories
          </motion.button>
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onCategoryChange(category)}
              className={`w-full px-3 py-2.5 rounded-lg text-xs font-medium text-left capitalize transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-white/[0.12] text-white border border-white/[0.15] shadow-sm'
                  : 'text-white/60 hover:text-white/80 hover:bg-white/[0.06]'
              }`}
            >
              {category.replace(/([A-Z])/g, ' $1').trim()}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};