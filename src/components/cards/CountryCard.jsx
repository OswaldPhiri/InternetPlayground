
import React, { useState, useEffect } from 'react';
import { RefreshCcw, Heart, Share2, MapPin, Globe } from 'lucide-react';
import { getRandomCountry } from '../../services/api';
import { generateShareLink, copyToClipboard } from '../../utils/helpers';
import { toggleFavorite, appendToHistory } from '../../utils/storage';
import Skeleton from '../feedback/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';

const CountryCard = ({ initialData }) => {
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card card-hover p-6 flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-400" />
            Random Country
          </h3>
          <p className="text-slate-400 text-sm">Discover a country</p>
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
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : (
          <AnimatePresence mode='wait'>
            <motion.div
              key={data?.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative h-32 w-full rounded-xl overflow-hidden mb-4 bg-slate-800/50">
                <img src={data?.flag} alt={data?.name} className="w-full h-full object-contain p-2" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">{data?.name}</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-slate-400">Capital</p>
                  <p className="text-slate-200">{data?.capital || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-slate-400">Region</p>
                  <p className="text-slate-200">{data?.region}</p>
                </div>
                <div>
                  <p className="text-slate-400">Population</p>
                  <p className="text-slate-200">{data?.population.toLocaleString()}</p>
                </div>
              </div>
              <a 
                href={data?.map} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-sm mt-4 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                View on Google Maps
              </a>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <div className="mt-6">
        <button 
          onClick={fetchCountry}
          disabled={loading}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-lg shadow-emerald-900/20 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Discover a country
        </button>
      </div>
    </motion.div>
  );
};

export default CountryCard;
