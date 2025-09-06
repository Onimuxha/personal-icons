import React from 'react';
import { motion } from 'framer-motion';
import { IconCard } from './IconCard';
import { IconData, IconWeight, ViewMode } from '../types/icon';
import { IconSearch } from '@tabler/icons-react'; 

interface IconGridProps {
  icons: IconData[];
  size: number;
  weight: IconWeight;
  strokeWidth: number;
  favorites: Set<string>;
  onFavorite: (iconName: string) => void;
  viewMode: ViewMode;
}

export const IconGrid: React.FC<IconGridProps> = ({
  icons,
  size,
  weight,
  strokeWidth,
  favorites,
  onFavorite,
  viewMode
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
      }
    }
  };

  if (icons.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <div className="glass-card rounded-3xl p-8 mb-6 float-animation">
          <IconSearch className="w-12 h-12 text-white/20 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-white/80 mb-2">
          No icons found
        </h3>
        <p className="text-white/40 max-w-md">
          Try adjusting your search terms or filters to discover more icons
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={
        viewMode === 'grid'
          ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4'
          : 'space-y-3'
      }
    >
      {icons.map((icon, index) => (
        <motion.div
          key={icon.name}
          variants={itemVariants}
          custom={index}
        >
          <IconCard
            icon={icon}
            size={size}
            weight={weight}
            strokeWidth={strokeWidth}
            onFavorite={onFavorite}
            isFavorited={favorites.has(icon.name)}
            isListView={viewMode === 'list'}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};