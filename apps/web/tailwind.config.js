/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
    '../../packages/form-builder/**/*.{js,ts,jsx,tsx}',
    '../../packages/data-table/**/*.{js,ts,jsx,tsx}',
    '../../packages/blog-app/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}