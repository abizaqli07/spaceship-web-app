/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#680285",
        secondary: "#DB00B6",
        secondaryHover: "#F20089",
        primaryHover: "#340159",
        primaryDark: "#110016",
        primaryLight: "#ff00e0",
        secondaryDark: "#10002B",
        ternaryDark: "#240046",
        shade: "#888888",
      },
      fontFamily: {
        poppins: ['Poppins'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
