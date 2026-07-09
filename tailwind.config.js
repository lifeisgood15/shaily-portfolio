/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          light: '#fdfbf7', // Very subtle off-white for background
          DEFAULT: '#f9f6ef', // Main paper background
          dark: '#e8e4d9'     // Borders or shadowed areas
        },
        ink: {
          light: '#4b4b4b', // Muted text
          DEFAULT: '#2c2c2c', // Main text
          dark: '#1a1a1a'     // Headings
        },
        tape: {
          pink: '#ffd1dc',
          blue: '#cce2cb',
          yellow: '#fdfd96'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // The user requested sans-serif everywhere
      },
      boxShadow: {
        'scrapbook': '2px 3px 6px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.08)',
        'photo': '4px 4px 0px rgba(0,0,0,0.1)',
      }
    },
  },
  plugins: [],
}
