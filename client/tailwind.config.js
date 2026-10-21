/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        slate: {
          300: '#475569', // Was #cbd5e1 -> high-contrast slate-600
          400: '#334155', // Was #94a3b8 -> crisp light-black / slate-700
          500: '#1e293b', // Was #64748b -> deep light-black / slate-800
        },
        gray: {
          300: '#475569',
          400: '#334155',
          500: '#1e293b',
        },
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        }
      }
    },
  },
  plugins: [],
}
