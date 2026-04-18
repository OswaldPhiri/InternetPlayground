
import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCcw, Zap } from 'lucide-react';
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
    <div className="mx-0 mb-16">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="premium-card p-1 overflow-hidden relative"
      >
        <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-[22px] p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full" />
          
          <div className="flex-grow relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-yellow-400/10 rounded-lg">
                <Sparkles className="w-5 h-5 text-yellow-500" />
              </div>
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Daily Insight
              </h2>
            </div>
            
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-3/4 rounded-lg" />
                <Skeleton className="h-6 w-1/2 rounded-lg" />
              </div>
            ) : (
              <AnimatePresence mode='wait'>
                <motion.div
                  key={data?.id || 'curiosity'}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <p className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white leading-tight">
                    {data?.type === 'fact' ? data.text : (data?.title || data?.name || "Check out this finding!")}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 dark:bg-white/10 text-white dark:text-slate-200 rounded-full text-[10px] font-black uppercase tracking-tighter">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    Explorer Mode: {data?.type || 'Random'}
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
          
          <div className="w-full md:w-64 flex-shrink-0 relative z-10">
             {loading ? (
               <Skeleton className="h-48 w-full rounded-2xl" />
             ) : (
               <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group"
               >
                 <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-[20px] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                 {data?.url || data?.flag ? (
                   <img 
                    src={data.url || data.flag} 
                    alt="Curiosity" 
                    className="h-48 w-full object-cover rounded-[18px] shadow-2xl relative" 
                   />
                 ) : (
                   <div className="h-48 w-full flex items-center justify-center bg-slate-200 dark:bg-slate-800 rounded-[18px] relative">
                     <Sparkles className="w-12 h-12 text-slate-400 dark:text-slate-600" />
                   </div>
                 )}
               </motion.div>
             )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DailyCuriosity;
