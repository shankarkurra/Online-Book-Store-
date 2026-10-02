import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ onProceedToCheckout }) {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    removeFromCart,
    updateQuantity,
    appliedCoupon,
    discountPercent,
    applyCoupon,
    removeCoupon,
    subtotal,
    discountAmount,
    finalTotal,
    formatPrice,
    currency
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    applyCoupon(couponInput);
    setCouponInput('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col border-l border-royal-gold-300">
          
          {/* Header */}
          <div className="px-6 py-5 bg-royal-emerald-950 text-parchment-100 flex items-center justify-between border-b border-royal-emerald-800">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-royal-gold-400"></span>
              <h2 className="font-crest text-sm font-bold uppercase tracking-widest text-royal-gold-300">
                Your Royal Cart
              </h2>
            </div>
            
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-full text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-royal-gold-100/70 border border-royal-gold-300 text-royal-emerald-900 mx-auto flex items-center justify-center">
                  <Tag className="w-7 h-7 text-royal-gold-700" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-800">Your Vault is Empty</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Explore our sacred manuscripts and modern bestsellers to fill your treasury.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-5 py-2.5 bg-royal-emerald-900 text-royal-gold-300 rounded font-semibold text-xs uppercase tracking-wider hover:bg-royal-emerald-800 transition-colors"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={item._id}
                  className="flex gap-4 p-3 bg-white rounded-lg border border-stone-200/90 shadow-sm"
                >
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="w-16 h-22 object-cover rounded shadow-sm flex-shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif font-bold text-sm text-stone-900 line-clamp-1">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-stone-400 hover:text-red-600 transition-colors ml-2"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-[11px] text-stone-500 font-sans mt-0.5">
                        {item.author}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-stone-200 rounded">
                        <button
                          onClick={() => updateQuantity(item._id, -1)}
                          className="p-1 hover:bg-stone-100 text-stone-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id, 1)}
                          className="p-1 hover:bg-stone-100 text-stone-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-serif font-bold text-sm text-royal-emerald-950">
                        {formatPrice(item.price * item.quantity, (item.priceINR || Math.round(item.price * 80)) * item.quantity)}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer / Summary */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-white border-t border-stone-200/90 space-y-4">
              
              {/* Promo Code Input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-800">
                    <span className="font-medium">
                      Coupon <strong>{appliedCoupon}</strong> ({discountPercent}% OFF) applied!
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-stone-500 hover:text-red-700 underline text-[11px] ml-2"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon Code (e.g. RAJA20)"
                      className="flex-1 px-3 py-2 text-xs border border-stone-300 rounded bg-[#FAF7F2] uppercase tracking-wider focus:outline-none focus:border-royal-emerald-900"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-royal-emerald-900 hover:bg-royal-emerald-800 text-royal-gold-300 text-xs font-bold uppercase rounded transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">
                    {currency === 'USD' ? `$${subtotal.toFixed(2)}` : `₹${subtotal.toLocaleString('en-IN')}`}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Royal Discount ({discountPercent}%)</span>
                    <span>-{currency === 'USD' ? `$${discountAmount.toFixed(2)}` : `₹${Math.round(discountAmount).toLocaleString('en-IN')}`}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-500 text-[11px]">
                  <span>Royal Express Delivery</span>
                  <span className="text-emerald-700 font-bold uppercase">FREE</span>
                </div>

                <div className="flex justify-between text-base font-serif font-bold text-royal-emerald-950 pt-2 border-t border-stone-200">
                  <span>Grand Total</span>
                  <span>
                    {currency === 'USD' ? `$${finalTotal.toFixed(2)}` : `₹${Math.round(finalTotal).toLocaleString('en-IN')}`}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 bg-royal-emerald-900 hover:bg-royal-emerald-800 text-royal-gold-300 hover:text-white font-bold text-xs uppercase tracking-widest rounded-md shadow-royal hover:shadow-royal-lg transition-all flex items-center justify-center gap-2 group"
              >
                <span>PROCEED TO ROYAL CHECKOUT</span>
                <ArrowRight className="w-4 h-4 text-royal-gold-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-royal-gold-600" />
                <span>Sanctified by Saraswathi Heritage Assurance</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
