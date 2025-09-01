/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      boxShadow: {
        "custom-gray": " 0px 0px 10px 1px #d8d8d887",
      },
      fontFamily: {
        main: ["DG Baysan", "sans-serif"],
        secondary: ["DG Baysan", "sans-serif"],
        barlow: ["DG Baysan", "sans-serif"],
        bigVesta: ["BigVesta Arabic", "sans-serif"],
      },
      colors: {
        accent: {
          25: "#FBFBF3",
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          50: "#F7F8E6",
        },
        neutral: {
          700: "#666666",
          950: "#4D4D4D",
          1000: "#000000",
        },
        success: {
          100: "#DCFCE7",
          500: "#22C55E",
        },
        error: {
          100: "#FEE2E2",
          500: "#EF4444",
        },
        warning: {
          100: "#FEF3C7",
          500: "#F59E0B",
        },
        brand: {
          200: "#E0D4C2",
          500: "#BE9C6A",
          600: "#BA9258",
          700: "#9A743C",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
