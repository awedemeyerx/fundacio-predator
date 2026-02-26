import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-libre)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        warm: {
          white: '#FFFFFF',
          sand: '#F7F3EE',
        },
        charcoal: {
          DEFAULT: '#1a1a1a',
          body: '#4a4a4a',
          muted: '#8a8a8a',
        },
        amber: {
          DEFAULT: '#E8722A',
          50: '#FEF3EC',
          100: '#FDE1D0',
          200: '#F9BF9A',
          300: '#F49D65',
          400: '#EE8142',
          500: '#E8722A',
          600: '#C95D1E',
          700: '#A44A18',
          800: '#7F3912',
          900: '#5A280D',
        },
        forest: {
          DEFAULT: '#2D8F6F',
          50: '#EDF7F3',
          100: '#D0ECE2',
          200: '#A3D9C6',
          300: '#6FC1A5',
          400: '#3FA98A',
          500: '#2D8F6F',
          600: '#247459',
          700: '#1C5944',
          800: '#143E30',
          900: '#0D241C',
        },
        gold: {
          DEFAULT: '#C9963B',
          50: '#FAF4E8',
          100: '#F2E4C8',
          200: '#E5C994',
          300: '#D8AE60',
          400: '#C9963B',
          500: '#A87B2E',
          600: '#876224',
          700: '#664A1B',
          800: '#453212',
          900: '#241A09',
        },
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease-out forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;
