/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'purplehover': '#343297',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'blue': '#5287f5',
      'black':"#001524",
      'gray':"#050a14"
    },
    extend: {
      backgroundImage: {
        'home': "url('/public/images/Bg-home.jpg')",
        'footer-texture': "url('')",

      }
    },
  },
  plugins: [],
}
