
import React from 'react';
import { X, Heart, Trash2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FavoritesPanel = ({ isOpen, onClose, favorites, onRemove, onOpenItem }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl z-[60] p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Heart className="w-6 h-6 text-pink-500 fill-current" />
                Favorites
              </h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {favorites.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-500">No favorites yet. Start exploring!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {favorites.map((item) => (
                  <div key={item.id} className="p-4 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-4 group">
                    <div className="flex-grow">
                      <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">{item.type}</p>
                      <p className="text-slate-800 dark:text-slate-200 line-clamp-2 text-sm">
                        {item.type === 'fact' ? item.text : (item.name || item.title || 'Random Image')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                       <button 
                        onClick={() => onOpenItem(item)}
                        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onRemove(item)}
                        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FavoritesPanel;
