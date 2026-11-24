/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#121214',
          subtle: '#18181b',
          card: '#1d1d20',
          border: '#27272a',
          hover: '#2a2a2e',
        },
        brand: {
          DEFAULT: '#e50914',
          hover: '#cc0812',
          subtle: 'rgba(229, 9, 20, 0.12)',
        }
      },
      fontFamily: {
        sans: [
          'Plus Jakarta Sans',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
