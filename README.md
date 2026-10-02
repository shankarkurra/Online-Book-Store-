# 👑 Saraswathi Pustaka Vikrayaśāla (సరస్వతి పుస్తక విక్రయశాల)

> **Royal Heritage Book Emporium & Digital Archive**  
> Built with the **MERN** Stack (MongoDB, Express, React, Node.js). Designed with royal Indian heritage aesthetics infused with the modern, elegant layout inspired by the imperial bookhouse theme.

---

## 🏛️ Project Structure

The project is cleanly split into two dedicated directories:

```
saraswathi-pustaka-vikrayasala/
├── backend/                  # Node.js, Express, MongoDB REST API
│   ├── config/
│   │   └── db.js             # Resilient database connection with local fallback
│   ├── controllers/
│   │   ├── bookController.js # Search, filter, category, showcase
│   │   └── orderController.js# Order placement, royal receipt generation
│   ├── models/
│   │   ├── Book.js           # Book Schema (pricing, badges, Telugu titles)
│   │   └── Order.js          # Order Schema (items, patron info, payments)
│   ├── routes/
│   │   ├── bookRoutes.js     # /api/books
│   │   └── orderRoutes.js    # /api/orders
│   ├── data/
│   │   └── seedBooks.js      # Curated world bestsellers & royal Indian epics
│   ├── .env                  # Port & MongoDB URI configuration
│   ├── package.json
│   └── server.js             # Express server entry point
│
└── frontend/                 # React 18, Vite, Tailwind CSS, Lucide icons
    ├── index.html            # Royal Google Fonts: Cormorant Garamond, Playfair Display, Cinzel
    ├── tailwind.config.js    # Royal emerald & imperial gold color definitions
    ├── vite.config.js        # Backend API proxy configuration
    └── src/
        ├── components/
        │   ├── TopAnnouncementBar.jsx # Announcement bar with trust metrics & currency switch
        │   ├── Navbar.jsx             # Royal emblem logo, category navigation, search, cart badge
        │   ├── HeroSection.jsx        # Reference-matching hero: "Discover Your Next Great Read"
        │   ├── CategoryBrowse.jsx     # "— BROWSE BY CATEGORY —" with circular icons
        │   ├── Bestsellers.jsx        # Bestseller grid with badges and instant add to cart
        │   ├── WhyChooseUs.jsx        # Deep emerald section with 4 gold pillars
        │   ├── PromoBanner.jsx        # 20% discount offer with coupon code `RAJA20`
        │   ├── LatestArrivals.jsx     # Latest releases & reprints section
        │   ├── CatalogueSection.jsx   # Live search, category filtering & sorting
        │   ├── BookModal.jsx          # Quick view with synopsis and format specifications
        │   ├── CartDrawer.jsx         # Slide-over cart with coupon code application
        │   ├── CheckoutModal.jsx      # Royal checkout with UPI / Card payment & receipt
        │   ├── Footer.jsx             # Deep emerald footer with Sanskrit motto & payment badges
        │   └── Toast.jsx              # Regal toast notification banner
        ├── context/
        │   └── CartContext.jsx        # Reactive cart, coupon, and currency state
        ├── services/
        │   └── api.js                 # API endpoints with automatic fallback
        ├── App.jsx
        ├── main.jsx
        └── index.css                  # Custom gold foil gradients & scrollbars
```

---

## 🎨 Theme & Typography

- **Colors**:
  - **Royal Emerald**: `#0b2820`, `#0e3328`, `#091f18`
  - **Imperial Gold**: `#d4af37`, `#c59b27`, `#ecd9a7`
  - **Warm Parchment**: `#faf7f2`, `#f4ede2`
- **Typography**:
  - **Headings & Hero**: *Cormorant Garamond* & *Playfair Display* (featuring the signature italic calligraphic emphasis e.g., *"Great Read"*)
  - **Crest / Brand**: *Cinzel*
  - **Body & UI**: *Plus Jakarta Sans*

---

## 🚀 How to Run

### 1. Start the Backend API Server
```bash
cd backend
npm install
npm start
```
*Server starts on `http://localhost:5000`*

### 2. Start the Frontend React Client
```bash
cd frontend
npm install
npm run dev
```
*Client opens on `http://localhost:5173`*

---

## 🎁 Special Features
1. **Interactive Cart & Drawer**: Click on the shopping bag in the navbar or on any book card to open the slide-out cart.
2. **20% Off Coupon**: Use coupon code **`RAJA20`** or **`BOOK20`** in the promo banner or cart to unlock a 20% royal discount.
3. **Currency Toggle**: Easily switch between **$ USD** and **₹ INR** in the top announcement bar.
4. **Instant Royal Receipt**: Completing checkout generates a downloadable and printable royal certificate of purchase with unique order numbers.
