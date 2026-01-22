/**
 * Tailwind CSS Configuration
 * This extends the default Tailwind config with custom colors, fonts, and animations
 */

module.exports = {
  theme: {
    extend: {
      // Custom color palette
      colors: {
        // Brand colors
        primary: '#9929EA',      // Purple
        secondary: '#fbbf24',    // Amber
        
        // Add more custom colors here as needed
        'bright-orange': '#ff9900',
        'golden-yellow': '#ffc800',
      },
      
      // Custom font family
      fontFamily: {
        sans: ["'Instrument Sans'", "'Inter'", 'sans-serif'],
      },
      
      // Custom animations
      animation: {
        fadeIn: 'fadeIn 0.6s ease-in-out',
        slideUp: 'slideUp 0.8s ease-in-out',
        slideLeft: 'slideLeft 0.6s ease-in-out',
        slideRight: 'slideRight 0.6s ease-in-out',
        bgFlow: 'bgFlow 10s infinite alternate',
        fadeInOut: 'fadeInOut 3s ease-in-out',
      },
      
      // Keyframe animations
      keyframes: {
        fadeIn: {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideUp: {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideLeft: {
          from: {
            opacity: '0',
            transform: 'translateX(-20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideRight: {
          from: {
            opacity: '0',
            transform: 'translateX(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        bgFlow: {
          '0%': {
            'background-position': '0% 50%',
          },
          '100%': {
            'background-position': '100% 50%',
          },
        },
        fadeInOut: {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.7',
          },
        },
      },
    },
  },
};
