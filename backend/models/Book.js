const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    vernacularTitle: { type: String },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    priceINR: { type: Number, required: true },
    originalPriceINR: { type: Number },
    rating: { type: Number, default: 4.8 },
    reviewsCount: { type: Number, default: 0 },
    category: { type: String, required: true },
    badge: { type: String },
    cover: { type: String, required: true },
    format: { type: String, default: "Hardcover & eBook" },
    isFeaturedHero: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    isLatestArrival: { type: Boolean, default: false },
    pages: { type: Number },
    language: { type: String, default: "English" },
    publisher: { type: String, default: "Saraswathi Pustaka Vikrayaśāla" },
    description: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
