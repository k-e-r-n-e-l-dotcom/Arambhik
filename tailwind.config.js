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
          DEFAULT: '#F4B400',
          50: '#FEF8E7',
          100: '#FDF1CF',
          200: '#FBE39F',
          300: '#F9D56F',
          400: '#F7C73F',
          500: '#F4B400',
          600: '#C49000',
          700: '#936C00',
          800: '#624800',
          900: '#312400',
        },
        accent: {
          DEFAULT: '#F37021',
          50: '#FEF0E8',
          100: '#FDE1D1',
          200: '#FBC3A3',
          300: '#F9A575',
          400: '#F78747',
          500: '#F37021',
          600: '#C45512',
          700: '#93400D',
          800: '#622B09',
          900: '#311604',
        },
        brand: {
          gold: '#F4B400',
          orange: '#F37021',
          darkOrange: '#C45512',
          darkBg: '#1F2937',
        },
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(243, 112, 33, 0.08)',
        'soft-lg': '0 20px 60px -15px rgba(243, 112, 33, 0.12)',
        'colored-blue': '0 10px 40px -10px rgba(244, 180, 0, 0.15)',
        'colored-teal': '0 10px 40px -10px rgba(243, 112, 33, 0.2)',
        'glow': '0 0 20px rgba(243, 112, 33, 0.4)',
        'brand': '0 8px 32px -8px rgba(243, 112, 33, 0.25)',
      },
    },
  },
  plugins: [],
};
