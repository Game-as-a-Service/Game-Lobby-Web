const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['"Noto Sans TC"', "Roboto"],
      },
      width: {
        18: "4.5rem" /** 72px */,
      },
      height: {
        "main-height": "calc(100vh - 100px)",
      },
      aspectRatio: {
        "game-cover": "235 / 156",
      },
      opacity: {
        4: 0.04,
        8: 0.08,
        60: 0.6,
      },
      colors: {
        primary: {
          50: "#F5F2FC",
          100: "#E2D8F7",
          200: "#CEBFEF",
          300: "#AE99E8",
          400: "#8E7BC6",
          500: "#7967B1",
          600: "#645498",
          700: "#4D3E79",
          800: "#362662",
          900: "#2C1B47",
        },
        secondary: {
          50: "#E6F7F5",
          100: "#B4E7E1",
          200: "#80D5CC",
          300: "#46C3B8",
          400: "#00AFA4",
          500: "#009B90",
          600: "#00857C",
          700: "#007067",
          800: "#005A53",
          900: "#00453F",
        },
        error: {
          50: "#FFEEF9",
          100: "#FFCCEC",
          200: "#FFA9DF",
          300: "#FF87D0",
          400: "#F666BF",
          500: "#E546AC",
          600: "#CE2797",
          700: "#B20881",
          800: "#930069",
          900: "#710250",
        },
        grey: {
          50: "#F3F3F5",
          100: "#DDDCE2",
          200: "#C6C5CF",
          300: "#B0AFBC",
          400: "#9B9AA8",
          500: "#868594",
          600: "#717180",
          700: "#5E5D6B",
          800: "#4B4A56",
          900: "#393841",
        },
        basic: {
          white: "#FFFFFF",
          black: "#06020B",
        },
      },
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      /** custom scroll bar */
      addComponents({
        ".scrollbar": {
          "&::-webkit-scrollbar": {
            width: "16px",
          },
          "&::-webkit-scrollbar-thumb": {
            boxShadow: "inset 0 0 8px 8px #7C7BA4",
            border: "solid 4px transparent",
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            boxShadow: "inset 0 0 8px 8px #4C4B6E",
          },
        },
      });
    }),
    plugin(({ addComponents }) => {
      /** typography */
      const largeSizes = [64, 56, 44, 36];
      const mediumSizes = [32, 28, 24, 22, 16, 14, 12];

      largeSizes.forEach((size) => {
        addComponents({
          [`.fz-${size}`]: {
            fontWeight: 400,
            fontSize: size,
            lineHeight: 1.5,
          },
        });
      });
      mediumSizes.forEach((size) => {
        addComponents({
          [`.fz-${size}`]: {
            fontWeight: 400,
            fontSize: size,
            lineHeight: 1.5,
          },
          [`.fz-${size}-b`]: {
            fontWeight: 500,
            fontSize: size,
            lineHeight: 1.5,
          },
        });
      });
    }),
    plugin(({ addUtilities }) => {
      /** gradient background */
      addUtilities({
        ".gradient-purple": {
          "background-image":
            "linear-gradient(132.59deg, #7C7BA4 19.04%, #362662 86.03%)",
        },
        ".gradient-purple-2": {
          "background-image":
            "linear-gradient(132.59deg, #AE99E8 19.04%, #362662 86.03%)",
        },
        ".gradient-purple-3": {
          "background-image":
            "linear-gradient(132.59deg, #8E7BC6 19.04%, #2C1B47 86.03%)",
        },
        ".gradient-black": {
          "background-image":
            "linear-gradient(132.59deg, #06020B 19.04%, #362662 86.03%)",
        },
        ".gradient-light": {
          "background-image":
            "linear-gradient(to right, transparent 0%, rgba(206, 191, 239, 0.1) 1%)",
        },
        ".gradient-cyberpunk": {
          "background-image":
            "linear-gradient(315.43deg, #68FDFA 15%, #E208BF 85%)",
        },
        ".body-bg": {
          "background-image":
            "linear-gradient(145.51deg, #06020B -7.4%, #2C1B47 154.79%)",
        },
        ".glass-shadow": {
          "box-shadow": `
            0 8px 6px rgba(0, 0, 0, 0.05),
            0 1px 1px rgba(255, 255, 255, 0.25),
            0 -1px 1px rgba(255, 255, 255, 0.1)
          `,
        },
        ".shadow-default": {
          "box-shadow": `
            inset 2px 2px 4px rgba(135, 135, 135, 0.1),
            1px 2px 4px rgba(0, 0, 0, 0.1)
          `,
        },
      });
    }),
    plugin(({ addUtilities }) => {
      /** custom border gradient color */
      addUtilities({
        ".border-gradient-purple": {
          "border-image":
            "linear-gradient(132.59deg, #7C7BA4 19.04%, #362662 86.03%) 1",
        },
      });
    }),
    plugin(({ addUtilities }) => {
      /** custom shadow */
      addUtilities({
        ".frosted-shadow-box": {
          "box-shadow": "0 2px 36px -2px #0000002E",
          "backdrop-filter": "blur(20px)",
        },
        ".drop-shadow-secondary": {
          "--tw-drop-shadow": `
            drop-shadow(0px 0px 2px currentColor)
            drop-shadow(0px 0px 4px currentColor)
          `,
          filter:
            "var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)",
        },
      });
    }),
  ],
};
