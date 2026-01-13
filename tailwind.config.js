/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // Sobrescribir la fuente por defecto de Tailwind con la fuente MonaSans
      fontFamily: {
        'regular': ['MonaSans-Regular', 'sans-serif'],
        'light': ['MonaSans-Light', 'sans-serif'],
        'medium': ['MonaSans-Medium', 'sans-serif'],
        'semibold': ['MonaSans-SemiBold', 'sans-serif'],
        'bold': ['MonaSans-Bold', 'sans-serif'],
        'extrabold': ['MonaSans-ExtraBold', 'sans-serif'],
        'black': ['MonaSans-Black', 'sans-serif'],
      },
    },
  },
  plugins: [
    plugin(function({ addBase }) {
      addBase({
        'body': {
          fontFamily: 'MonaSans-Regular !important',
        },
      });
    }),
  ],
}