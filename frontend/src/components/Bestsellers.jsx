import React from 'react';
import { ArrowRight } from 'lucide-react';
import BookCard from './BookCard';

export default function Bestsellers({ books, onExploreAll }) {
  return (
    <section id="bestsellers-section" className="py-12 sm:py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching reference image */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-stone-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight">
              BESTSELLERS
            </h2>
            <p className="text-xs text-stone-500 font-sans mt-0.5">
              Acclaimed masterworks cherished by scholars and avid readers
            </p>
          </div>

          <button
            onClick={onExploreAll}
            className="group flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-royal-emerald-900 hover:text-royal-gold-600 transition-colors"
          >
            <span>VIEW ALL BESTSELLERS</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Bestseller Grid (6 columns on desktop matching reference image) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>

      </div>
    </section>
  );
}
