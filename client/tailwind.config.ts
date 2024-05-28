import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/_components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        slidein: {
          '0%': {
            transform: 'translateX(0%)',
          },
          '100%': {
            transform: 'translateX(-100%)',
          },
        },
        fadein: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '0.7',
          },
        },
      },
      animation: {
        slidein: 'slidein 500ms ease-in forwards',
        fadein: 'fadein 500ms ease-in forwards',
      },
    },
  },
  plugins: [],
};
export default config;
