/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#174A5B',
          hover: '#1C586C',
        },
        background: '#F7F8F8',
        text: {
          primary: '#1C1E21',
          secondary: '#60646C',
        },
      },
    },
  },
  plugins: [],
}
