/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#EF4F5F',
        'primary-dark': '#D8404F',
        background: '#F8F8F8',
        surface: '#FFFFFF',
        ink: '#1C1C1C',
        border: '#E8E8E8',
        danger: '#D92D20',
        success: '#22C55E',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        card: '18px',
        input: '14px',
      },
      boxShadow: {
        soft: '0 2px 10px rgba(28, 28, 28, 0.06)',
        card: '0 6px 20px rgba(28, 28, 28, 0.08)',
        lift: '0 12px 28px rgba(28, 28, 28, 0.14)',
      },
    },
  },
  plugins: [],
};
