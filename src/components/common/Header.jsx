
import React from 'react';
import { Moon, Sun, Heart, History, Globe } from 'lucide-react';

const Header = ({ darkMode, setDarkMode, onOpenFavorites, onOpenHistory }) => {
  return (
    <header className="sticky top-0 z-50 glass-card mx-4 my-4 p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl shadow-lg shadow-purple-500/20">
          <Globe className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Internet Playground
          </h1>
          <p className="text-xs text-slate-400 hidden sm:block">Explore random things from the internet</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={onOpenHistory}
          className="p-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
          title="Activity History"
        >
          <History className="w-5 h-5" />
        </button>
        <button 
          onClick={onOpenFavorites}
          className="p-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-pink-500"
          title="Favorites"
        >
          <Heart className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-yellow-400"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
};

export default Header;
