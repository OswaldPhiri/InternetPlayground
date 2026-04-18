
import React, { useState } from 'react';
import FactCard from '../components/cards/FactCard';
import DogCard from '../components/cards/DogCard';
import CountryCard from '../components/cards/CountryCard';
import SpaceCard from '../components/cards/SpaceCard';
import DailyCuriosity from '../components/common/DailyCuriosity';
import { Sparkles, RefreshCw, Zap, Rocket, Globe, Dog } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const [surpriseKey, setSurpriseKey] = useState(0);

  const handleSurpriseMe = () => {
    setSurpriseKey(prev => prev + 1);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 pb-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-black uppercase tracking-[0.2em]"
        >
          The Ultimate API Showcase
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black mb-6 tracking-tight dark:text-white leading-[1.1]"
        >
          Explore the <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 animate-gradient-x">
            Digital Universe.
          </span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl text-lg text-slate-500 dark:text-slate-400 mb-10 leading-relaxed"
        >
          Discover random facts, cosmic wonders, adorable companions, and global insights—all powered by the world's most fascinating public APIs.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button 
            onClick={handleSurpriseMe}
            className="group relative px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold flex items-center gap-2 overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Sparkles className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
            <span className="relative z-10">Surprise Me</span>
            <RefreshCw className="w-4 h-4 ml-2 opacity-50 relative z-10 group-hover:animate-spin" />
          </button>
          
          <div className="flex -space-x-2">
            {[Rocket, Globe, Dog, Zap].map((Icon, i) => (
              <div key={i} className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-50 dark:border-slate-900 flex items-center justify-center shadow-lg">
                <Icon className="w-5 h-5 text-slate-400" />
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <DailyCuriosity />

      <div className="flex justify-between items-end mx-4 mb-8">
        <div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic">
            Dashboard
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Real-time API integrations</p>
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-8 px-0"
      >
        <motion.div variants={item}><FactCard key={`fact-${surpriseKey}`} /></motion.div>
        <motion.div variants={item}><DogCard key={`dog-${surpriseKey}`} /></motion.div>
        <motion.div variants={item}><CountryCard key={`country-${surpriseKey}`} /></motion.div>
        <motion.div variants={item}><SpaceCard key={`space-${surpriseKey}`} /></motion.div>
      </motion.div>
    </main>
  );
};

export default Home;
