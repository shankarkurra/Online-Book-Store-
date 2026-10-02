const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB, isDbConnected } = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    royalBookstore: 'Saraswathi Pustaka Vikrayaśāla (సరస్వతి పుస్తక విక్రయశాల)',
    madeInIndia: true,
    origin: 'Made in India 🇮🇳',
    location: 'Hyderabad, Telangana, Bharat',
    database: isDbConnected() ? 'MongoDB Connected' : 'In-Memory Royal Vault (Active)',
    timestamp: new Date().toISOString()
  });
});

// Root welcome endpoint
app.get('/', (req, res) => {
  res.send(`
    <div style="font-family: Georgia, serif; text-align: center; padding: 50px; background: #0b2820; color: #f7f3eb;">
      <h1 style="color: #d4af37; font-size: 2.5rem; letter-spacing: 2px;">👑 Saraswathi Pustaka Vikrayaśāla 👑</h1>
      <p style="font-style: italic; font-size: 1.2rem; color: #e5c158;">సరస్వతి పుస్తక విక్రయశాల — Made in India 🇮🇳 • Hyderabad, Telangana</p>
      <p style="margin-top: 10px; color: #ecd9a7;">Estd. Royal Heritage Press & Repository, Abids, Hyderabad</p>
      <p style="margin-top: 20px;">The backend REST API server is actively running.</p>
      <div style="margin-top: 30px;">
        <a href="/api/books" style="color: #d4af37; margin: 0 15px;">Royal Books API</a>
        <a href="/api/books/showcase" style="color: #d4af37; margin: 0 15px;">Showcase API</a>
        <a href="/api/health" style="color: #d4af37; margin: 0 15px;">Health Status</a>
      </div>
    </div>
  `);
});

// Start listening
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` 👑 Saraswathi Pustaka Vikrayaśāla API Server Started`);
  console.log(` 🌐 URL: http://localhost:${PORT}`);
  console.log(` 📜 Health: http://localhost:${PORT}/api/health`);
  console.log(`=======================================================`);
});
