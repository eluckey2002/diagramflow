/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#007bff',
        secondary: '#6c757d',
      },
      spacing: {
        toolbar: '48px',
        sidebar: '240px',
      },
      zIndex: {
        toolbar: '100',
        modal: '1000',
      },
    },
  },
  plugins: [],
}
