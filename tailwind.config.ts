import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accentColor: '#282828',
        secondaryColor: '#F0F0F0',
        brandColor: '#76B07B',
      },
    },
  },
  plugins: [],
};
export default config;
