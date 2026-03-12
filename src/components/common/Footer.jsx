
import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-12 py-8 text-center text-slate-500 text-sm border-t border-slate-800">
      <p>Built using public APIs</p>
      <div className="flex justify-center gap-4 mt-2">
        <a href="https://uselessfacts.jsph.pl/" target="_blank" rel="noreferrer" className="hover:text-purple-400">Facts</a>
        <a href="https://dog.ceo/dog-api/" target="_blank" rel="noreferrer" className="hover:text-purple-400">Dog CEO</a>
        <a href="https://restcountries.com/" target="_blank" rel="noreferrer" className="hover:text-purple-400">Rest Countries</a>
        <a href="https://api.nasa.gov/" target="_blank" rel="noreferrer" className="hover:text-purple-400">NASA</a>
      </div>
    </footer>
  );
};

export default Footer;
