/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        boho: {
          cream: {
            50: '#FDFCF9',
            100: '#FAF7F2',
            200: '#F5EBE0',
            300: '#EDE0D4',
            400: '#DFD0C0',
          },
          rose: {
            50: '#FBF3F2',
            100: '#F7E6E5',
            200: '#EEC8C5',
            300: '#E2A9A4',
            400: '#D98880',
            500: '#C56A62',
            600: '#A94E46',
          },
          peach: {
            50: '#FFF7F2',
            100: '#FEECE3',
            200: '#FDD5C2',
            300: '#FBBCA0',
            400: '#F8A17E',
            500: '#EB7D54',
          },
          sage: {
            50: '#F4F7F2',
            100: '#E8EFE5',
            200: '#D1DFC9',
            300: '#B6CCAA',
            400: '#A3B18A',
            500: '#75885C',
            600: '#586A42',
          },
          teal: {
            50: '#F2F7F7',
            100: '#E2EDED',
            200: '#C2D9D8',
            300: '#9DBFBE',
            400: '#649794',
            500: '#4A707A',
            600: '#38555C',
          },
          lavender: {
            50: '#FAF5FC',
            100: '#F3E8F7',
            200: '#E6CFED',
            300: '#D8C3E5',
            400: '#B89BC7',
            500: '#9973AB',
          },
          terracotta: {
            50: '#FDF4F1',
            100: '#FCE6E0',
            200: '#F7C9BE',
            300: '#EFA695',
            400: '#C86D51',
            500: '#B85D43',
            600: '#96442E',
          },
          earth: {
            800: '#3D312A',
            900: '#2A221C',
          }
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        handwriting: ['"Caveat"', '"Dancing Script"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(184, 93, 67, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 30px -4px rgba(184, 93, 67, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.05)',
        'boho': '0 8px 30px rgba(163, 177, 138, 0.15)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      }
    },
  },
  plugins: [],
}
