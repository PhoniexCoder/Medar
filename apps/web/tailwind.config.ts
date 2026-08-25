import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060E1A',
          900: '#0A192F',
          850: '#0E223D',
          800: '#142C4C',
          700: '#1F3F68',
          100: '#E2E8F0'
        },
        parchment: {
          50: '#FCFAF6',
          100: '#F7F5EE',
          200: '#EFECE2',
          300: '#E4DFD0',
          800: '#2C3539',
          900: '#1A2328'
        },
        gold: {
          300: '#E6C66D',
          400: '#D4AF37',
          500: '#C59B27',
          600: '#B8933E',
          700: '#9B7828'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace']
      }
    }
  },
  plugins: []
};

export default config;
