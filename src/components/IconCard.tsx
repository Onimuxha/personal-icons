import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, Heart, Check } from 'lucide-react';
import { IconData } from '../types/icon';
import toast from 'react-hot-toast';

interface IconCardProps {
  icon: IconData;
  size: number;
  onFavorite: (iconName: string) => void;
  isFavorited: boolean;
  isListView?: boolean;
}

export const IconCard: React.FC<IconCardProps> = ({
  icon,
  size,
  onFavorite,
  isFavorited,
  isListView = false
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    const code = `import { ${icon.name} } from "personal-icons";

<${icon.name} size={${size}} />`;

    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    toast.success(`${icon.name} copied!`, {
      style: {
        background: 'rgba(0, 0, 0, 0.9)',
        color: '#fff',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        fontSize: '14px',
      },
    });
  };

  const handleDownloadSVG = () => {
    const svgBlob = new Blob([icon.svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${icon.name.toLowerCase()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success(`${icon.name}.svg downloaded!`, {
      style: {
        background: 'rgba(0, 0, 0, 0.9)',
        color: '#fff',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        fontSize: '14px',
      },
    });
  };

  if (isListView) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        className="group glass-card glass-card-hover rounded-2xl p-4 transition-all duration-300"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="icon-preview p-3 group-hover:scale-105 transition-transform duration-300">
              <div
                className="text-white/80 group-hover:text-white transition-colors"
                style={{ width: size * 0.8, height: size * 0.8 }}
                dangerouslySetInnerHTML={{ __html: icon.svgContent }}
              />
            </div>
            <div>
              <h3 className="font-medium text-white group-hover:text-white/90 transition-colors">
                {icon.name}
              </h3>
              <p className="text-xs text-white/40 capitalize mt-0.5">
                {icon.category}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onFavorite(icon.name)}
              className={`p-2 rounded-xl transition-all duration-200 ${isFavorited
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                : 'hover:bg-white/[0.05] text-white/40 hover:text-red-400'
                }`}
            >
              <Heart className="w-4 h-4" fill={isFavorited ? 'currentColor' : 'none'} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCopyCode}
              className="p-2 hover:bg-white/[0.05] text-white/40 hover:text-indigo-400 rounded-xl transition-all duration-200"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDownloadSVG}
              className="p-2 hover:bg-white/[0.05] text-white/40 hover:text-emerald-400 rounded-xl transition-all duration-200"
            >
              <Download className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group glass-card glass-card-hover rounded-2xl p-6 transition-all duration-300 cursor-pointer"
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="icon-preview p-6 group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl" />
          <div
            className="text-white/70 group-hover:text-white transition-colors relative z-10"
            style={{ width: size, height: size }}
            dangerouslySetInnerHTML={{ __html: icon.svgContent }}
          />
        </div>

        <div className="text-center">
          <h3 className="font-medium text-white/90 group-hover:text-white transition-colors">
            {icon.name}
          </h3>
          <p className="text-xs text-white/40 capitalize mt-1">
            {icon.category}
          </p>
        </div>

        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onFavorite(icon.name)}
            className={`p-2.5 rounded-xl transition-all duration-200 ${isFavorited
              ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 glow-accent'
              : 'hover:bg-white/[0.05] text-white/40 hover:text-red-400'
              }`}
            title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className="w-4 h-4" fill={isFavorited ? 'currentColor' : 'none'} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCopyCode}
            className="p-2.5 hover:bg-white/[0.05] text-white/40 hover:text-indigo-400 rounded-xl transition-all duration-200"
            title="Copy React code"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDownloadSVG}
            className="p-2.5 hover:bg-white/[0.05] text-white/40 hover:text-emerald-400 rounded-xl transition-all duration-200"
            title="Download SVG"
          >
            <Download className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};