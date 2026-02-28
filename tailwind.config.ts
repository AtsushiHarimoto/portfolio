import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        moyin: {
          // Brand: 暗紫灰系列 (60%)
          dark: '#1a1625',
          'dark-light': '#2d2433',
          'dark-lighter': '#3d3447',
          'dark-hover': '#4e4556',
          // Brand: 櫻花粉系列 (10%)
          pink: '#ffc0d3',
          'pink-light': '#f0c4d8',
          'pink-dark': '#c096b4',
          'petal': '#e8b4d4',
          // Brand: accent
          purple: '#6c5ce7',
          accent: '#a78bfa',
          // Brand: 月光藍系列 (30%)
          'text-primary': '#e8eef5',
          'text-secondary': '#b8c5d6',
          'text-hint': '#9fafc4',
          'text-muted': '#8699b2',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Noto Sans JP',
          'Noto Sans TC',
          'sans-serif',
        ],
        serif: [
          'Playfair Display',
          'Source Han Serif',
          'Georgia',
          'serif',
        ],
        mono: ['JetBrains Mono', 'Cascadia Code', 'Consolas', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'sakura-fall': 'sakuraFall 10s linear infinite',
        'breathing': 'breathingGlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        sakuraFall: {
          '0%': { transform: 'translateY(-10%) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
        },
        breathingGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
