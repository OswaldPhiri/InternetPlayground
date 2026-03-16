import React from 'react';
import CountryCard from '../components/cards/CountryCard';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CountryPage = () => {
  return (
    <main className="max-w-3xl mx-auto px-4 pb-20 pt-8 flex flex-col min-h-[80vh]">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-emerald-500 transition-colors gap-2 font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
      <div className="flex-grow">
        <CountryCard />
      </div>
    </main>
  );
};

export default CountryPage;
