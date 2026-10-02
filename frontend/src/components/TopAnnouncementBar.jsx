import { ShieldCheck, Star, Sparkles } from 'lucide-react';
import { InstagramIcon, FacebookIcon, TwitterIcon } from './SocialIcons';
import { useCart } from '../context/CartContext';

export default function TopAnnouncementBar() {
  const { currency, setCurrency } = useCart();

  return (
    <div className="bg-royal-emerald-950 text-parchment-200 text-xs py-2 px-4 border-b border-royal-emerald-800/60">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        
        {/* Left announcement with Made in India badge */}
        <div className="flex items-center gap-2.5 font-medium tracking-wide">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-royal-gold-500/20 text-royal-gold-300 border border-royal-gold-500/40 text-[11px] font-bold">
            <span>🇮🇳</span>
            <span>MADE IN INDIA</span>
          </span>
          <span className="hidden sm:inline text-royal-emerald-700">|</span>
          <span className="flex items-center gap-1 text-royal-gold-200">
            <span className="text-royal-gold-400">📍</span>
            <span className="font-semibold">Hyderabad, Telangana</span>
          </span>
          <span className="hidden md:inline text-royal-emerald-700">|</span>
          <span className="hidden md:inline text-stone-300">Central Heritage Book Vault</span>
        </div>

        {/* Center trust metric */}
        <div className="hidden lg:flex items-center gap-1 text-royal-gold-300 font-medium">
          <Star className="w-3.5 h-3.5 fill-royal-gold-400 text-royal-gold-400" />
          <span>10,000+ Readers Across Bharat & Worldwide</span>
        </div>

        {/* Right actions & currency switch */}
        <div className="flex items-center gap-4 text-stone-300">
          <div className="flex items-center gap-1 text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-royal-gold-400" />
            <span>Secure Checkout</span>
          </div>

          <span className="text-royal-emerald-700">|</span>

          {/* Currency Toggle */}
          <div className="flex items-center gap-1 bg-royal-emerald-900/90 rounded px-2 py-0.5 border border-royal-gold-600/40">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition-all ${
                currency === 'USD' ? 'bg-royal-gold-500 text-royal-emerald-950 shadow-sm' : 'text-stone-400 hover:text-white'
              }`}
            >
              $ USD
            </button>
            <button
              onClick={() => setCurrency('INR')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition-all ${
                currency === 'INR' ? 'bg-royal-gold-500 text-royal-emerald-950 shadow-sm' : 'text-stone-400 hover:text-white'
              }`}
            >
              ₹ INR
            </button>
          </div>

          <span className="hidden sm:inline text-royal-emerald-700">|</span>

          {/* Social links */}
          <div className="hidden sm:flex items-center gap-2 text-stone-400">
            <a href="#footer" className="hover:text-royal-gold-400 transition-colors" aria-label="Facebook">
              <FacebookIcon className="w-3.5 h-3.5" />
            </a>
            <a href="#footer" className="hover:text-royal-gold-400 transition-colors" aria-label="Instagram">
              <InstagramIcon className="w-3.5 h-3.5" />
            </a>
            <a href="#footer" className="hover:text-royal-gold-400 transition-colors" aria-label="Twitter">
              <TwitterIcon className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
