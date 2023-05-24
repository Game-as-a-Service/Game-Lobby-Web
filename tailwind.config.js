module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./shared/components/**/*.{js,ts,jsx,tsx}",
    "./core/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {},
      backgroundColor: {},
    },
  },
  plugins: [require("@shrutibalasa/tailwind-grid-auto-fit")],
};
