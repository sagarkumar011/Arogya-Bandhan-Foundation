/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#087F5B",
          "green-hover": "#066b4c",
          "green-dark": "#054f38",
          "green-light": "#EAF7F2",
          blue: "#0877C9",
          "blue-hover": "#0663a8",
          "blue-dark": "#054f85",
          "blue-light": "#EAF4FB",
          orange: "#F58220",
          "orange-hover": "#e07212",
          "orange-dark": "#cc650b",
          "orange-light": "#FFF2E8",
          dark: "#0B2F2A",
          text: "#17324D",
          "text-muted": "#587189",
          border: "#DCE5EC",
          surface: "#F8FAFC",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(11, 47, 42, 0.06)",
        card: "0 10px 30px -4px rgba(8, 127, 91, 0.08)",
        "card-hover": "0 20px 40px -6px rgba(8, 127, 91, 0.16)",
        dropdown: "0 10px 25px -5px rgba(23, 50, 77, 0.12)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease-out forwards",
        pulseSlow: "pulseSlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
