/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "from-top-left": {
          "0%": { transform: "translate(-100%, -100%)", opacity: "1" },
          "100%": { transform: "translate(0, 0)", opacity: "1" },
        },
        "from-bottom-right": {
          "0%": { transform: "translate(+100%, +100%)", opacity: "1" },
          "100%": { transform: "translate(0, 0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "from-top-left":
          "from-top-left 2s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "from-bottom-right":
          "from-bottom-right 2s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "fade-in": "fade-in 1s ease-in-out forwards",
      },
      colors: {
        cream: "#FAECD2",
        darkbrown: "#4d4637",
        faded: "#b3aa99",
      },
    },
  },
  plugins: [require("tailwindcss-animation-delay")],
};
