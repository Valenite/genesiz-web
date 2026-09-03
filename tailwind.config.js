/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#030712',
          surface: '#080d1a',
          card: '#0c1322',
          cardBorder: 'rgba(56, 189, 248, 0.2)',
          cyan: '#00f0ff',
          neonCyan: '#38bdf8',
          purple: '#9333ea',
          neonPurple: '#c084fc',
          emerald: '#10b981',
          neonEmerald: '#34d399',
          amber: '#f59e0b',
          neonAmber: '#fbbf24',
          rose: '#f43f5e',
          neonRose: '#fb7185',
        },
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 20px -3px rgba(0, 240, 255, 0.5), 0 0 10px -2px rgba(0, 240, 255, 0.3)',
        'neon-purple': '0 0 20px -3px rgba(168, 85, 247, 0.5), 0 0 10px -2px rgba(168, 85, 247, 0.3)',
        'neon-rose': '0 0 20px -3px rgba(244, 63, 94, 0.5), 0 0 10px -2px rgba(244, 63, 94, 0.3)',
        'neon-emerald': '0 0 20px -3px rgba(16, 185, 129, 0.5), 0 0 10px -2px rgba(16, 185, 129, 0.3)',
        'glass-glow': '0 8px 32px 0 rgba(0, 240, 255, 0.1)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'glitch': 'glitch 1s linear infinite',
        'border-spin': 'borderSpin 4s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(0,240,255,0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 25px rgba(0,240,255,0.8))' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        borderSpin: {
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
