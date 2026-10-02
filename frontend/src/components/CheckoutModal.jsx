import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, QrCode, CreditCard, Building2, Download, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { submitOrder } from '../services/api';

export default function CheckoutModal({ isOpen, onClose }) {
  const {
    cartItems,
    finalTotal,
    discountAmount,
    appliedCoupon,
    currency,
    clearCart,
    showToast
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI', 'CARD', 'NETBANKING'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  if (!isOpen) return null;

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !address) {
      showToast('Please fill all required patron credentials', 'error');
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      customerName,
      customerEmail,
      shippingAddress: {
        addressLine: address,
        city: city || 'Hyderabad',
        state: 'Telangana',
        postalCode: postalCode || '500001',
        country: 'India'
      },
      items: cartItems.map(item => ({
        bookId: item._id,
        title: item.title,
        author: item.author,
        cover: item.cover,
        price: currency === 'USD' ? item.price : (item.priceINR || Math.round(item.price * 80)),
        quantity: item.quantity
      })),
      totalAmount: finalTotal,
      currency: currency,
      discountApplied: discountAmount,
      couponCode: appliedCoupon,
      paymentMethod: paymentMethod === 'UPI' ? 'UPI (Google Pay / PhonePe)' : paymentMethod === 'CARD' ? 'Royal Imperial Card' : 'Net Banking'
    };

    try {
      const response = await submitOrder(orderPayload);
      if (response.success) {
        setConfirmedOrder(response.data);
        clearCart();
        showToast('Royal Order Confirmed! May wisdom illuminate your path.');
      }
    } catch (err) {
      console.error(err);
      showToast('Could not complete order, please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-950/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        <div className="relative transform overflow-hidden rounded-2xl bg-[#FAF7F2] text-left shadow-2xl transition-all w-full max-w-2xl border border-royal-gold-400">
          
          {/* Header */}
          <div className="bg-royal-emerald-950 text-parchment-100 px-6 py-5 flex items-center justify-between border-b border-royal-emerald-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-royal-gold-400"></span>
              <h3 className="font-crest text-sm sm:text-base font-bold tracking-widest text-royal-gold-300 uppercase">
                {confirmedOrder ? "Imperial Order Confirmation" : "Royal Patron Checkout"}
              </h3>
            </div>
            
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {confirmedOrder ? (
              /* Success / Certificate Screen */
              <div className="space-y-6 text-center">
                
                {/* Royal Seal Emblem */}
                <div className="w-20 h-20 rounded-full bg-royal-emerald-900 border-4 border-royal-gold-400 text-royal-gold-300 mx-auto flex items-center justify-center shadow-lg animate-bounce">
                  <CheckCircle className="w-10 h-10 text-royal-gold-400" />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-crest tracking-[0.25em] text-royal-gold-700 uppercase font-bold">
                    Order Sanctified & Confirmed
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                    Dhanyavadam, {confirmedOrder.customerName}!
                  </h2>
                  <p className="text-xs text-stone-500 font-serif italic">
                    "విద్యా ధనం సర్వ ధనాత్ ప్రధానమ్" • Knowledge is the eternal supreme wealth.
                  </p>
                </div>

                {/* Receipt Box */}
                <div className="bg-white rounded-xl p-5 border border-royal-gold-200 text-left space-y-3 shadow-inner">
                  <div className="flex justify-between items-center text-xs pb-3 border-b border-stone-200">
                    <span className="text-stone-500">Royal Order Ref:</span>
                    <span className="font-mono font-bold text-royal-emerald-950">
                      {confirmedOrder.orderNumber}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-500">Patron Email:</span>
                    <span className="font-medium text-stone-800">{confirmedOrder.customerEmail}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-500">Total Remitted:</span>
                    <span className="font-bold text-royal-emerald-950 text-sm">
                      {confirmedOrder.currency === 'USD' ? `$${confirmedOrder.totalAmount.toFixed(2)}` : `₹${Math.round(confirmedOrder.totalAmount).toLocaleString('en-IN')}`}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-500">Dispatch Status:</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{confirmedOrder.orderStatus}</span>
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs pt-2 border-t border-stone-100">
                    <span className="text-stone-500">Origin / Hub:</span>
                    <span className="font-semibold text-royal-emerald-950 flex items-center gap-1">
                      <span>🇮🇳</span>
                      <span>Hyderabad, Telangana (Made in India)</span>
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handlePrintReceipt}
                    className="flex-1 py-3 px-4 bg-royal-gold-500 hover:bg-royal-gold-400 text-royal-emerald-950 font-bold text-xs uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 shadow"
                  >
                    <Download className="w-4 h-4" />
                    <span>Print Royal Receipt</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 px-4 bg-royal-emerald-900 hover:bg-royal-emerald-800 text-royal-gold-300 font-bold text-xs uppercase tracking-wider rounded-md transition-colors"
                  >
                    Return to Library
                  </button>
                </div>

              </div>
            ) : (
              /* Checkout Form */
              <form onSubmit={handleOrderSubmit} className="space-y-6">
                
                {/* Personal Details */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-royal-gold-700 border-b border-stone-200 pb-1">
                    1. Patron Identification & Delivery Address
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Patron Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Raja Ravi Varma"
                        className="w-full px-3 py-2 text-xs rounded border border-stone-300 bg-white focus:outline-none focus:border-royal-emerald-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="patron@royalmail.com"
                        className="w-full px-3 py-2 text-xs rounded border border-stone-300 bg-white focus:outline-none focus:border-royal-emerald-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Palace / Residence Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street, Landmark, Estate"
                      className="w-full px-3 py-2 text-xs rounded border border-stone-300 bg-white focus:outline-none focus:border-royal-emerald-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Hyderabad / Bengaluru"
                        className="w-full px-3 py-2 text-xs rounded border border-stone-300 bg-white focus:outline-none focus:border-royal-emerald-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="500001"
                        className="w-full px-3 py-2 text-xs rounded border border-stone-300 bg-white focus:outline-none focus:border-royal-emerald-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-royal-gold-700 border-b border-stone-200 pb-1">
                    2. Select Payment Conduit
                  </h4>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('UPI')}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        paymentMethod === 'UPI'
                          ? 'border-royal-emerald-900 bg-royal-gold-50 text-royal-emerald-950 font-bold shadow-sm'
                          : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      <QrCode className="w-5 h-5 mx-auto mb-1 text-royal-gold-700" />
                      <span className="text-[11px] block">UPI / QR</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('CARD')}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        paymentMethod === 'CARD'
                          ? 'border-royal-emerald-900 bg-royal-gold-50 text-royal-emerald-950 font-bold shadow-sm'
                          : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 mx-auto mb-1 text-royal-gold-700" />
                      <span className="text-[11px] block">Imperial Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('NETBANKING')}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        paymentMethod === 'NETBANKING'
                          ? 'border-royal-emerald-900 bg-royal-gold-50 text-royal-emerald-950 font-bold shadow-sm'
                          : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      <Building2 className="w-5 h-5 mx-auto mb-1 text-royal-gold-700" />
                      <span className="text-[11px] block">Net Banking</span>
                    </button>
                  </div>
                </div>

                {/* Total & Submit */}
                <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left">
                    <span className="text-[11px] text-stone-500 uppercase tracking-wider block">
                      Total Due Remittance
                    </span>
                    <span className="text-2xl font-serif font-bold text-royal-emerald-950">
                      {currency === 'USD' ? `$${finalTotal.toFixed(2)}` : `₹${Math.round(finalTotal).toLocaleString('en-IN')}`}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 bg-royal-emerald-900 hover:bg-royal-emerald-800 disabled:opacity-50 text-royal-gold-300 hover:text-white font-bold text-xs uppercase tracking-widest rounded-md shadow-royal transition-all flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-royal-gold-400" />
                    <span>{isSubmitting ? "Sanctifying Order..." : "Authorize Royal Order"}</span>
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
