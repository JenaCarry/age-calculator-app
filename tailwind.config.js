/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        purple: "#854dff",
        "Light-red": "#ff5757",
        "off-white": "#f0f0f0",
        "light-grey": "#dbdbdb",
        "smoke-grey": "#716f6f",
        "off-black": "#141414",
      },
      borderRadius: {
        large: "8rem",
      },
    },
  },
  plugins: [],
};
