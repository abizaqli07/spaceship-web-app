/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#680285",
        primaryHover: "#340159",
        primaryDark: "#110016",
        primaryLight: "#ff00e0",
        secondaryDark: "#000000",
        shade: "#888888",
      },
      fontFamily: {
        poppins: ['Poppins'],
      }
    },
  },
  plugins: [],
};
