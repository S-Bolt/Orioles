export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',  
  ],
  theme: {
    extend: {
      colors: {
        oriolesOrange: '#FB4F14',
        oriolesBlack: '#000000',
        oriolesWhite: '#FFFFFF',
    },
    boxShadow: {
      'inner-sm': 'inset 0 1px 2px rgba(0, 0, 0, 0.05)',
      'inner-md': 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
      'inner-lg': 'inset 0 4px 8px rgba(0, 0, 0, 0.15)',
      'inner-xl': 'inset 0 8px 16px rgba(0, 0, 0, 0.2)',
    },
  },
},
  plugins: [],
};
