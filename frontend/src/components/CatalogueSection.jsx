import React from 'react';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import BookCard from './BookCard';

export default function CatalogueSection({
  books,
  selectedCategory,
  onSelectCategory,
  searchTerm,
  onSearchChange,
  sortOption,
  onSortChange
}) {
  return (
    <section id="catalogue-section" className="py-14 bg-[#FAF7F2] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-royal-gold-700 text-xs font-bold uppercase tracking-widest">
              <Filter className="w-3.5 h-3.5" />
              <span>THE IMPERIAL REPOSITORY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
              Explore Our Literary Treasury
            </h2>
            <p className="text-xs text-stone-500 font-sans mt-0.5">
              Filter by sacred genre, author, or language
            </p>
          </div>

          {/* Controls: Search & Sort */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Active category chip if filtered */}
            {selectedCategory !== 'All' && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-royal-gold-100 text-royal-emerald-950 rounded-full text-xs font-semibold border border-royal-gold-400">
                <span>Category: {selectedCategory}</span>
                <button 
                  onClick={() => onSelectCategory('All')}
                  className="hover:text-red-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Sort selector */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-stone-300 shadow-sm text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-royal-gold-700" />
              <label htmlFor="sort-select" className="text-stone-500 font-medium">Sort:</label>
              <select
                id="sort-select"
                value={sortOption}
                onChange={(e) => onSortChange(e.target.value)}
                className="bg-transparent font-semibold text-stone-800 focus:outline-none cursor-pointer"
              >
                <option value="featured">Royal Featured</option>
                <option value="rating">Highest Rated (★ 5.0)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        {books.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-stone-200 p-8">
            <h3 className="font-serif text-lg font-bold text-stone-800">
              No matching titles found in this archive
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Try adjusting your search criteria or reset filters to browse all treasures.
            </p>
            <button
              onClick={() => {
                onSelectCategory('All');
                onSearchChange('');
              }}
              className="mt-4 px-4 py-2 bg-royal-emerald-900 text-royal-gold-300 rounded text-xs font-bold uppercase tracking-wider hover:bg-royal-emerald-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
