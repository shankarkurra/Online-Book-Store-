import React, { useState } from 'react';
import { Gift, CheckCircle, Copy } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function PromoBanner() {
  const { applyCoupon, showToast } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  const promoCode = "RAJA20";

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    showToast('Subscribed to Saraswathi Royal Literary Gazette!');
    applyCoupon(promoCode);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    applyCoupon(promoCode);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12 bg-[#F3EDE2] border-b border-[#E2D5BE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] rounded-2xl border border-royal-gold-300/60 p-6 sm:p-10 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left: Gift Box Graphic matching reference image */}
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-royal-emerald-900 to-royal-emerald-950 border-2 border-royal-gold-400 flex items-center justify-center shadow-lg relative flex-shrink-0 group">
              <Gift className="w-10 h-10 sm:w-12 sm:h-12 text-royal-gold-400 group-hover:scale-110 transition-transform duration-300" />
              {/* Gold Ribbon detail */}
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-royal-gold-500 border border-white flex items-center justify-center text-[10px] text-royal-emerald-950 font-bold">
                ★
              </div>
            </div>

            {/* Middle: Discount Details */}
            <div className="space-y-1 text-left">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-royal-gold-700">
                LIMITED TIME HERITAGE OFFER
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Get 20% OFF <span className="font-normal italic">On Your First Order!</span>
              </h3>
              
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-stone-600 font-sans">Use code:</span>
                <button
                  onClick={handleCopyCode}
                  className="px-2.5 py-1 bg-royal-emerald-900 text-royal-gold-300 text-xs font-mono font-bold rounded flex items-center gap-1.5 hover:bg-royal-emerald-800 transition-colors cursor-pointer border border-royal-gold-500/50"
                  title="Click to copy and auto-apply"
                >
                  <span>{promoCode}</span>
                  {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-royal-gold-400" />}
                </button>
                <span className="text-[10px] text-stone-500 hidden sm:inline">(Click to copy)</span>
              </div>
            </div>
          </div>

          {/* Right: Newsletter Input matching reference image */}
          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 text-royal-emerald-900 bg-emerald-50 border border-emerald-200 px-5 py-3 rounded-lg">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-semibold">Thank you for subscribing! Your 20% coupon is activated.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="px-4 py-3 text-xs rounded-md border border-stone-300 bg-white text-stone-800 focus:outline-none focus:border-royal-emerald-900 flex-1 shadow-inner"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-royal-emerald-950 hover:bg-royal-emerald-900 text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors whitespace-nowrap shadow-sm hover:shadow"
                >
                  SUBSCRIBE NOW
                </button>
              </form>
            )}
            <p className="text-[11px] text-stone-500 font-sans mt-2 text-left lg:text-right">
              Join our literary court & receive exclusive manuscripts, translations & updates.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
