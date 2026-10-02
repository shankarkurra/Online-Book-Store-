import React from 'react';
import { Star, ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function BookCard({ book }) {
  const { addToCart, setActiveBookModal, formatPrice } = useCart();

  return (
    <div className="bg-white rounded-lg p-3 sm:p-4 border border-[#EBE4D5] hover:border-royal-gold-400/80 shadow-sm hover:shadow-royal transition-all duration-300 flex flex-col justify-between group relative">
      
      {/* Book Cover Container */}
      <div className="relative aspect-[1/1.45] w-full rounded overflow-hidden bg-stone-100 mb-3 shadow-inner">
        
        {/* Top Tag Badge (BEST SELLER / TOP RATED / NEW) */}
        {book.badge && (
          <div className="absolute top-2 left-2 z-10">
            <span className={`text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded shadow-sm ${
              book.badge === 'BEST SELLER' || book.badge === 'BESTSELLER'
                ? 'bg-amber-600 text-white'
                : book.badge === 'TOP RATED'
                ? 'bg-emerald-800 text-royal-gold-300'
                : book.badge === 'NEW' || book.badge === 'NEW RELEASE'
                ? 'bg-royal-gold-600 text-royal-emerald-950 font-black'
                : 'bg-royal-emerald-900 text-royal-gold-300'
            }`}>
              {book.badge}
            </span>
          </div>
        )}

        {/* Book Cover Image */}
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Quick View Hover Button */}
        <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <button
            onClick={() => setActiveBookModal(book)}
            className="px-3 py-1.5 bg-white/95 text-royal-emerald-950 text-xs font-bold tracking-wider uppercase rounded shadow-md hover:bg-royal-gold-400 transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>

      </div>

      {/* Book Metadata */}
      <div className="space-y-1 text-left flex-1 flex flex-col justify-between">
        <div>
          {/* Vernacular title teaser */}
          {book.vernacularTitle && (
            <p className="text-[10px] text-royal-gold-700 font-serif truncate">
              {book.vernacularTitle}
            </p>
          )}

          {/* Book Title */}
          <h3 
            onClick={() => setActiveBookModal(book)}
            className="font-serif text-sm sm:text-base font-bold text-stone-900 leading-snug line-clamp-1 hover:text-royal-emerald-900 cursor-pointer"
            title={book.title}
          >
            {book.title}
          </h3>

          {/* Author */}
          <p className="text-xs text-stone-500 font-sans truncate">
            {book.author}
          </p>

          {/* Star Ratings */}
          <div className="flex items-center gap-1 pt-1">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-500" />
              ))}
            </div>
            <span className="text-[11px] text-stone-400 font-medium">
              ({book.rating.toFixed(1)})
            </span>
          </div>
        </div>

        {/* Price & Add to Cart Button */}
        <div className="flex items-center justify-between pt-3 mt-2 border-t border-stone-100">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-bold text-royal-emerald-950">
              {formatPrice(book.price, book.priceINR)}
            </span>
            {book.originalPrice && (
              <span className="text-xs text-stone-400 line-through">
                {formatPrice(book.originalPrice, book.originalPriceINR)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(book)}
            className="p-1.5 sm:p-2 rounded border border-stone-200 hover:border-royal-emerald-900 hover:bg-royal-emerald-900 hover:text-royal-gold-300 text-stone-700 transition-colors"
            title="Add to Royal Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
