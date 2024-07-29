import daisyui from "daisyui";
import {nextui} from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {},
    extend: {},
  },
  darkMode: "class",
  plugins: [daisyui, nextui({
    defaultTheme: "dark",
  })],
  daisyui: {
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    theme: "dark",
  },
};
