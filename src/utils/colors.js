/**
 * Color & Typography Constants for Tailwind CSS
 * Ensures consistency across the entire project
 */

// Primary Colors
export const colors = {
  // Brand Colors
  primary: '#9929EA',      // Purple - Primary brand color
  secondary: '#fbbf24',    // Amber - Secondary accent
  
  // Status Colors
  success: '#10b981',      // Green - Success/Active
  error: '#ef4444',        // Red - Error/Danger
  warning: '#f59e0b',      // Amber - Warning
  pending: '#f59e0b',      // Amber - Pending
  
  // Neutral Colors
  text: '#1f2937',         // Dark gray - Main text
  textLight: '#6b7280',    // Medium gray - Secondary text
  textLighter: '#9ca3af',  // Light gray - Tertiary text
  
  // Background Colors
  background: '#ffffff',   // White - Main background
  backgroundLight: '#f9fafb', // Very light gray
  backgroundLighter: '#f3f4f6', // Lighter gray
  
  // Border Colors
  border: '#e5e7eb',       // Light gray border
  borderLight: '#f3f4f6',  // Very light border
  
  // Orange/Yellow gradient (for financial pages)
  orangeStart: '#ff9900',  // Bright orange
  orangeEnd: '#ff6600',    // Dark orange
  yellowStart: '#ffc800',  // Bright yellow
  yellowEnd: '#ffaa00',    // Golden yellow
};

// Typography Scales
export const typography = {
  // Font families
  fontFamily: {
    sans: "'Instrument Sans', 'Inter', sans-serif",
    mono: "ui-monospace, SFMono-Regular, 'SF Mono', monospace",
  },
  
  // Font sizes with line heights
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  },
  
  // Font weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
};

// Common spacing scale
export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
};

// Shadow utilities
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
};

// Border radius presets
export const borderRadius = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
  full: '9999px',
};

// Breakpoints
export const breakpoints = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Common className patterns for reuse
export const classPatterns = {
  // Headers
  headerDefault: 'text-xl font-bold text-gray-900',
  headerSmall: 'text-lg font-semibold text-gray-800',
  headerLarge: 'text-2xl font-bold text-gray-900',
  
  // Cards
  cardDefault: 'bg-white rounded-2xl shadow-lg p-6',
  cardSmall: 'bg-white rounded-xl shadow-md p-4',
  
  // Buttons
  buttonPrimary: 'px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-semibold rounded-full hover:shadow-lg transition',
  buttonSecondary: 'px-4 py-2 bg-gray-300 text-gray-900 font-semibold rounded-full hover:bg-gray-400 transition',
  buttonDanger: 'px-4 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition',
  
  // Inputs
  inputDefault: 'w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-yellow-400 focus:outline-none transition',
  inputSmall: 'px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none transition',
  
  // Badges/Labels
  badgeSuccess: 'px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-600',
  badgeError: 'px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600',
  badgeWarning: 'px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-600',
  
  // Containers
  containerDefault: 'w-full max-w-md mx-auto',
  containerMinHeight: 'min-h-screen',
  
  // Gradients
  gradientYellow: 'bg-gradient-to-br from-yellow-400 via-yellow-100 to-yellow-50',
  gradientOrange: 'bg-gradient-to-b from-orange-400 to-yellow-400',
  gradientYellowLight: 'bg-gradient-to-br from-white via-yellow-50 to-yellow-100',
};
