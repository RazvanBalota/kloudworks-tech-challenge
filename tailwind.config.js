/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      padding: {
        DEFAULT: "40px",
        md: "80px",
        lg: "160px",
        // lg: '0',
      },
    },
    extend: {},
  },
  plugins: [],
};
