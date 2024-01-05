/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: { 
        "nunito": ['Nunito', 'sans-serif'],
        "rubik": ['Rubik Scribble', 'sans-serif']
      }
      
    },
  },
  plugins: [],
}

