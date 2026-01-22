module.exports = {
  content: ["./index.html", "./**/*.html", "./src/**/*.{js,ts}"] ,
  theme: {
    extend: {
      colors: {
        donatelli: {
          taupe: '#B08A76',
          deep: '#8D6E5A',
          cream: '#F6F3F0',
          rose: '#DCC6B9',
          charcoal: '#0F1111'
        }
      },
      fontFamily: {
        playfair: ['"Manrope"', 'sans-serif'],
        sans: ['"Manrope"', 'sans-serif']
      },
      borderRadius: {
        '2xl': '1rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    }
  },
  plugins: [],
};