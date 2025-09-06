import { useState, useMemo, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { FilterPanel } from './components/FilterPanel';
import { ControlPanel } from './components/ControlPanel';
import { IconGrid } from './components/IconGrid';
import { mockIcons } from './data/mockIcons';
import { mockIconsDuo } from './data/mockIconsDuo';
import { IconWeight, ViewMode } from './types/icon';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWeight, setSelectedWeight] = useState<IconWeight>('regular');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [iconStyle, setIconStyle] = useState<'all' | 'regular' | 'duotone'>('all');
  const [size, setSize] = useState(32);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        searchInput?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Combine both icon sets
  const allIcons = useMemo(() => {
    return [...mockIcons, ...mockIconsDuo];
  }, []);

  // Get icons based on style filter
  const getIconsByStyle = useMemo(() => {
    switch (iconStyle) {
      case 'regular':
        return mockIcons;
      case 'duotone':
        return mockIconsDuo;
      case 'all':
      default:
        return allIcons;
    }
  }, [iconStyle, allIcons]);

  const categories = useMemo(() => {
    return Array.from(new Set(allIcons.map(icon => icon.category)));
  }, [allIcons]);

  const filteredIcons = useMemo(() => {
    let filtered = getIconsByStyle;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(icon => 
        icon.name.toLowerCase().includes(query) ||
        icon.category.toLowerCase().includes(query) ||
        icon.keywords.some(keyword => keyword.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(icon => icon.category === selectedCategory);
    }

    // Filter by favorites
    if (showFavorites) {
      filtered = filtered.filter(icon => favorites.has(icon.name));
    }

    // Filter by weight availability (only for regular icons that have weights)
    if (iconStyle === 'regular' || iconStyle === 'all') {
      filtered = filtered.filter(icon => {
        // If icon has weights property, check if it includes the selected weight
        // If no weights property (duotone icons), include them when selectedWeight is 'regular'
        return !('weights' in icon) || (icon as any).weights?.includes(selectedWeight) || selectedWeight === 'regular';
      });
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedWeight, showFavorites, favorites, getIconsByStyle, iconStyle]);

  const handleFavorite = (iconName: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(iconName)) {
      newFavorites.delete(iconName);
    } else {
      newFavorites.add(iconName);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="min-h-screen bg-[#212121] text-white">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
          },
        }}
      />
      <Header />
      
      <main className="max-w-[1600px] mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            <FilterPanel
              selectedWeight={selectedWeight}
              onWeightChange={setSelectedWeight}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={categories}
              iconStyle={iconStyle}
              onIconStyleChange={setIconStyle}
            />
            <ControlPanel
              size={size}
              onSizeChange={setSize}
              strokeWidth={strokeWidth}
              onStrokeWidthChange={setStrokeWidth}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              showFavorites={showFavorites}
              onShowFavoritesChange={setShowFavorites}
              favoritesCount={favorites.size}
            />
          </div>

          {/* Main Content */}
          <div className="xl:col-span-4 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1 max-w-lg">
                  <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search icons..."
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-white/40">
                    {filteredIcons.length} icon{filteredIcons.length !== 1 ? 's' : ''}
                    {iconStyle !== 'all' && ` (${iconStyle})`}
                    {showFavorites && ' in favorites'}
                  </div>
                </div>
              </div>
            </motion.div>

            <IconGrid
              icons={filteredIcons}
              size={size}
              weight={selectedWeight}
              strokeWidth={strokeWidth}
              favorites={favorites}
              onFavorite={handleFavorite}
              viewMode={viewMode}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="border-t border-white/[0.05] mt-24 py-12"
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-4">
                Get Started
              </h3>
              <p className="text-white/50 text-sm max-w-2xl mx-auto mb-8">
                Install the package and start using beautiful, customizable icons in your React projects
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="glass-card rounded-2xl p-6 text-left">
                <h4 className="text-indigo-400 font-semibold mb-3 text-sm">
                  Installation
                </h4>
                <code className="text-white/70 text-sm font-mono bg-white/[0.02] px-3 py-2 rounded-lg block">
                  npm install personal-icons
                </code>
              </div>
              
              <div className="glass-card rounded-2xl p-6 text-left">
                <h4 className="text-indigo-400 font-semibold mb-3 text-sm">
                  Usage
                </h4>
                <code className="text-white/70 text-sm font-mono bg-white/[0.02] px-3 py-2 rounded-lg block">
                  {`import { Home } from "personal-icons";`}<br />
                  {`<Home size={24} weight="bold" />`}
                </code>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;