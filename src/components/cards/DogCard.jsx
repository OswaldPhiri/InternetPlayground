
import React, { useState, useEffect } from 'react';
import { RefreshCcw, Heart, Share2, Download, Dog } from 'lucide-react';
import { getRandomDog } from '../../services/api';
import { generateShareLink, copyToClipboard } from '../../utils/helpers';
import { toggleFavorite, appendToHistory } from '../../utils/storage';
import Skeleton from '../feedback/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const DogCard = ({ initialData }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchDog = async () => {
    setLoading(true);
    try {
      const dog = await getRandomDog();
      setData(dog);
      appendToHistory(dog);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialData) fetchDog();
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

  const handleDownload = async () => {
    if (!data) return;
    try {
      const response = await fetch(data.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `random-dog-${data.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error('Download failed', e);
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
            <Dog className="w-5 h-5 text-blue-500 dark:text-blue-400" />
            Random Dog
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Show me a dog</p>
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

      <div className="flex-grow flex items-center justify-center min-h-[200px] relative overflow-hidden rounded-xl bg-slate-200/50 dark:bg-slate-800/50">
        {loading ? (
          <Skeleton className="absolute inset-0 w-full h-full" />
        ) : (
          <AnimatePresence mode='wait'>
            <motion.img 
              key={data?.url}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              src={data?.url} 
              alt="Random dog"
              className="w-full h-full object-cover aspect-video cursor-pointer"
              onClick={() => navigate('/dog')}
            />
          </AnimatePresence>
        )}
      </div>

      <div className="mt-6 flex gap-3">
        <button 
          onClick={fetchDog}
          disabled={loading}
          className="flex-grow bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Show me a dog
        </button>
        <button 
          onClick={handleDownload}
          className="p-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-colors"
          title="Download image"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default DogCard;
