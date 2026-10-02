import React from 'react';
import { Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-500">
      <div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-royal-lg border ${
        toastMessage.type === 'error'
          ? 'bg-rose-950 text-rose-100 border-rose-500'
          : 'bg-royal-emerald-950 text-parchment-100 border-royal-gold-500'
      }`}>
        {toastMessage.type === 'error' ? (
          <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-royal-gold-400 flex-shrink-0" />
        )}
        <span className="text-xs font-semibold tracking-wide font-sans">
          {toastMessage.message}
        </span>
      </div>
    </div>
  );
}
