/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: ['./**/*.{js,ts,jsx,tsx}', '../../packages/ui/src/components/**/*.{ts,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-themer')({ // eslint-disable-line
      defaultTheme: {
        extend: {
          colors: {
            primary: 'indigo',
          },
        },
      },
      themes: [],
    }),
  ],
};
