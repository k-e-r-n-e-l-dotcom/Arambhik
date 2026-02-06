/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0F172A',
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          800: '#1E293B',
          900: '#0F172A',
        },
        accent: {
          DEFAULT: '#F59E0B',
          100: '#FEF3C7',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(15, 23, 42, 0.08)',
        'soft-lg': '0 20px 60px -15px rgba(15, 23, 42, 0.12)',
        'colored-blue': '0 10px 40px -10px rgba(59, 130, 246, 0.15)',
        'colored-amber': '0 10px 40px -10px rgba(245, 158, 11, 0.15)',
        'glow': '0 0 20px rgba(245, 158, 11, 0.4)',
      },
    },
  },
  plugins: [],
};
