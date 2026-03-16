import React from 'react';
import FactCard from '../components/cards/FactCard';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const FactPage = () => {
  return (
    <main className="max-w-3xl mx-auto px-4 pb-20 pt-8 flex flex-col min-h-[80vh]">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-purple-500 transition-colors gap-2 font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
      <div className="flex-grow">
        <FactCard />
      </div>
    </main>
  );
};

export default FactPage;
