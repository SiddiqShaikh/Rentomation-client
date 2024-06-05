/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        primary: `inset 0 0 0.5px 1px hsla(0, 0%,  
          100%, 0.075),
          /* shadow ring 👇 */
          0 0 0 1px hsla(0, 0%, 0%, 0.05),
          /* multiple soft shadows 👇 */
          0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),
          0 0.9px 1.5px hsla(0, 0%, 0%, 0.045),
          0 3.5px 6px hsla(0, 0%, 0%, 0.09);`,
      },
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
