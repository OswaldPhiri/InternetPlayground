
import React, { useState, useEffect } from 'react';
import { RefreshCcw, Heart, Share2, MapPin, Globe, Users, Landmark, Navigation2 } from 'lucide-react';
import { getRandomCountry } from '../../services/api';
import { generateShareLink, copyToClipboard } from '../../utils/helpers';
import { toggleFavorite, appendToHistory } from '../../utils/storage';
import Skeleton from '../feedback/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CountryCard = ({ initialData }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchCountry = async () => {
    setLoading(true);
    try {
      const country = await getRandomCountry();
      setData(country);
      appendToHistory(country);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialData) fetchCountry();
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
      className="premium-card premium-card-hover group p-6 flex flex-col h-full rounded-[2rem] border-emerald-500/0 hover:border-emerald-500/20"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-800 dark:text-white leading-tight uppercase italic tracking-tighter">
              World Atlas
            </h3>
            <p className="text-emerald-500 font-bold text-[10px] uppercase tracking-[0.2em]">Global Directory</p>
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
            <Skeleton className="h-32 w-full rounded-2xl" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-3/4 rounded-lg" />
              <Skeleton className="h-4 w-1/2 rounded-lg" />
            </div>
          </div>
        ) : (
          <AnimatePresence mode='wait'>
            <motion.div
              key={data?.id || 'country-content'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div 
                className="relative h-40 w-full rounded-[1.5rem] overflow-hidden mb-6 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-white/5 cursor-pointer group/flag flex items-center justify-center p-4 shadow-inner"
                onClick={() => navigate('/country')}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent opacity-0 group-hover/flag:opacity-100 transition-opacity" />
                <img src={data?.flag} alt={data?.name} className="h-full object-contain group-hover/flag:scale-110 transition-transform duration-700 drop-shadow-2xl" />
              </div>

              <h4 className="text-2xl font-black text-slate-800 dark:text-white mb-6 uppercase italic tracking-tight">{data?.name}</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-2 mb-1">
                    <Landmark className="w-3.5 h-3.5 text-emerald-500" />
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">Capital</p>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 font-bold truncate">{data?.capital || 'N/A'}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-2 mb-1">
                    <Navigation2 className="w-3.5 h-3.5 text-emerald-500" />
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">Region</p>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 font-bold truncate">{data?.region}</p>
                </div>
                <div className="col-span-2 bg-emerald-500/5 dark:bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-500" />
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">Population</p>
                    </div>
                    <p className="text-emerald-600 dark:text-emerald-400 text-lg font-black tracking-tighter">
                      {data?.population.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <a 
                href={data?.map} 
                target="_blank" 
                rel="noreferrer"
                className="w-full btn-premium mt-6 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-white hover:bg-emerald-600 transition-all group/map"
              >
                <MapPin className="w-4 h-4 group-hover/map:animate-bounce" />
                Open Global Map
              </a>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {!loading && (
        <div className="mt-6">
          <button 
            onClick={fetchCountry}
            disabled={loading}
            className="w-full btn-premium bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-emerald-600 dark:hover:bg-emerald-50 transition-all gap-2"
          >
            <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            New Destination
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default CountryCard;
