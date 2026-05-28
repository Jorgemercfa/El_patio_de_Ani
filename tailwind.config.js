const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  important: '#app',
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          pink:    '#E91E81',
          blue:    '#2D3E94',
          yellow:  '#FFD200',
          purple:  '#7B2D8B',
          indigo:  '#5C6BC0',
          'pink-dark': '#C2185B',
          'orange-accent': '#FF9800',
        },
        whatsapp: '#25D366',
        'cart-red': '#ff4757',
        'shows-bg':  '#FFF9C4',
        'games-bg':  '#E8F5E9',
        'juegos-bg': '#E3F2FD',
        'snacks-bg': '#FFF3E0',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0,0,0,0.08)',
        'pink': '0 4px 16px rgba(233,30,129,0.15)',
        'pink-lg': '0 10px 28px rgba(233,30,129,0.22)',
      },
    },
  },
  plugins: [],
}
