
import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-20 py-12 px-4 border-t border-slate-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          <a href="https://uselessfacts.jsph.pl/" target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-500 hover:text-purple-500 transition-colors">Facts Source</a>
          <a href="https://dog.ceo/dog-api/" target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-500 hover:text-blue-500 transition-colors">Dog API</a>
          <a href="https://restcountries.com/" target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-500 hover:text-green-500 transition-colors">Countries API</a>
          <a href="https://api.nasa.gov/" target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-500 hover:text-cyan-500 transition-colors">NASA Space</a>
        </div>
        <p className="text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">
          Built with Public APIs & Love • 2026
        </p>
      </div>
    </footer>
  );
};

export default Footer;
