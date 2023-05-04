/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2C3639',
        'secondary': '#3F4E4F',
        'secondary2': '#A27B5C',
        'secondary3': '#DCD7C9',
      },
    },
  },
  plugins: [],
}
