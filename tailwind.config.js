import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'index.html',
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      black: '#000000',
      gray: colors.gray,
      red1: '#E65C5C',
      blue1: '#5C93E6',
      blue2: '#6CB2FF',
      green1: '#5CE66A',
      cyan1: '#81EEDB',
      yellow1: '#EBF000',
    },
    extend: {},
  },
  plugins: [],
}
