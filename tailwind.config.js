/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        mustard: {
          DEFAULT: '#E9A12A',
          50:  'rgba(233,161,42,0.08)',
          100: 'rgba(233,161,42,0.15)',
          200: 'rgba(233,161,42,0.25)',
          400: '#C8891A',
          600: '#A06E10',
        },
        ink: {
          950: '#080808',
          900: '#0E0E0E',
          800: '#161616',
          700: '#1E1E1E',
          600: '#272727',
          500: '#333333',
        },
        warm: {
          100: '#F2EDE6',
          200: '#C8BFB4',
          400: '#8A8078',
          600: '#504840',
        },
      },
      boxShadow: {
        'mustard-sm': '0 0 0 1px rgba(233,161,42,0.25)',
        'mustard':    '0 0 20px rgba(233,161,42,0.15)',
        'mustard-lg': '0 0 40px rgba(233,161,42,0.2)',
      },
    },
  },
  plugins: [],
}
