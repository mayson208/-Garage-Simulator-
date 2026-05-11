/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'shop-black':   '#0a0a0b',
        'shop-dark':    '#111214',
        'shop-surface': '#1a1c1f',
        'shop-panel':   '#1f2124',
        'shop-border':  '#2a2d32',
        'shop-gun':     '#3a3d42',
        'shop-yellow':  '#f5c518',
        'shop-stripe':  '#e8b800',
        'shop-white':   '#e8eaed',
        'shop-dim':     '#8a8f98',
        'shop-fluor':   '#d4e8ff',
        'shop-red':     '#c0392b',
        'shop-green':   '#27ae60',
      },
      fontFamily: {
        stencil: ['"Oswald"', '"Impact"', 'sans-serif'],
        mono:    ['"Share Tech Mono"', '"Courier New"', 'monospace'],
        ui:      ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'concrete': "url('/textures/concrete_floor.jpg')",
        'caution-stripe': 'repeating-linear-gradient(45deg, #f5c518 0px, #f5c518 10px, #0a0a0b 10px, #0a0a0b 20px)',
      },
      boxShadow: {
        'fluor': '0 0 20px 2px rgba(212, 232, 255, 0.15)',
        'panel': '4px 0 24px rgba(0,0,0,0.6)',
        'glow-yellow': '0 0 12px rgba(245, 197, 24, 0.4)',
      },
    },
  },
  plugins: [],
}
