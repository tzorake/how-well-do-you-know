/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: { raw: '(min-height: 700px)' }
      },
      gridTemplateColumns: {
        'letters': 'repeat(7, minmax(max(42px, (100% - 3rem )/7), 1fr))'
      },
      colors: {
        primary: {
          // cyan
          light: '#06b6d4', // 500
          DEFAULT: '#0e7490', // 700
          dark: '#164e63' // 900
        },
        secondary: {
          // indigo
          light: '#a5b4fc', // 300
          DEFAULT: '#4f46e5', // 600
          dark: '#312e81' // 900
        },
        info: '#eab308', // yellow-500
        success: {
          //emerald
          light: '#10b981', // 500
          DEFAULT: '#059669' // 600
        },
        warn: {
          // orange
          light: '#fb923c', //400
          DEFAULT: '#f97316' // 500
        },
        error: '#ef4444', // red-500
        help: {
          //purple
          light: '#a855f7', // 500
          DEFAULT: '#9333ea' // 600
        },

        'border-color': '#d6d3d1' // stone-300
      }
    }
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|from|via|to)-.*/
    }
  ]
}
