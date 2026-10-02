/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'royal-emerald': {
          50: '#f0f7f4',
          100: '#dceee6',
          200: '#b7dccf',
          500: '#1b4d3e',
          700: '#133d30',
          800: '#0e3328',
          900: '#0b2820',
          950: '#071d17',
        },
        'royal-gold': {
          50: '#fbf8ee',
          100: '#f5edd4',
          200: '#ecd9a7',
          300: '#dfbf72',
          400: '#d4af37',
          500: '#c59b27',
          600: '#a67d1a',
          700: '#845f14',
          800: '#694a15',
        },
        'parchment': {
          50: '#fdfcf9',
          100: '#faf7f2',
          200: '#f4ede2',
          300: '#ebe1d0',
          400: '#decbb2',
          900: '#2c251d',
        }
      },
      fontFamily: {
        'serif': ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        'display': ['"Playfair Display"', 'Georgia', 'serif'],
        'crest': ['"Cinzel"', 'serif'],
        'sans': ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'royal': '0 10px 30px -5px rgba(11, 40, 32, 0.15), 0 0 0 1px rgba(212, 175, 55, 0.2)',
        'royal-lg': '0 20px 40px -10px rgba(11, 40, 32, 0.25), 0 0 0 1px rgba(212, 175, 55, 0.3)',
        'book': '5px 5px 20px rgba(0, 0, 0, 0.2), -2px 0 5px rgba(0, 0, 0, 0.1)',
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.35)',
      }
    },
  },
  plugins: [],
}
