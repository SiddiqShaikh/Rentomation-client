/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Define your custom colors here
        primary: "#151110",
        mainBg: "#151110",
        btnPrimary: "#E1AD1D",
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
          // Add more shades as needed
        },
      },
    },
  },
  plugins: [],
};
