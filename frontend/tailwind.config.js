/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: { 
        "nunito": ['Nunito', 'sans-serif'],
        "nunito-black": ['Nunito Black', 'sans-serif'],
        "rubik": ['Rubik Scribble', 'sans-serif']
      },
      colors: {
        night: "#0A0A0A", // Main — background, alternate logo
        white: "#FFFFFF", // Main — text, logo, icons
        jet: "#2D2D2A",   // Dark accent — misc.
        lightgray: "#D3D3D3", // Light Accent -- misc
        linen: "#01A7C2", // Accent -- new hyperlinks
        isabel: "#FAF5F0" // followed hyperlinks
      },
      
    },
  },
  plugins: [],
}

