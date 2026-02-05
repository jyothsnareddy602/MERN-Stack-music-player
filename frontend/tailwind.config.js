/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  safelist: [
    // Add any classes you want Tailwind to always include
    "bg-gray-900",
    "text-white",
    "flex",
    "p-4"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
