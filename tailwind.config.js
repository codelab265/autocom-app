/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e36414",
        secondary: "#0f4c5c",
        third: "#606c38",
      },
    },
    fontFamily: {
      Poppins_400: "Poppins_400Regular",
      Poppins_500: "Poppins_500Medium",
      Poppins_600: "Poppins_600SemiBold",
      Poppins_700: "Poppins_700Bold",
    },
  },
  plugins: [],
};
