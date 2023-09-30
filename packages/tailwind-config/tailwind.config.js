/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    './**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
