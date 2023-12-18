/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0d253f",
        "header-button-hover": "rgba(255, 255, 255, 0.1)",
        "header-button-active": "rgba(255,255,255,0.75)",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,.1)",
      },
    },
  },
  plugins: [],
  darkMode: ["class", '[data-mode="dark"]'],
};
