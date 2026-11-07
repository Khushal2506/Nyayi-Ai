/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nyaya: {
          // Exact required tokens
          plum: {
            DEFAULT: '#17152B',
            dark: '#0E0D1B',
            light: '#252244',
            muted: '#3D3868',
            surface: '#1F1C38',
          },
          orange: {
            DEFAULT: '#FF6B35',
            hover: '#E85822',
            light: '#FFF0EA',
            subtle: '#FFE2D7',
            border: '#FFBEA6',
          },
          yellow: {
            DEFAULT: '#FFC857',
            hover: '#EBB33E',
            light: '#FFF9ED',
            border: '#FFE29E',
          },
          cream: {
            DEFAULT: '#FFF8EF',
            light: '#FFFCF7',
            dark: '#F5ECE0',
            border: '#E8DCB',
          },
          lavender: {
            DEFAULT: '#E9E3F5',
            light: '#F5F2FA',
            dark: '#C8BEDE',
            border: '#D7CCE9',
          },
          surface: '#FFFFFF',
          text: {
            primary: '#17152B',
            secondary: '#54506D',
            muted: '#8B86A4',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Newsreader', 'Merriweather', 'Georgia', 'Cambria', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'warm': '0 4px 20px -2px rgba(23, 21, 43, 0.08), 0 2px 6px -1px rgba(23, 21, 43, 0.04)',
        'warm-lg': '0 10px 30px -4px rgba(23, 21, 43, 0.12), 0 4px 10px -2px rgba(23, 21, 43, 0.06)',
        'orange-sm': '0 2px 8px rgba(255, 107, 53, 0.25)',
        'orange-md': '0 4px 14px rgba(255, 107, 53, 0.35)',
      }
    },
  },
  plugins: [],
}
