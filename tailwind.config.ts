import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        'landing-box' : '34rem',
        '100' : '28rem'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'tekhelet': '#532B88',
        'magnolia': '#F4EFFA',
        'russian-violet': '#2f184b',
        'amethyst': '#9B72CF',
        'wisteria': '#C8B1E4',
        'menu-white' : '#f9f9f9'
      },
    },
  },
  plugins: [],
}
export default config
