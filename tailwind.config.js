export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light mode colors
        'background-light': '#ecf0f3',
        'card-light': '#ecf0f3',
        'text-dark': '#3c3e41',

        // Dark mode colors
        'background-dark': '#212428',
        'card-dark': '#212428',
        'text-light': '#c4cfde',

        // Primary color
        'primary': '#f9004d',
      },
      fontFamily: {
        'display': ['Poppins', 'sans-serif'],
        'body': ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'custom-dark': '10px 10px 19px #1c1e22, -10px -10px 19px #262a2e',
        'custom-light': '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
      },
    },
  },
  plugins: [],
}
