
import React, { useState, useEffect, useRef } from 'react';
import FactCard from '../components/cards/FactCard';
import DogCard from '../components/cards/DogCard';
import CountryCard from '../components/cards/CountryCard';
import SpaceCard from '../components/cards/SpaceCard';
import DailyCuriosity from '../components/common/DailyCuriosity';
import { Sparkles, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const [surpriseKey, setSurpriseKey] = useState(0);

  const handleSurpriseMe = () => {
    setSurpriseKey(prev => prev + 1);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 pb-20">
      <DailyCuriosity />

      <div className="flex justify-between items-center mx-4 mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Explore Dashboard</h2>
        <button 
          onClick={handleSurpriseMe}
          className="bg-white/50 hover:bg-white/60 dark:bg-white/10 dark:hover:bg-white/20 text-slate-900 dark:text-white font-bold py-3 px-8 rounded-2xl backdrop-blur-md border border-slate-300 dark:border-white/20 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 group shadow-xl"
        >
          <Sparkles className="w-5 h-5 text-yellow-400 group-hover:rotate-12 transition-transform" />
          Surprise Me
          <RefreshCw className="w-4 h-4 ml-2 opacity-50" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        <FactCard key={`fact-${surpriseKey}`} />
        <DogCard key={`dog-${surpriseKey}`} />
        <CountryCard key={`country-${surpriseKey}`} />
        <SpaceCard key={`space-${surpriseKey}`} />
      </div>
    </main>
  );
};

export default Home;
