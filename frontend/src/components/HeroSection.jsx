import React from 'react';
import { ArrowRight, Play, DownloadCloud, Smartphone, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function HeroSection({ heroBook, onExploreClick }) {
  const { addToCart, setActiveBookModal } = useCart();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F4EDE2] to-[#FAF7F2] py-12 md:py-20 border-b border-[#E8DEC8]">
      {/* Subtle royal background watermark / pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
        <span className="font-crest text-[28vw] font-black text-royal-emerald-950 select-none">
          ॐ
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Small uppercase kicker */}
            <div className="inline-flex items-center gap-2">
              <span className="h-px w-6 bg-royal-gold-500"></span>
              <p className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.25em] text-royal-gold-700 font-bold">
                BOOKS THAT INSPIRE. STORIES THAT STAY.
              </p>
            </div>

            {/* Main Title matching reference image font hierarchy */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-stone-900 leading-[1.12] tracking-tight">
              Discover Your Next <br />
              <span className="italic font-normal text-royal-emerald-900 font-serif">
                Great Read
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-stone-600 max-w-xl font-normal leading-relaxed">
              Explore our wide collection of sacred scriptures, timeless Indian epics, and modern masterworks. Proudly <strong className="font-semibold text-royal-emerald-950">Made in India 🇮🇳</strong>, printed & dispatched directly from our historic heritage repository in <strong className="font-semibold text-royal-emerald-950">Hyderabad, Telangana</strong>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 bg-royal-emerald-900 hover:bg-royal-emerald-800 text-royal-gold-300 hover:text-white font-semibold text-xs tracking-wider uppercase rounded-md shadow-royal hover:shadow-royal-lg transition-all duration-300 flex items-center gap-2.5 group"
              >
                <span>Browse Royal Vault</span>
                <ArrowRight className="w-4 h-4 text-royal-gold-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  if (heroBook) setActiveBookModal(heroBook);
                }}
                className="px-6 py-3.5 bg-white/80 hover:bg-white text-stone-800 font-semibold text-xs tracking-wider uppercase rounded-md border border-royal-gold-300 hover:border-royal-gold-500 shadow-sm transition-all duration-300 flex items-center gap-2 group"
              >
                <div className="w-5 h-5 rounded-full border border-stone-400 flex items-center justify-center group-hover:border-royal-gold-600">
                  <Play className="w-2.5 h-2.5 text-stone-600 fill-stone-600 group-hover:text-royal-gold-600 group-hover:fill-royal-gold-600 ml-0.5" />
                </div>
                <span>How It Works</span>
              </button>
            </div>

            {/* 3 Value Badges matching reference image */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-stone-300/60 max-w-2xl">
              
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-royal-gold-100/70 text-royal-emerald-900 flex-shrink-0">
                  <DownloadCloud className="w-5 h-5 text-royal-gold-700" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">Instant Download</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">Get your sacred manuscript immediately</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-royal-gold-100/70 text-royal-emerald-900 flex-shrink-0">
                  <Smartphone className="w-5 h-5 text-royal-gold-700" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">Read Anywhere</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">Any device, Kindle, or Hardcover</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-royal-gold-100/70 text-royal-emerald-900 flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-royal-gold-700" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">Secure Payment</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">100% verified royal patronage</p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: E-Reader Mockup & Stack of Books matching reference image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md sm:max-w-lg">
              
              {/* Natural shadow & glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-royal-gold-400/20 via-royal-emerald-900/10 to-transparent blur-2xl rounded-full"></div>

              <div className="relative flex items-center justify-center">
                
                {/* Tablet / eReader Mockup (Hero Book) */}
                <div className="relative z-20 w-64 sm:w-72 bg-stone-900 rounded-[24px] p-3 shadow-2xl border-4 border-stone-800 rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                  
                  {/* Speaker slot */}
                  <div className="w-12 h-1 bg-stone-700 rounded-full mx-auto mb-2"></div>

                  {/* Screen Content */}
                  <div className="relative rounded-[16px] overflow-hidden bg-white aspect-[3/4.2] flex flex-col justify-between p-4 shadow-inner group">
                    
                    {/* Tablet Book Cover Art */}
                    <img 
                      src={heroBook?.cover || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=700"}
                      alt="The Quiet Mind"
                      className="absolute inset-0 w-full h-full object-cover filter brightness-[0.92] contrast-[1.05]"
                    />

                    {/* Gradient Overlay for Readable Typography */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/30 to-stone-950/60"></div>

                    {/* Book Text overlay */}
                    <div className="relative z-10 text-center pt-6 space-y-1">
                      <span className="text-[9px] font-sans tracking-[0.2em] text-royal-gold-300 uppercase font-semibold">
                        Saraswathi Editions
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-tight">
                        The Quiet Mind
                      </h3>
                      <p className="text-[10px] text-stone-200 font-serif italic">
                        A Journey to Peace Within
                      </p>
                    </div>

                    <div className="relative z-10 text-center pb-2">
                      <div className="w-8 h-0.5 bg-royal-gold-400 mx-auto mb-2"></div>
                      <p className="text-xs uppercase tracking-widest text-royal-gold-200 font-bold font-serif">
                        Olivia Hart
                      </p>
                      
                      <button
                        onClick={() => {
                          if (heroBook) addToCart(heroBook);
                        }}
                        className="mt-3 w-full py-2 bg-royal-gold-500 hover:bg-royal-gold-400 text-royal-emerald-950 font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-md"
                      >
                        Read Sample / Order
                      </button>
                    </div>

                  </div>

                  {/* Tablet Home Bar */}
                  <div className="w-20 h-1 bg-stone-700 rounded-full mx-auto mt-2.5"></div>

                  {/* Circular "NEW RELEASE" Badge on top right of the tablet */}
                  <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-royal-emerald-900 border-2 border-royal-gold-400 text-royal-gold-300 flex flex-col items-center justify-center text-center p-1 shadow-lg transform rotate-12">
                    <Sparkles className="w-3.5 h-3.5 text-royal-gold-400" />
                    <span className="text-[9px] font-black uppercase tracking-wider leading-tight">
                      NEW<br/>RELEASE
                    </span>
                  </div>
                </div>

                {/* Stack of Hardcover Books beside the tablet (matching image) */}
                <div className="absolute -bottom-6 -right-6 sm:-right-8 z-10 space-y-1.5 hidden sm:block">
                  
                  {/* Book 1 */}
                  <div className="w-56 h-8 bg-[#1f2824] rounded-r border-y border-r border-[#3a4d44] shadow-book flex items-center px-3 justify-between transform translate-x-3">
                    <span className="text-[10px] font-serif tracking-widest text-royal-gold-300 uppercase">
                      THE ROAD AHEAD
                    </span>
                    <span className="text-[8px] text-stone-400">VOL. I</span>
                  </div>

                  {/* Book 2 */}
                  <div className="w-60 h-9 bg-[#2b1f1a] rounded-r border-y border-r border-[#543d34] shadow-book flex items-center px-3 justify-between transform translate-x-1">
                    <span className="text-[10px] font-serif tracking-widest text-parchment-200 uppercase">
                      BEYOND THE HORIZON
                    </span>
                    <span className="text-[8px] text-stone-400">VOL. II</span>
                  </div>

                  {/* Book 3 */}
                  <div className="w-64 h-10 bg-[#422c1d] rounded-r border-y border-r border-[#694830] shadow-book flex items-center px-4 justify-between">
                    <span className="text-[10px] font-serif tracking-widest text-royal-gold-200 uppercase font-semibold">
                      THE SILENT PATH
                    </span>
                    <div className="w-3 h-3 rounded-full bg-royal-gold-500/80"></div>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
