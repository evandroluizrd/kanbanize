/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',       //  Primary (Indigo)
        secondary: '#6366F1',     //  Secondary
        accent: '#22D3EE',        //  Accent (Cyan)
        background: '#F9FAFB',    //  Background
        surface: '#FFFFFF',       // Cards / Surfaces
        textPrimary: '#111827',   // Main text
        textSecondary: '#6B7280', // Secondary text
      },
      borderRadius: {
        xl: '1.5rem',
        '2xl': '2rem'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
}
