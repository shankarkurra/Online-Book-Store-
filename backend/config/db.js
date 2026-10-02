const mongoose = require('mongoose');
const seedBooks = require('../data/seedBooks');
const Book = require('../models/Book');

let isConnected = false;
let memoryBooks = [...seedBooks];
let memoryOrders = [];

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/saraswathi_books';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    isConnected = true;
    console.log(`[Royal Vault] MongoDB Connected successfully: ${conn.connection.host}`);

    // Seed if empty
    const count = await Book.countDocuments();
    if (count === 0) {
      console.log('[Royal Vault] Seeding initial royal book collection...');
      await Book.insertMany(seedBooks);
      console.log('[Royal Vault] Successfully seeded royal archive.');
    }
  } catch (error) {
    isConnected = false;
    console.warn(`[Royal Vault] MongoDB not available locally (${error.message}).`);
    console.log('[Royal Vault] Gracefully running with embedded In-Memory Repository with full pre-seeded Royal Archives!');
  }
};

module.exports = {
  connectDB,
  isDbConnected: () => isConnected,
  getMemoryBooks: () => memoryBooks,
  getMemoryOrders: () => memoryOrders,
  addMemoryOrder: (order) => {
    memoryOrders.unshift(order);
    return order;
  }
};
