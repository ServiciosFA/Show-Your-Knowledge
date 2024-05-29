/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-primary": "#8E2A79",
        "color-secondary": "#FE7E36",
        "color-bg-seconday": "#200E38",
        "color-bg-primary": "#1B161E",
        "color-text": "#FFFFFF",
        "color-text-secondary": "#FFFFFF", //60& opacity
        "color-text-thirdy": "#a7aaad",
        "color-bg-thirdy": "#222B32",
        "color-bg-fourth": "#3a0c4a",
        "color-bg-contact": "#262323",
        "color-bg-contact-input": "#d9d9d9",
        "color-bg-input-primary": "#3C1F41",
      },
      backgroundImage: {
        "custom-image": "url('./assets/fondoproyectos.jpg')",
      },
      fontFamily: {
        Kodchasan: ["Kodchasan", ...defaultTheme.fontFamily.sans],
        LondrinaOutline: ["Londrina Outline", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
