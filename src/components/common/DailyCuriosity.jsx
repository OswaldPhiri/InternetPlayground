
import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCcw } from 'lucide-react';
import { getRandomFact, getRandomDog, getRandomCountry, getSpaceImage } from '../../services/api';
import { getFromStorage, saveToStorage, STORAGE_KEY_CURIOSITY } from '../../utils/storage';
import Skeleton from '../feedback/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';

const DailyCuriosity = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCuriosity = async () => {
    setLoading(true);
    const apis = [getRandomFact, getRandomDog, getRandomCountry, getSpaceImage];
    const randomApi = apis[Math.floor(Math.random() * apis.length)];
    try {
      const result = await randomApi();
      setData(result);
      saveToStorage(STORAGE_KEY_CURIOSITY, result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cached = getFromStorage(STORAGE_KEY_CURIOSITY);
    if (cached) {
      setData(cached);
      setLoading(false);
    } else {
      fetchCuriosity();
    }
  }, []);

  return (
    <div className="mx-4 mb-8">
      <div className="glass-card p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 transform translate-x-4 -translate-y-4 opacity-10">
          <Sparkles className="w-32 h-32 text-white" />
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              Daily Curiosity
            </h2>
            <p className="text-slate-400 mb-4">Something new to learn every 24 hours.</p>
            
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : (
              <AnimatePresence mode='wait'>
                <motion.div
                  key={data?.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-slate-900/40 p-4 rounded-xl border border-white/5"
                >
                  <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">{data?.type}</p>
                  <p className="text-lg text-slate-100 italic">
                    {data?.type === 'fact' ? data.text : (data?.title || data?.name || "Check out this finding!")}
                  </p>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
          
          <div className="w-full md:w-48 flex-shrink-0 flex items-center justify-center">
             {loading ? (
               <Skeleton className="h-32 w-32 rounded-xl" />
             ) : (
               data?.url || data?.flag ? (
                 <img src={data.url || data.flag} alt="Curiosity" className="h-32 w-full object-cover rounded-xl shadow-lg" />
               ) : (
                 <div className="h-32 w-full flex items-center justify-center bg-slate-800 rounded-xl">
                   <Sparkles className="w-12 h-12 text-slate-600" />
                 </div>
               )
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyCuriosity;
