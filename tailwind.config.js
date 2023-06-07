const colors = {
  dark29: "#292a2d",
  dark1E: "#1e1f22",
  dark21: "#212123",
  gray2d: "#2D2D2E",
  blue: "#2f88ff",
  blue58: "#5865f2",
  darkRed: "#CC2431",
  green: "#23A55A",
};

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
};
