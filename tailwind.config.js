import daisyui from "daisyui";
import {nextui} from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      // 基础颜色
      sub: '#FFFFFFCC',
      transparent: 'transparent',
      current: 'currentColor',
      
      // 黑色系列
      black: {
        DEFAULT: '#000000',
        50: '#f6f6f6',
        100: '#e7e7e7',
        200: '#d1d1d1',
        300: '#b0b0b0',
        400: '#888888',
        500: '#6d6d6d',
        600: '#5d5d5d',
        700: '#4f4f4f',
        800: '#454545',
        900: '#3d3d3d',
        950: '#000000',
      },
      
      // 白色系列
      white: {
        DEFAULT: '#FFFFFF',
        50: '#ffffff',
        100: '#fefefe',
        200: '#fdfdfd',
        300: '#fcfcfc',
        400: '#fafafa',
        500: '#f9f9f9',
        600: '#f8f8f8',
        700: '#f5f5f5',
        800: '#f2f2f2',
        900: '#efefef',
        950: '#ebebeb',
      },
      
      // 灰度系列
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
        950: '#030712',
      },
      
      // 蓝色系列
      blue: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
        950: '#172554',
      },
      
      // 紫色系列
      purple: {
        50: '#faf5ff',
        100: '#f3e8ff',
        200: '#e9d5ff',
        300: '#d8b4fe',
        400: '#c084fc',
        500: '#a855f7',
        600: '#9333ea',
        700: '#7e22ce',
        800: '#6b21a8',
        900: '#581c87',
        950: '#3b0764',
      },
      
      // 绿色系列
      emerald: {
        50: '#ecfdf5',
        100: '#d1fae5',
        200: '#a7f3d0',
        300: '#6ee7b7',
        400: '#34d399',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b',
        950: '#022c22',
      },
      
      // 绿色系列
      green: {
        50: '#f0fdfa',
        100: '#ccfbf1',
        200: '#99f6e4',
        300: '#5eead4',
        400: '#2dd4bf',
        500: '#14b8a6',
        600: '#0d9488',
        700: '#0f766e',
        800: '#115e59',
        900: '#134e4a',
        950: '#042f2e',
      },
      
      // 黄色系列
      yellow: {
        50: '#fefce8',
        100: '#fef9c3',
        200: '#fef08a',
        300: '#fde047',
        400: '#facc15',
        500: '#eab308',
        600: '#ca8a04',
        700: '#a16207',
        800: '#854d0e',
        900: '#713f12',
        950: '#422006',
      },
      
      // 橙色系列
      orange: {
        50: '#fff7ed',
        100: '#ffedd5',
        200: '#fed7aa',
        300: '#fdba74',
        400: '#fb923c',
        500: '#f97316',
        600: '#ea580c',
        700: '#c2410c',
        800: '#9a3412',
        900: '#7c2d12',
        950: '#431407',
      },
      
      // 红色系列
      red: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
        950: '#450a0a',
      },
      
      // 粉色系列
      rose: {
        50: '#fff1f2',
        100: '#ffe4e6',
        200: '#fecdd3',
        300: '#fda4af',
        400: '#fb7185',
        500: '#f43f5e',
        600: '#e11d48',
        700: '#be123c',
        800: '#9f1239',
        900: '#881337',
        950: '#4c0519',
      },
      
      // 青色系列
      cyan: {
        50: '#ecfeff',
        100: '#cffafe',
        200: '#a5f3fc',
        300: '#67e8f9',
        400: '#22d3ee',
        500: '#06b6d4',
        600: '#0891b2',
        700: '#0e7490',
        800: '#155e75',
        900: '#164e63',
        950: '#083344',
      },
    },
    extend: {
      backgroundColor: {
        'black-10': 'rgba(0, 0, 0, 0.1)',
        'black-20': 'rgba(0, 0, 0, 0.2)',
        'black-30': 'rgba(0, 0, 0, 0.3)',
        'black-40': 'rgba(0, 0, 0, 0.4)',
        'black-50': 'rgba(0, 0, 0, 0.5)',
        'black-60': 'rgba(0, 0, 0, 0.6)',
        'black-70': 'rgba(0, 0, 0, 0.7)',
        'black-80': 'rgba(0, 0, 0, 0.8)',
        'black-90': 'rgba(0, 0, 0, 0.9)',
        'white-10': 'rgba(255, 255, 255, 0.1)',
        'white-20': 'rgba(255, 255, 255, 0.2)',
        'white-30': 'rgba(255, 255, 255, 0.3)',
        'white-40': 'rgba(255, 255, 255, 0.4)',
        'white-50': 'rgba(255, 255, 255, 0.5)',
        'white-60': 'rgba(255, 255, 255, 0.6)',
        'white-70': 'rgba(255, 255, 255, 0.7)',
        'white-80': 'rgba(255, 255, 255, 0.8)',
        'white-90': 'rgba(255, 255, 255, 0.9)',
      },
      borderColor: theme => ({
        ...theme('colors'),
        'white-10': 'rgba(255, 255, 255, 0.1)',
        'white-20': 'rgba(255, 255, 255, 0.2)',
        'white-30': 'rgba(255, 255, 255, 0.3)',
      }),
    },
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
