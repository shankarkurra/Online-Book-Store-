import React, { useState } from 'react';
import { BookOpen, Search, User, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar({ onSelectCategory, selectedCategory, onSearchChange, searchTerm }) {
  const { totalItemCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const categories = [
    "All Categories",
    "Fiction",
    "Non-Fiction",
    "Self-Help",
    "Business & Money",
    "Religion & Spirituality",
    "History & Epics",
    "Romance"
  ];

  const handleCategoryClick = (cat) => {
    onSelectCategory(cat === "All Categories" ? "All" : cat);
    setCategoriesDropdownOpen(false);
    setMobileMenuOpen(false);
    const target = document.getElementById('catalogue-section');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DEC8] shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo with Royal Saraswathi Emblem */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-full bg-royal-emerald-900 border-2 border-royal-gold-500/80 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
              <BookOpen className="w-6 h-6 text-royal-gold-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-crest tracking-[0.16em] text-lg sm:text-xl font-bold text-royal-emerald-950 uppercase leading-none">
                Saraswathi
              </span>
              <span className="font-serif tracking-[0.14em] text-xs sm:text-sm font-semibold text-royal-gold-700 uppercase mt-0.5">
                Pustaka Vikrayaśāla
              </span>
              <span className="text-[10px] text-stone-600 font-sans tracking-wide uppercase hidden sm:flex items-center gap-1.5 mt-0.5">
                <span>సరస్వతి పుస్తక విక్రయశాల</span>
                <span className="text-royal-gold-600">•</span>
                <span className="font-semibold text-royal-emerald-950">Made in India 🇮🇳</span>
                <span className="text-royal-gold-600">•</span>
                <span className="text-stone-700">Hyderabad</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-xs font-semibold uppercase tracking-wider text-stone-700">
            <a 
              href="#" 
              className="text-royal-emerald-900 border-b-2 border-royal-gold-500 pb-1 font-bold hover:text-royal-gold-600 transition-colors"
            >
              Home
            </a>

            <a 
              href="#bestsellers-section" 
              className="hover:text-royal-gold-600 pb-1 transition-colors"
            >
              Bestsellers
            </a>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                className="flex items-center gap-1 hover:text-royal-gold-600 pb-1 transition-colors uppercase"
              >
                <span>Categories</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
              </button>

              {categoriesDropdownOpen && (
                <div 
                  className="absolute left-0 mt-3 w-56 bg-white rounded-lg shadow-royal-lg border border-royal-gold-200/80 py-2 z-50 animate-fadeIn"
                  onMouseLeave={() => setCategoriesDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold text-royal-emerald-900/60 uppercase tracking-widest border-b border-stone-100">
                    Sacred & World Archives
                  </div>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryClick(cat)}
                      className={`w-full text-left px-4 py-2 text-xs transition-colors flex items-center justify-between ${
                        (selectedCategory === cat || (cat === "All Categories" && selectedCategory === "All"))
                          ? "bg-royal-gold-50 text-royal-emerald-900 font-bold border-l-2 border-royal-gold-500"
                          : "text-stone-700 hover:bg-stone-50 hover:text-royal-emerald-900"
                      }`}
                    >
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a 
              href="#latest-section" 
              className="hover:text-royal-gold-600 pb-1 transition-colors"
            >
              Latest Arrivals
            </a>

            <a 
              href="#why-choose-us" 
              className="hover:text-royal-gold-600 pb-1 transition-colors"
            >
              Heritage
            </a>

            <a 
              href="#footer" 
              className="hover:text-royal-gold-600 pb-1 transition-colors"
            >
              Patron Care
            </a>
          </nav>

          {/* Right Action Icons: Search, User, Cart */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Inline search bar toggle */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center bg-white border border-royal-gold-400 rounded-full px-3 py-1 shadow-sm w-44 sm:w-64">
                  <Search className="w-4 h-4 text-royal-gold-600 mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search sacred titles..."
                    className="w-full text-xs text-stone-800 bg-transparent focus:outline-none"
                    autoFocus
                  />
                  <button 
                    onClick={() => { setSearchOpen(false); onSearchChange(''); }}
                    className="text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-stone-700 hover:text-royal-emerald-900 hover:bg-stone-100 rounded-full transition-colors"
                  title="Search Books"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* User Icon */}
            <button
              onClick={() => alert("Royal Patron Portal: You are browsing Saraswathi Pustaka Vikrayaśāla as an Honored Guest.")}
              className="p-2 text-stone-700 hover:text-royal-emerald-900 hover:bg-stone-100 rounded-full transition-colors hidden sm:block"
              title="Royal Patron Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Shopping Cart Button with Count Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-stone-800 hover:text-royal-emerald-900 hover:bg-royal-gold-100/60 rounded-full transition-all group"
              title="View Royal Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-royal-emerald-900 text-royal-gold-300 border border-royal-gold-400 font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-royal-emerald-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-parchment-100 border-b border-royal-gold-200 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-semibold uppercase tracking-wider text-stone-700">
            <a 
              href="#" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded text-royal-emerald-900 bg-royal-gold-50"
            >
              Home
            </a>
            <a 
              href="#bestsellers-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 hover:bg-stone-100 rounded"
            >
              Bestsellers
            </a>
            <a 
              href="#catalogue-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 hover:bg-stone-100 rounded"
            >
              All Categories
            </a>
            <a 
              href="#latest-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 hover:bg-stone-100 rounded"
            >
              Latest Arrivals
            </a>
            <a 
              href="#why-choose-us" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 hover:bg-stone-100 rounded"
            >
              Why Saraswathi Pustaka
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
