/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'deep-teal': '#002126',
        'sky-teal': '#7ADEED',
        'sage-mint': '#A1EBCA',
        'teal-accent': '#1A99A0',
        'emerald': '#008D51',
        'off-white': '#F7FBFA',
        'body-gray': '#4A5C5E',
        'border-mist': '#D9ECE9',
      },
      backgroundImage: {
        'atmosphere-gradient': 'linear-gradient(135deg, #7ADEED, #A1EBCA)',
        'current-gradient': 'linear-gradient(135deg, #1A99A0, #008D51)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'pill': '9999px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backdropBlur: {
        'glass': '12px',
      },
    },
  },
  plugins: [],
};
