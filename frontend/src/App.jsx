import React, { useState, useEffect } from 'react';
import TopAnnouncementBar from './components/TopAnnouncementBar';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoryBrowse from './components/CategoryBrowse';
import Bestsellers from './components/Bestsellers';
import WhyChooseUs from './components/WhyChooseUs';
import PromoBanner from './components/PromoBanner';
import LatestArrivals from './components/LatestArrivals';
import CatalogueSection from './components/CatalogueSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import BookModal from './components/BookModal';
import CheckoutModal from './components/CheckoutModal';
import Toast from './components/Toast';
import { fetchShowcase, fetchBooks } from './services/api';

export default function App() {
  const [heroBook, setHeroBook] = useState(null);
  const [bestsellerBooks, setBestsellerBooks] = useState([]);
  const [latestBooks, setLatestBooks] = useState([]);
  const [allCatalogueBooks, setAllCatalogueBooks] = useState([]);
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('featured');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Load initial showcase data
  useEffect(() => {
    async function loadInitialData() {
      const showcase = await fetchShowcase();
      if (showcase) {
        setHeroBook(showcase.featuredHero);
        setBestsellerBooks(showcase.bestsellers || []);
        setLatestBooks(showcase.latestArrivals || []);
      }
    }
    loadInitialData();
  }, []);

  // Fetch catalogue books based on filters
  useEffect(() => {
    async function loadFilteredCatalogue() {
      const data = await fetchBooks({
        category: selectedCategory,
        search: searchTerm,
        sort: sortOption
      });
      setAllCatalogueBooks(data || []);
    }
    loadFilteredCatalogue();
  }, [selectedCategory, searchTerm, sortOption]);

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    const target = document.getElementById('catalogue-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCatalogue = () => {
    const target = document.getElementById('catalogue-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] font-sans text-stone-900 selection:bg-royal-gold-200 selection:text-royal-emerald-950">
      
      {/* Top Announcement Bar */}
      <TopAnnouncementBar />

      {/* Main Navbar */}
      <Navbar
        onSelectCategory={handleSelectCategory}
        selectedCategory={selectedCategory}
        onSearchChange={setSearchTerm}
        searchTerm={searchTerm}
      />

      {/* Hero Section */}
      <HeroSection
        heroBook={heroBook}
        onExploreClick={scrollToCatalogue}
      />

      {/* Browse By Category */}
      <CategoryBrowse
        onSelectCategory={handleSelectCategory}
        selectedCategory={selectedCategory}
      />

      {/* Bestsellers Section (Matching reference image) */}
      <Bestsellers
        books={bestsellerBooks}
        onExploreAll={scrollToCatalogue}
      />

      {/* Why Choose Us - Deep Emerald Section (Matching reference image) */}
      <WhyChooseUs />

      {/* Promo Offer Banner (20% OFF coupon code matching reference image) */}
      <PromoBanner />

      {/* Latest Arrivals Section (Matching reference image) */}
      <LatestArrivals
        books={latestBooks}
        onExploreAll={scrollToCatalogue}
      />

      {/* Full Repository / Search & Filter Section */}
      <CatalogueSection
        books={allCatalogueBooks}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      {/* Footer (Deep Emerald with gold emblems) */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* Interactive Cart Drawer */}
      <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} />

      {/* Quick View Book Modal */}
      <BookModal />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Notification Toast */}
      <Toast />

    </div>
  );
}
