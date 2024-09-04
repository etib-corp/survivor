const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        'background': '#F5F6FA',
        'blueT': '#2263B3',
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    require('flowbite/plugin')({
      charts: true,
  }),],
};
