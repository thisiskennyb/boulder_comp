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
      },
      colors: {
        night: "#0A0A0A", // Main — background, alternate logo
        white: "#FFFFFF", // Main — text, logo, icons
        jet: "#2D2D2A",   // Dark accent — misc.
        gray: "#797979", // Light Accent -- misc
        linen: "#F3E9DC", // Accent -- new hyperlinks
        isabel: "#FAF5F0" // followed hyperlinks
      },
      
    },
  },
  plugins: [],
}

