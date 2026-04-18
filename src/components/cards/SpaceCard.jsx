
import React, { useState, useEffect } from 'react';
import { RefreshCcw, Heart, Share2, Rocket, Telescope, Compass } from 'lucide-react';
import { getSpaceImage } from '../../services/api';
import { generateShareLink, copyToClipboard } from '../../utils/helpers';
import { toggleFavorite, appendToHistory } from '../../utils/storage';
import Skeleton from '../feedback/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SpaceCard = ({ initialData }) => {
  const navigate = useNavigate();
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
      className="premium-card premium-card-hover group p-6 flex flex-col h-full rounded-[2rem] border-cyan-500/0 hover:border-cyan-500/20"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 rounded-2xl group-hover:bg-cyan-500 group-hover:text-white transition-all duration-500">
            <Rocket className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-800 dark:text-white leading-tight uppercase italic tracking-tighter">
              Galactic Hub
            </h3>
            <p className="text-cyan-500 font-bold text-[10px] uppercase tracking-[0.2em]">Deep Space Data</p>
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

      <div className="flex-grow">
        {loading ? (
          <div className="space-y-6">
            <Skeleton className="h-48 w-full rounded-2xl" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-[80%] rounded-md" />
            </div>
          </div>
        ) : (
          <AnimatePresence mode='wait'>
            <motion.div
              key={data?.id || 'space-content'}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
            >
              <div 
                className="relative h-48 w-full rounded-[1.5rem] overflow-hidden mb-6 bg-slate-900 shadow-2xl group/space cursor-pointer"
                onClick={() => navigate('/space')}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60 z-10" />
                <img src={data?.url} alt={data?.title} className="w-full h-full object-cover group-hover/space:scale-110 transition-transform duration-[2000ms]" />
                <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-cyan-400 bg-cyan-950/80 px-2 py-1 rounded-md border border-cyan-500/30 backdrop-blur-sm">Astro Photo</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Telescope className="w-4 h-4 text-cyan-500" />
                <h4 className="text-xl font-black text-slate-800 dark:text-white uppercase italic tracking-tight line-clamp-1">{data?.title}</h4>
              </div>

              <div className="relative">
                <div className="absolute -left-2 top-0 bottom-0 w-1 bg-cyan-500/20 rounded-full" />
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed line-clamp-3 pl-3">
                  {data?.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {!loading && (
        <div className="mt-8">
          <button 
            onClick={fetchSpace}
            disabled={loading}
            className="w-full btn-premium bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-cyan-600 dark:hover:bg-cyan-50 transition-all gap-2"
          >
            <Compass className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Launch Mission
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default SpaceCard;
