
import React, { useState, useEffect } from 'react';
import { RefreshCcw, Heart, Copy, Share2, Quote, Sparkles } from 'lucide-react';
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
      className="premium-card premium-card-hover group p-6 flex flex-col h-full rounded-[2rem] border-purple-500/0 hover:border-purple-500/20"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-2xl group-hover:bg-purple-500 group-hover:text-white transition-all duration-500">
            <Quote className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-800 dark:text-white leading-tight uppercase italic tracking-tighter">
              Curio Archive
            </h3>
            <p className="text-purple-500 font-bold text-[10px] uppercase tracking-[0.2em]">Factoid Database</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={handleFavorite} className={`p-2.5 rounded-xl transition-all ${isFavorite ? 'text-pink-500 bg-pink-500/10 scale-110' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-pink-500'}`}>
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button onClick={handleShare} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-blue-500 transition-all">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div 
        className="flex-grow flex items-center justify-center min-h-[240px] px-4 cursor-pointer relative group/fact overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border border-slate-100 dark:border-white/5"
        onClick={() => navigate('/fact')}
      >
        <div className="absolute top-4 right-4 text-purple-500/10 dark:text-purple-500/5 group-hover/fact:scale-110 transition-transform duration-700">
          <Sparkles className="w-24 h-24" />
        </div>
        
        {loading ? (
          <div className="w-full space-y-3 px-8">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-[90%] rounded-md" />
            <Skeleton className="h-4 w-[70%] rounded-md" />
          </div>
        ) : (
          <AnimatePresence mode='wait'>
            <motion.div
              key={data?.id || 'fact-content'}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="text-center relative z-10"
            >
              <p className="text-slate-700 dark:text-slate-200 text-xl md:text-2xl font-medium leading-relaxed italic">
                "{data?.text}"
              </p>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <div className="mt-8 flex gap-3">
        <button 
          onClick={fetchFact}
          disabled={loading}
          className="flex-grow btn-premium bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-purple-600 dark:hover:bg-purple-50 disabled:opacity-50"
        >
          <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Tell me something
        </button>
        <button 
          onClick={handleCopy}
          className="p-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-[1.25rem] transition-all hover:scale-110"
          title="Copy contents"
        >
          <Copy className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default FactCard;
