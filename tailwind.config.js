module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cosmic: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95'
        }
      },
      animation: {
        'cosmic-pulse': 'cosmic-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'cosmic-float': 'cosmic-float 3s ease-in-out infinite'
      },
      keyframes: {
        'cosmic-pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 }
        },
        'cosmic-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
      perspective: {
        '1000': '1000px',
      },
      rotate: {
        '3d': 'rotate3d(1, 1, 1, 45deg)',
      }
    }
  },
  plugins: [
    function({ addBase, theme }) {
      addBase({
        '.cosmic-mode': {
          '--tw-bg-opacity': '1',
          backgroundColor: theme('colors.gray.900'),
          color: theme('colors.gray.100'),
          '& *': {
            borderColor: theme('colors.purple.700'),
          },
          '& .bg-white': {
            backgroundColor: theme('colors.gray.800'),
          },
          '& .text-gray-700': {
            color: theme('colors.gray.300'),
          },
          '& .text-gray-500': {
            color: theme('colors.gray.400'),
          },
          '& .border-gray-300': {
            borderColor: theme('colors.purple.700'),
          },
          '& .hover\\:bg-purple-100:hover': {
            backgroundColor: theme('colors.purple.900'),
          },
          '& .bg-purple-50': {
            backgroundColor: theme('colors.purple.900/20'),
          }
        }
      });
    }
  ]
}; 