
import React from 'react';
import { Moon, Sun, Heart, History, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = ({ darkMode, setDarkMode, onOpenFavorites, onOpenHistory }) => {
  return (
    <header className="sticky top-0 z-50 px-4 pt-6 pb-2">
      <div className="max-w-7xl mx-auto glass-panel rounded-3xl p-3 flex items-center justify-between shadow-2xl shadow-slate-200/50 dark:shadow-none">
        <div className="flex items-center gap-3 px-2">
          <motion.div 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="p-2.5 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-2xl shadow-lg shadow-purple-500/30"
          >
            <Sparkles className="text-white w-6 h-6" />
          </motion.div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-purple-900 to-blue-900 dark:from-white dark:via-purple-200 dark:to-blue-100 uppercase italic">
              Playground
            </h1>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none">
              v2.0 Premium
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 md:gap-3">
          <nav className="flex items-center gap-1 bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-2xl">
            <button 
              onClick={onOpenHistory}
              className="p-2.5 rounded-xl hover:bg-white dark:hover:bg-slate-700 transition-all text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white group"
              title="Activity History"
            >
              <History className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button 
              onClick={onOpenFavorites}
              className="p-2.5 rounded-xl hover:bg-white dark:hover:bg-slate-700 transition-all text-slate-500 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 group"
              title="Favorites"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <div className="w-px h-6 bg-slate-200 dark:bg-white/10 mx-1" />
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl hover:bg-white dark:hover:bg-slate-700 transition-all text-slate-500 dark:text-slate-400 hover:text-yellow-600 dark:hover:text-yellow-400 group"
            >
              {darkMode ? <Sun className="w-5 h-5 group-hover:rotate-45 transition-transform" /> : <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform" />}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
