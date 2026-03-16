
import React, { useState, useEffect } from 'react';
import { RefreshCcw, Heart, Copy, Share2, Quote } from 'lucide-react';
import { getRandomFact } from '../../services/api';
import { copyToClipboard, generateShareLink } from '../../utils/helpers';
import { toggleFavorite, appendToHistory } from '../../utils/storage';
import Skeleton from '../feedback/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FactCard = ({ initialData }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchFact = async () => {
    setLoading(true);
    try {
      const fact = await getRandomFact();
      setData(fact);
      appendToHistory(fact);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialData) fetchFact();
  }, [initialData]);

  const handleCopy = () => {
    if (data) copyToClipboard(data.text);
  };

  const handleFavorite = () => {
    if (data) {
      const fav = toggleFavorite(data);
      setIsFavorite(fav);
    }
  };

  const handleShare = () => {
    if (data) {
      const link = generateShareLink(data);
      copyToClipboard(link);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card card-hover p-6 flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Quote className="w-5 h-5 text-purple-500 dark:text-purple-400" />
            Random Fact
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Tell me something useless</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleFavorite} className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-pink-500 bg-pink-500/10' : 'text-slate-500 dark:text-slate-400 hover:text-pink-500'}`}>
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button onClick={handleShare} className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div 
        className="flex-grow flex items-center justify-center min-h-[120px] cursor-pointer"
        onClick={() => navigate('/fact')}
      >
        {loading ? (
          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[70%]" />
          </div>
        ) : (
          <AnimatePresence mode='wait'>
            <motion.p 
              key={data?.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-slate-800 dark:text-slate-200 text-lg leading-relaxed italic"
            >
              "{data?.text}"
            </motion.p>
          </AnimatePresence>
        )}
      </div>

      <div className="mt-6 flex gap-3">
        <button 
          onClick={fetchFact}
          disabled={loading}
          className="flex-grow bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-lg shadow-purple-900/20 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Tell me something useless
        </button>
        <button 
          onClick={handleCopy}
          className="p-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-colors"
          title="Copy to clipboard"
        >
          <Copy className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default FactCard;
