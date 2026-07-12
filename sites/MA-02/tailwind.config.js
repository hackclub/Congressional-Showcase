/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'ice': '#B9D6F2',
        'navy': '#061A40',
        'royal': '#0353A4',
        'ocean': '#006DAA',
        'sapphire': '#003559',
      },
      fontFamily: {
        'sans': ['Inter', 'SF Pro Display', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        'tight': '-0.02em',
      },
      backdropBlur: {
        'md': '12px',
      },
    },
  },
  plugins: [],
}
