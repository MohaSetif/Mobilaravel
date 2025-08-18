/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#54C392',
        background: {
          base: '#202123',
          lighter: '#484a4e',
          light: '#333437',
          dark: '#212123',
        },
        error: '#EF4444',
        success: '#22C55E',
      },
    },
  },
  plugins: [],
}
