import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('spv_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currency, setCurrency] = useState('INR'); // Default to Indian Rupee (₹) - Made in India
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeBookModal, setActiveBookModal] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('spv_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (book, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item._id === book._id);
      if (existing) {
        return prev.map(item =>
          item._id === book._id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...book, quantity }];
    });
    showToast(`"${book.title}" added to your Royal Cart`);
  };

  const removeFromCart = (bookId) => {
    setCartItems(prev => prev.filter(item => item._id !== bookId));
  };

  const updateQuantity = (bookId, delta) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item._id === bookId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'RAJA20' || cleanCode === 'BOOK20') {
      setAppliedCoupon(cleanCode);
      setDiscountPercent(20);
      showToast('Imperial Coupon Applied: 20% Discount granted!', 'success');
      return { success: true, message: '20% Royal Discount Applied!' };
    } else {
      showToast('Invalid imperial coupon code', 'error');
      return { success: false, message: 'Invalid coupon' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon('');
    setDiscountPercent(0);
  };

  const subtotalUSD = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const subtotalINR = cartItems.reduce((sum, item) => sum + (item.priceINR || Math.round(item.price * 80)) * item.quantity, 0);

  const subtotal = currency === 'USD' ? subtotalUSD : subtotalINR;
  const discountAmount = (subtotal * discountPercent) / 100;
  const finalTotal = Math.max(0, subtotal - discountAmount);
  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const formatPrice = (usdAmount, inrAmount) => {
    if (currency === 'USD') {
      return `$${usdAmount.toFixed(2)}`;
    } else {
      const amt = inrAmount || Math.round(usdAmount * 80);
      return `₹${amt.toLocaleString('en-IN')}`;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedCoupon,
        discountPercent,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        finalTotal,
        totalItemCount,
        currency,
        setCurrency,
        formatPrice,
        isCartOpen,
        setIsCartOpen,
        activeBookModal,
        setActiveBookModal,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
