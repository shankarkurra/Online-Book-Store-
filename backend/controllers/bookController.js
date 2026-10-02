const Book = require('../models/Book');
const { isDbConnected, getMemoryBooks } = require('../config/db');

// @desc    Get all books with filtering, searching, and sorting
// @route   GET /api/books
exports.getBooks = async (req, res) => {
  try {
    const { category, search, badge, sort, limit } = req.query;

    if (isDbConnected()) {
      let query = {};

      if (category && category !== 'All' && category !== 'All Categories') {
        query.category = { $regex: new RegExp(`^${category}$`, 'i') };
      }

      if (badge) {
        query.badge = badge;
      }

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { author: { $regex: search, $options: 'i' } },
          { subtitle: { $regex: search, $options: 'i' } },
          { vernacularTitle: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }

      let bookQuery = Book.find(query);

      if (sort === 'price-asc') bookQuery = bookQuery.sort({ price: 1 });
      else if (sort === 'price-desc') bookQuery = bookQuery.sort({ price: -1 });
      else if (sort === 'rating') bookQuery = bookQuery.sort({ rating: -1 });
      else bookQuery = bookQuery.sort({ createdAt: -1 });

      if (limit) bookQuery = bookQuery.limit(parseInt(limit));

      const books = await bookQuery.exec();
      return res.json({ success: true, count: books.length, data: books });
    } else {
      // Memory fallback
      let results = [...getMemoryBooks()];

      if (category && category !== 'All' && category !== 'All Categories') {
        results = results.filter(b => b.category.toLowerCase() === category.toLowerCase());
      }

      if (badge) {
        results = results.filter(b => b.badge === badge);
      }

      if (search) {
        const s = search.toLowerCase();
        results = results.filter(b =>
          b.title.toLowerCase().includes(s) ||
          b.author.toLowerCase().includes(s) ||
          (b.subtitle && b.subtitle.toLowerCase().includes(s)) ||
          (b.vernacularTitle && b.vernacularTitle.toLowerCase().includes(s)) ||
          b.description.toLowerCase().includes(s)
        );
      }

      if (sort === 'price-asc') results.sort((a, b) => a.price - b.price);
      else if (sort === 'price-desc') results.sort((a, b) => b.price - a.price);
      else if (sort === 'rating') results.sort((a, b) => b.rating - a.rating);

      if (limit) results = results.slice(0, parseInt(limit));

      return res.json({ success: true, count: results.length, data: results });
    }
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving books' });
  }
};

// @desc    Get single book details
// @route   GET /api/books/:id
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      let book = await Book.findById(id);
      if (!book) {
        book = await Book.findOne({ _id: id });
      }
      if (!book) {
        return res.status(404).json({ success: false, message: 'Royal title not found' });
      }
      return res.json({ success: true, data: book });
    } else {
      const book = getMemoryBooks().find(b => b._id === id);
      if (!book) {
        return res.status(404).json({ success: false, message: 'Royal title not found' });
      }
      return res.json({ success: true, data: book });
    }
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving title' });
  }
};

// @desc    Get curated homepage showcases (Hero, Bestsellers, Latest Arrivals, Categories)
// @route   GET /api/books/showcase
exports.getShowcase = async (req, res) => {
  try {
    let allBooks = [];
    if (isDbConnected()) {
      allBooks = await Book.find({});
    } else {
      allBooks = getMemoryBooks();
    }

    const featuredHero = allBooks.find(b => b.isFeaturedHero) || allBooks[0];
    const bestsellers = allBooks.filter(b => b.isBestseller);
    const latestArrivals = allBooks.filter(b => b.isLatestArrival);

    // Group categories with counts
    const categoryMap = {};
    allBooks.forEach(b => {
      categoryMap[b.category] = (categoryMap[b.category] || 0) + 1;
    });

    const categories = Object.keys(categoryMap).map(name => ({
      name,
      count: categoryMap[name]
    }));

    return res.json({
      success: true,
      data: {
        featuredHero,
        bestsellers,
        latestArrivals,
        categories
      }
    });
  } catch (error) {
    console.error('Error fetching showcase:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving showcase' });
  }
};
