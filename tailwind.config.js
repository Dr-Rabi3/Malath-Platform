/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      boxShadow: {
        "custom-gray": " 0px 0px 10px 1px #d8d8d887",
      },
      fontFamily: {
        main: ['"Noto Sans Georgian"', "sans-serif"],
        secondary: ['"Roboto Slab"', "serif"],
      },
      colors: {
        accent: {
          25: "#FBFBF3",
        },
        neutral: {
          1000: "#130F2F",
          950: "#3B307D",
          700: "#4A3E98",
        },
        success: {
          500: "#22C55E", // green-500
          100: "#DCFCE7",
        },
        error: {
          500: "#EF4444", // red-500
          100: "#FEE2E2",
        },
        warning: {
          500: "#F59E0B", // amber-500
          100: "#FEF3C7",
        },
        brand: {
          700: "#9A743C",
          600: "#BA9258",
          500: "#BE9C6A",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
