import React from 'react';
import { motion } from 'framer-motion';
import { Grid3X3, List, Heart, Sliders } from 'lucide-react';
import { ViewMode } from '../types/icon';

interface ControlPanelProps {
  size: number;
  onSizeChange: (size: number) => void;
  strokeWidth: number;
  onStrokeWidthChange: (width: number) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  showFavorites: boolean;
  onShowFavoritesChange: (show: boolean) => void;
  favoritesCount: number;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  size,
  onSizeChange,
  strokeWidth,
  onStrokeWidthChange,
  viewMode,
  onViewModeChange,
  showFavorites,
  onShowFavoritesChange,
  favoritesCount
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-8"
    >
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-semibold text-white/90 flex items-center">
            <div className="w-1 h-4 gradient-primary rounded-full mr-3" />
            View
          </h3>
          <div className="flex items-center space-x-1 glass-card rounded-xl p-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-lg transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'gradient-primary text-white glow-primary'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-lg transition-all duration-200 ${
                viewMode === 'list'
                  ? 'gradient-primary text-white glow-primary'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              <List className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onShowFavoritesChange(!showFavorites)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
            showFavorites
              ? 'gradient-primary text-white glow-primary shadow-lg'
              : 'glass-card glass-card-hover text-white/60 hover:text-white/80'
          }`}
        >
          <div className="flex items-center space-x-3">
            <Heart className="w-4 h-4" fill={showFavorites ? 'currentColor' : 'none'} />
            <span>Favorites</span>
          </div>
          <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
            {favoritesCount}
          </span>
        </motion.button>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-white/90 mb-6 flex items-center">
          <div className="w-1 h-4 gradient-primary rounded-full mr-3" />
          <Sliders className="w-4 h-4 mr-2" />
          Controls
        </h3>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-medium text-white/70">Size</label>
              <span className="text-xs text-white/50 bg-white/5 px-2 py-1 rounded-md">
                {size}px
              </span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="16"
                max="80"
                value={size}
                onChange={(e) => onSizeChange(Number(e.target.value))}
                className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer slider-track"
                style={{
                  '--progress': `${((size - 16) / (80 - 16)) * 100}%`
                } as React.CSSProperties}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-medium text-white/70">Stroke</label>
              <span className="text-xs text-white/50 bg-white/5 px-2 py-1 rounded-md">
                {strokeWidth}px
              </span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="0.5"
                max="4"
                step="0.5"
                value={strokeWidth}
                onChange={(e) => onStrokeWidthChange(Number(e.target.value))}
                className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer slider-track"
                style={{
                  '--progress': `${((strokeWidth - 0.5) / (4 - 0.5)) * 100}%`
                } as React.CSSProperties}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};