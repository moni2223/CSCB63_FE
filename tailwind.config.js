/** @type {import('tailwindcss').Config} */

/*eslint-disable*/
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1F55E6",
        secondary: '#002C78',
        // ...
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      animation: {
        bounce: "bounce 0.6s infinite",
      },
      height: {
        "1/10": "10%",
        "2/10": "20%",
        "3/10": "30%",
        "4/10": "40%",
        "5/10": "50%",
        "6/10": "60%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%",
        "1/8": "12.5%",
        "2/8": "25%",
        "3/8": "37.5%",
        "1/12": "8.2%",
      },
      maxWidth: {
        "1/10": "10%",
        "2/10": "20%",
        "3/10": "30%",
        "4/10": "40%",
        "5/10": "50%",
        "6/10": "60%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%",
        "1/8": "12.5%",
      },
      width: {
        "1/10": "10%",
        "2/10": "20%",
        "3/10": "30%",
        "4/10": "40%",
        "5/10": "50%",
        "6/10": "60%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%",
        "1/8": "12.5%",
      },
      borderWidth: {
        DEFAULT: "1px",
      },
      boxShadow: {
        sm: "0px 15px 15px 0px #002d5f26",
      },
      boxShadow: {
        custom: "0 3px 6px rgba(0, 0, 0, 0.05)", // Your custom shadow
      },
      borderRadius: {
        half: "50%",
      },
    },
    screens: {
      "3xl": "3440px",
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
