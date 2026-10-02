import React, { useState } from 'react';
import { BookOpen, Mail, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { FacebookIcon, InstagramIcon, TwitterIcon } from './SocialIcons';
import { useCart } from '../context/CartContext';

export default function Footer({ onSelectCategory }) {
  const { showToast } = useCart();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    showToast('Subscribed to Saraswathi Heritage Gazette!');
    setNewsletterEmail('');
  };

  return (
    <footer id="footer" className="bg-royal-emerald-950 text-stone-300 pt-16 pb-8 border-t-2 border-royal-gold-500/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid matching reference image */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-royal-emerald-800/80">
          
          {/* Column 1: Brand & Sanskrit Motto */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-royal-emerald-900 border border-royal-gold-400 flex items-center justify-center text-royal-gold-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="font-crest tracking-wider text-base font-bold text-white block uppercase">
                  Saraswathi
                </span>
                <span className="font-serif tracking-wider text-xs text-royal-gold-400 block -mt-0.5">
                  Pustaka Vikrayaśāla
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 font-sans leading-relaxed max-w-sm">
              Your revered destination for sacred scriptures, Indian epics, and timeless world literature. Preserving knowledge and enlightening minds through the ages.
            </p>

            <div className="pt-1">
              <p className="font-serif italic text-xs text-royal-gold-300">
                "సరస్వతి నమస్తుభ్యం వరదే కామరూపిణి | విద్యారంభం కరిష్యామి సిద్ధిర్భవతు మే సదా ||"
              </p>
            </div>

            {/* Made in India & Hyderabad Headquarters Card */}
            <div className="p-3.5 rounded-lg bg-royal-emerald-900/70 border border-royal-gold-500/40 text-xs space-y-1.5 shadow-sm">
              <div className="flex items-center gap-2 font-bold text-royal-gold-300">
                <span className="text-base">🇮🇳</span>
                <span className="tracking-wider uppercase text-[11px]">PROUDLY MADE IN INDIA</span>
              </div>
              <p className="text-stone-300 text-[11px] leading-relaxed">
                <span className="text-royal-gold-200 font-semibold">📍 Location & Central Press:</span><br />
                Palace Heritage Arcade, Abids & Mozamjahi Market, Hyderabad, Telangana - 500001, Bharat
              </p>
              <p className="text-stone-400 text-[10px]">
                Preserving Indian literature, Sanskrit manuscripts & world masterworks.
              </p>
            </div>

            {/* Social Icons matching reference image */}
            <div className="flex items-center space-x-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-royal-emerald-900 border border-royal-emerald-800 flex items-center justify-center text-stone-400 hover:text-royal-gold-400 hover:border-royal-gold-500 transition-colors" aria-label="Facebook">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-royal-emerald-900 border border-royal-emerald-800 flex items-center justify-center text-stone-400 hover:text-royal-gold-400 hover:border-royal-gold-500 transition-colors" aria-label="Instagram">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-royal-emerald-900 border border-royal-emerald-800 flex items-center justify-center text-stone-400 hover:text-royal-gold-400 hover:border-royal-gold-500 transition-colors" aria-label="Twitter">
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-royal-emerald-900 border border-royal-emerald-800 flex items-center justify-center text-stone-400 hover:text-royal-gold-400 hover:border-royal-gold-500 transition-colors" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: SHOP */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white border-b border-royal-emerald-800 pb-1.5">
              SHOP
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#catalogue-section" className="hover:text-royal-gold-300 transition-colors">All eBooks & Hardcover</a></li>
              <li><a href="#bestsellers-section" className="hover:text-royal-gold-300 transition-colors">Bestsellers</a></li>
              <li><a href="#latest-section" className="hover:text-royal-gold-300 transition-colors">New Arrivals</a></li>
              <li><a href="#bestsellers-section" className="hover:text-royal-gold-300 transition-colors">Special Royal Offers</a></li>
              <li><a href="#catalogue-section" className="hover:text-royal-gold-300 transition-colors">Palm Leaf Replicas</a></li>
            </ul>
          </div>

          {/* Column 3: CATEGORIES */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white border-b border-royal-emerald-800 pb-1.5">
              CATEGORIES
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><button onClick={() => onSelectCategory("Fiction")} className="hover:text-royal-gold-300 transition-colors">Fiction</button></li>
              <li><button onClick={() => onSelectCategory("Non-Fiction")} className="hover:text-royal-gold-300 transition-colors">Non-Fiction</button></li>
              <li><button onClick={() => onSelectCategory("Self-Help")} className="hover:text-royal-gold-300 transition-colors">Self-Help</button></li>
              <li><button onClick={() => onSelectCategory("Business & Money")} className="hover:text-royal-gold-300 transition-colors">Business & Money</button></li>
              <li><button onClick={() => onSelectCategory("Religion & Spirituality")} className="hover:text-royal-gold-300 transition-colors">Religion & Spirituality</button></li>
              <li><button onClick={() => onSelectCategory("History & Epics")} className="hover:text-royal-gold-300 transition-colors">History & Epics</button></li>
            </ul>
          </div>

          {/* Column 4: CUSTOMER CARE */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white border-b border-royal-emerald-800 pb-1.5">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#" className="hover:text-royal-gold-300 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-royal-gold-300 transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-royal-gold-300 transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-royal-gold-300 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-royal-gold-300 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 5: NEWSLETTER */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white border-b border-royal-emerald-800 pb-1.5">
              NEWSLETTER
            </h4>
            <p className="text-[11px] text-stone-400 leading-snug">
              Get updates on new sacred releases & exclusive patronage offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-xs bg-royal-emerald-900 border border-royal-emerald-700 text-stone-200 rounded-l focus:outline-none focus:border-royal-gold-400"
                required
              />
              <button
                type="submit"
                className="bg-royal-gold-500 hover:bg-royal-gold-400 text-royal-emerald-950 px-3 py-2 rounded-r font-bold transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Icons matching reference image */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            <p>© 2026 Saraswathi Pustaka Vikrayaśāla • Made in India 🇮🇳 • Location: Hyderabad, Telangana</p>
          </div>

          {/* Payment Badges (Visa, Mastercard, Paypal, Apple Pay, UPI) */}
          <div className="flex items-center gap-2 text-[10px] font-bold text-stone-300">
            <span className="bg-stone-800 px-2 py-1 rounded border border-stone-700">VISA</span>
            <span className="bg-stone-800 px-2 py-1 rounded border border-stone-700">Mastercard</span>
            <span className="bg-stone-800 px-2 py-1 rounded border border-stone-700">PayPal</span>
            <span className="bg-stone-800 px-2 py-1 rounded border border-stone-700">Apple Pay</span>
            <span className="bg-royal-gold-900/60 text-royal-gold-300 px-2 py-1 rounded border border-royal-gold-600/50">UPI / RuPay</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
