
import React, { useState, useEffect } from 'react';
import { RefreshCcw, Heart, Share2, Rocket } from 'lucide-react';
import { getSpaceImage } from '../../services/api';
import { generateShareLink, copyToClipboard } from '../../utils/helpers';
import { toggleFavorite, appendToHistory } from '../../utils/storage';
import Skeleton from '../feedback/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';

const SpaceCard = ({ initialData }) => {
  const [data, setData] = useState(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchSpace = async () => {
    setLoading(true);
    try {
      const space = await getSpaceImage();
      setData(space);
      appendToHistory(space);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialData) fetchSpace();
  }, [initialData]);

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
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Rocket className="w-5 h-5 text-indigo-400" />
            Space Image
          </h3>
          <p className="text-slate-400 text-sm">Explore space</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleFavorite} className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-pink-500 bg-pink-500/10' : 'text-slate-400 hover:text-pink-500'}`}>
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button onClick={handleShare} className="p-2 rounded-full text-slate-400 hover:text-blue-400 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-grow">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : (
          <AnimatePresence mode='wait'>
            <motion.div
              key={data?.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative h-40 w-full rounded-xl overflow-hidden mb-4 bg-slate-800/50">
                <img src={data?.url} alt={data?.title} className="w-full h-full object-cover" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2 line-clamp-1">{data?.title}</h4>
              <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">
                {data?.description}
              </p>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <div className="mt-6">
        <button 
          onClick={fetchSpace}
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-lg shadow-indigo-900/20 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Explore space
        </button>
      </div>
    </motion.div>
  );
};

export default SpaceCard;
