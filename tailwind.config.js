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
          DEFAULT: '#006B8F',
          50: '#E6F4F8',
          100: '#CCE9F1',
          200: '#99D3E3',
          300: '#66BDD5',
          400: '#33A7C7',
          500: '#0091B9',
          600: '#006B8F',
          700: '#00527A',
          800: '#003D5C',
          900: '#00293D',
        },
        accent: {
          DEFAULT: '#00A3CC',
          50: '#E6F7FB',
          100: '#CCEFF7',
          200: '#99DFEF',
          300: '#66CFE7',
          400: '#33BFDF',
          500: '#00A3CC',
          600: '#008AB3',
          700: '#006F99',
          800: '#005580',
          900: '#003B66',
        },
        brand: {
          teal: '#006B8F',
          cyan: '#00A3CC',
          black: '#0A0A0A',
        },
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(0, 107, 143, 0.08)',
        'soft-lg': '0 20px 60px -15px rgba(0, 107, 143, 0.12)',
        'colored-blue': '0 10px 40px -10px rgba(0, 163, 204, 0.15)',
        'colored-teal': '0 10px 40px -10px rgba(0, 107, 143, 0.2)',
        'glow': '0 0 20px rgba(0, 163, 204, 0.4)',
        'brand': '0 8px 32px -8px rgba(0, 107, 143, 0.25)',
      },
    },
  },
  plugins: [],
};
