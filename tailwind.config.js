import { nextui } from "@nextui-org/react";
import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,tsx,jsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      // 基础颜色
      sub: "#FFFFFFCC",
      transparent: "transparent",
      current: "currentColor",

      // 黑色系列
      black: {
        DEFAULT: "#000000",
        50: "#f6f6f6",
        100: "#e7e7e7",
        200: "#d1d1d1",
        300: "#b0b0b0",
        400: "#888888",
        500: "#6d6d6d",
        600: "#5d5d5d",
        700: "#4f4f4f",
        800: "#454545",
        900: "#3d3d3d",
        950: "#000000",
      },

      // 白色系列
      white: {
        DEFAULT: "#FFFFFF",
        50: "#ffffff",
        100: "#fefefe",
        200: "#fdfdfd",
        300: "#fcfcfc",
        400: "#fafafa",
        500: "#f9f9f9",
        600: "#f8f8f8",
        700: "#f5f5f5",
        800: "#f2f2f2",
        900: "#efefef",
        950: "#ebebeb",
      },

      // 灰度系列
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
        950: "#030712",
      },

      // 蓝色系列
      blue: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
        950: "#172554",
      },

      // 紫色系列
      purple: {
        50: "#faf5ff",
        100: "#f3e8ff",
        200: "#e9d5ff",
        300: "#d8b4fe",
        400: "#c084fc",
        500: "#a855f7",
        600: "#9333ea",
        700: "#7e22ce",
        800: "#6b21a8",
        900: "#581c87",
        950: "#3b0764",
      },

      // 绿色系列
      emerald: {
        50: "#ecfdf5",
        100: "#d1fae5",
        200: "#a7f3d0",
        300: "#6ee7b7",
        400: "#34d399",
        500: "#10b981",
        600: "#059669",
        700: "#047857",
        800: "#065f46",
        900: "#064e3b",
        950: "#022c22",
      },

      // 绿色系列
      green: {
        50: "#f0fdfa",
        100: "#ccfbf1",
        200: "#99f6e4",
        300: "#5eead4",
        400: "#2dd4bf",
        500: "#14b8a6",
        600: "#0d9488",
        700: "#0f766e",
        800: "#115e59",
        900: "#134e4a",
        950: "#042f2e",
      },

      // 黄色系列
      yellow: {
        50: "#fefce8",
        100: "#fef9c3",
        200: "#fef08a",
        300: "#fde047",
        400: "#facc15",
        500: "#eab308",
        600: "#ca8a04",
        700: "#a16207",
        800: "#854d0e",
        900: "#713f12",
        950: "#422006",
      },

      // 橙色系列
      orange: {
        50: "#fff7ed",
        100: "#ffedd5",
        200: "#fed7aa",
        300: "#fdba74",
        400: "#fb923c",
        500: "#f97316",
        600: "#ea580c",
        700: "#c2410c",
        800: "#9a3412",
        900: "#7c2d12",
        950: "#431407",
      },

      // 红色系列
      red: {
        50: "#fef2f2",
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d",
        950: "#450a0a",
      },

      // 粉色系列
      rose: {
        50: "#fff1f2",
        100: "#ffe4e6",
        200: "#fecdd3",
        300: "#fda4af",
        400: "#fb7185",
        500: "#f43f5e",
        600: "#e11d48",
        700: "#be123c",
        800: "#9f1239",
        900: "#881337",
        950: "#4c0519",
      },

      // 青色系列
      cyan: {
        50: "#ecfeff",
        100: "#cffafe",
        200: "#a5f3fc",
        300: "#67e8f9",
        400: "#22d3ee",
        500: "#06b6d4",
        600: "#0891b2",
        700: "#0e7490",
        800: "#155e75",
        900: "#164e63",
        950: "#083344",
      },

      // 新增颜色系列
      // 靛蓝色系列
      indigo: {
        50: "#eef2ff",
        100: "#e0e7ff",
        200: "#c7d2fe",
        300: "#a5b4fc",
        400: "#818cf8",
        500: "#6366f1",
        600: "#4f46e5",
        700: "#4338ca",
        800: "#3730a3",
        900: "#312e81",
        950: "#1e1b4b",
      },

      // 石板灰系列
      slate: {
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
        950: "#020617",
      },

      // 粉红色系列
      pink: {
        50: "#fdf2f8",
        100: "#fce7f3",
        200: "#fbcfe8",
        300: "#f9a8d4",
        400: "#f472b6",
        500: "#ec4899",
        600: "#db2777",
        700: "#be185d",
        800: "#9d174d",
        900: "#831843",
        950: "#500724",
      },

      // 紫红色系列
      fuchsia: {
        50: "#fdf4ff",
        100: "#fae8ff",
        200: "#f5d0fe",
        300: "#f0abfc",
        400: "#e879f9",
        500: "#d946ef",
        600: "#c026d3",
        700: "#a21caf",
        800: "#86198f",
        900: "#701a75",
        950: "#4a044e",
      },

      // 天蓝色系列
      sky: {
        50: "#f0f9ff",
        100: "#e0f2fe",
        200: "#bae6fd",
        300: "#7dd3fc",
        400: "#38bdf8",
        500: "#0ea5e9",
        600: "#0284c7",
        700: "#0369a1",
        800: "#075985",
        900: "#0c4a6e",
        950: "#082f49",
      },

      // 石灰色系列
      lime: {
        50: "#f7fee7",
        100: "#ecfccb",
        200: "#d9f99d",
        300: "#bef264",
        400: "#a3e635",
        500: "#84cc16",
        600: "#65a30d",
        700: "#4d7c0f",
        800: "#3f6212",
        900: "#365314",
        950: "#1a2e05",
      },

      // 琥珀色系列
      amber: {
        50: "#fffbeb",
        100: "#fef3c7",
        200: "#fde68a",
        300: "#fcd34d",
        400: "#fbbf24",
        500: "#f59e0b",
        600: "#d97706",
        700: "#b45309",
        800: "#92400e",
        900: "#78350f",
        950: "#451a03",
      },

      // 蓝绿色系列
      teal: {
        50: "#f0fdfa",
        100: "#ccfbf1",
        200: "#99f6e4",
        300: "#5eead4",
        400: "#2dd4bf",
        500: "#14b8a6",
        600: "#0d9488",
        700: "#0f766e",
        800: "#115e59",
        900: "#134e4a",
        950: "#042f2e",
      },

      // 紫罗兰色系列
      violet: {
        50: "#f5f3ff",
        100: "#ede9fe",
        200: "#ddd6fe",
        300: "#c4b5fd",
        400: "#a78bfa",
        500: "#8b5cf6",
        600: "#7c3aed",
        700: "#6d28d9",
        800: "#5b21b6",
        900: "#4c1d95",
        950: "#2e1065",
      },
    },
    extend: {
      backgroundColor: {
        "black-10": "rgba(0, 0, 0, 0.1)",
        "black-20": "rgba(0, 0, 0, 0.2)",
        "black-30": "rgba(0, 0, 0, 0.3)",
        "black-40": "rgba(0, 0, 0, 0.4)",
        "black-50": "rgba(0, 0, 0, 0.5)",
        "black-60": "rgba(0, 0, 0, 0.6)",
        "black-70": "rgba(0, 0, 0, 0.7)",
        "black-80": "rgba(0, 0, 0, 0.8)",
        "black-90": "rgba(0, 0, 0, 0.9)",
        "white-10": "rgba(255, 255, 255, 0.1)",
        "white-20": "rgba(255, 255, 255, 0.2)",
        "white-30": "rgba(255, 255, 255, 0.3)",
        "white-40": "rgba(255, 255, 255, 0.4)",
        "white-50": "rgba(255, 255, 255, 0.5)",
        "white-60": "rgba(255, 255, 255, 0.6)",
        "white-70": "rgba(255, 255, 255, 0.7)",
        "white-80": "rgba(255, 255, 255, 0.8)",
        "white-90": "rgba(255, 255, 255, 0.9)",
      },
      borderColor: (theme) => ({
        ...theme("colors"),
        "white-10": "rgba(255, 255, 255, 0.1)",
        "white-20": "rgba(255, 255, 255, 0.2)",
        "white-30": "rgba(255, 255, 255, 0.3)",
      }),
    },
  },
  darkMode: "class",
  plugins: [
    plugin(function ({ addComponents }) {
      const fonts = ["unbounded", "teacher"];
      const sizes = [12, 14, 16, 18, 20, 22, 24, 30, 32, 36, 48, 64, 72, 96, 128, 196, 180];
      const weights = {
        thin: 100,
        extralight: 200,
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      };

      const sizePairs = [
        { mobile: 36, desktop: 180 },
        { mobile: 24, desktop: 36 },
        { mobile: 24, desktop: 64 },
        { mobile: 16, desktop: 20 },
        { mobile: 16, desktop: 24 },
        { mobile: 16, desktop: 32 },
        { mobile: 16, desktop: 48 },
        { mobile: 18, desktop: 48 },
        { mobile: 18, desktop: 36 },
        { mobile: 20, desktop: 24 },
        { mobile: 20, desktop: 32 },
        { mobile: 20, desktop: 40 },
        { mobile: 20, desktop: 48 },
        { mobile: 24, desktop: 32 },
        { mobile: 32, desktop: 30 },
        { mobile: 32, desktop: 36 },
        { mobile: 32, desktop: 180 },
        { mobile: 32, desktop: 64 },
        { mobile: 36, desktop: 64 },
        { mobile: 36, desktop: 96 },
        { mobile: 48, desktop: 96 },
        { mobile: 48, desktop: 180 },
        { mobile: 72, desktop: 120 },
      ];

      let components = {};



      // {family}-{size}: 只指定字体和字号
      // {family}-{size}-{weight}: 指定字体、字号和字重
      // {family}-{mobile-size}-{desktop-size}-{weight}: 指定字体、响应式字号和字重
      fonts.forEach((font) => {
        // 标准字号 - 无字重版本
        sizes.forEach((size) => {
          components[`.${font}-${size}`] = {
            fontFamily: `${font}`,
            fontSize: `${size/16}rem`,
            textTransform: 'uppercase',
          };
        });
        
        // 标准字号 - 有字重版本
        sizes.forEach((size) => {
          Object.entries(weights).forEach(([name, weight]) => {
            components[`.${font}-${size}-${weight}`] = {
              fontFamily: `${font}`,
              fontSize: `${size/16}rem`,
              fontWeight: weight,
              textTransform: 'uppercase',
            };
          });
        });
                
        // 响应式字号 - 有字重版本
        sizePairs.forEach(pair => {
          Object.entries(weights).forEach(([name, weight]) => {
            components[`.${font}-${pair.mobile}-${pair.desktop}-${weight}`] = {
              fontFamily: `${font}`,
              fontSize: `${pair.mobile/16}rem`,
              fontWeight: weight,
              '@screen lg': {
                fontSize: `${pair.desktop/16}rem`
              },
              textTransform: 'uppercase',
            };
          });
        });
      });
  
      addComponents(components);
    }),
    nextui({
      defaultTheme: "dark",
      themes: {
        dark: {
          colors: {
            lightBrand: "#19FFE0",
            success: "#75FF52",
            error: "#FF5953",
            danger: "#EA4335",
            warning: "#F0AE52",
          },
        },
      },
    }),
  ],
};
