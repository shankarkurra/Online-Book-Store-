const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  bookId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String },
  cover: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 }
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    shippingAddress: {
      addressLine: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String },
      postalCode: { type: String, required: true },
      country: { type: String, default: "India" }
    },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    discountApplied: { type: Number, default: 0 },
    couponCode: { type: String },
    paymentMethod: { type: String, default: "UPI / Card" },
    paymentStatus: { type: String, default: "Completed" },
    orderStatus: { type: String, default: "Confirmed (Royal Dispatch in Progress)" }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
