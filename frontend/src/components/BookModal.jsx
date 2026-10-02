import React, { useState } from 'react';
import { X, Star, ShoppingBag, Check, BookOpen, Globe, Award, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function BookModal() {
  const { activeBookModal, setActiveBookModal, addToCart, formatPrice } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!activeBookModal) return null;

  const book = activeBookModal;

  const handleAddToCart = () => {
    addToCart(book, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm transition-opacity"
        onClick={() => setActiveBookModal(null)}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        <div className="relative transform overflow-hidden rounded-2xl bg-[#FAF7F2] text-left shadow-2xl transition-all w-full max-w-3xl border border-royal-gold-300">
          
          {/* Close button */}
          <button
            onClick={() => setActiveBookModal(null)}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
            
            {/* Left: Book Cover & Badges */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full aspect-[1/1.45] rounded-lg overflow-hidden shadow-book border border-stone-200 bg-stone-100">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                {book.badge && (
                  <div className="absolute top-3 left-3 bg-royal-gold-500 text-royal-emerald-950 font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded shadow">
                    {book.badge}
                  </div>
                )}
              </div>

              {/* Format pill */}
              <div className="mt-3 flex items-center gap-1.5 text-xs text-royal-emerald-900 font-semibold bg-royal-gold-100/80 px-3 py-1 rounded-full border border-royal-gold-300">
                <Sparkles className="w-3.5 h-3.5 text-royal-gold-600" />
                <span>{book.format || "Deluxe Hardcover & eBook"}</span>
              </div>
            </div>

            {/* Right: Book Details & Purchase Options */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-4">
              <div>
                
                {/* Category & Telugu Subtitle */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-royal-gold-700 bg-royal-gold-50 px-2 py-0.5 rounded border border-royal-gold-200">
                    {book.category}
                  </span>
                  {book.vernacularTitle && (
                    <span className="text-xs text-stone-500 font-serif">
                      {book.vernacularTitle}
                    </span>
                  )}
                </div>

                {/* Main Title */}
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-2 leading-tight">
                  {book.title}
                </h2>

                {book.subtitle && (
                  <p className="text-xs sm:text-sm text-stone-600 font-serif italic mt-0.5">
                    {book.subtitle}
                  </p>
                )}

                {/* Author */}
                <p className="text-sm font-semibold text-royal-emerald-900 mt-1">
                  By {book.author}
                </p>

                {/* Ratings */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-stone-800">
                    {book.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-stone-400">
                    ({book.reviewsCount.toLocaleString()} patrons reviewed)
                  </span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mt-4 pt-3 border-t border-stone-200">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-royal-emerald-950">
                    {formatPrice(book.price, book.priceINR)}
                  </span>
                  {book.originalPrice && (
                    <span className="text-sm text-stone-400 line-through">
                      {formatPrice(book.originalPrice, book.originalPriceINR)}
                    </span>
                  )}
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Royal Patron Savings
                  </span>
                </div>

                {/* Synopsis */}
                <p className="text-xs sm:text-sm text-stone-600 mt-4 leading-relaxed font-sans line-clamp-4">
                  {book.description}
                </p>

                {/* Book specs */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-stone-200 text-xs text-stone-600">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-royal-gold-600" />
                    <span>Pages: <strong>{book.pages || 320}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-royal-gold-600" />
                    <span>Language: <strong>{book.language || "English"}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2">
                    <Award className="w-4 h-4 text-royal-gold-600" />
                    <span>Publisher: <strong>{book.publisher || "Saraswathi Heritage Press"}</strong></span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-200 flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-stone-300 rounded bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-stone-600 hover:bg-stone-100"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-stone-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-stone-600 hover:bg-stone-100"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-6 rounded-md font-bold text-xs uppercase tracking-wider shadow-royal transition-all flex items-center justify-center gap-2 ${
                    added
                      ? "bg-emerald-700 text-white"
                      : "bg-royal-emerald-900 hover:bg-royal-emerald-800 text-royal-gold-300 hover:text-white"
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Royal Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Royal Cart</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
