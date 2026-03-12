
import React from 'react';
import { X, History, Clock, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDate } from '../../utils/helpers';

const HistoryPanel = ({ isOpen, onClose, history, onOpenItem }) => {
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
            className="fixed right-0 top-0 h-full w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl z-[60] p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <History className="w-6 h-6 text-blue-500" />
                History
              </h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {history.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-500">Your recent activity will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-slate-800 transition-colors"
                    onClick={() => onOpenItem(item)}
                  >
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">{item.type}</p>
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(item.timestamp)}
                        </span>
                      </div>
                      <p className="text-slate-200 line-clamp-1 text-sm">
                        {item.type === 'fact' ? item.text : (item.name || item.title || 'Random Discovery')}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500" />
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

export default HistoryPanel;
