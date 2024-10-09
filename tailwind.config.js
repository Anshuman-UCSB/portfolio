/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAECD2',
        darkbrown: '#4d4637',
        faded: '#b3aa99',
      },
    },
  },
  plugins: [],
}
