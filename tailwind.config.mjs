/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			mainColor: 'var(--main-color)',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-somar-sans)'
  			]
  		},
  		animation: {
  			dash: 'dashArray 2s ease-in-out infinite, dashOffset 2s linear infinite',
  			'spin-dash': 'spinDashArray 2s ease-in-out infinite, spin 8s ease-in-out infinite, dashOffset 2s linear infinite'
  		},
  		keyframes: {
  			dashArray: {
  				'0%': {
  					strokeDasharray: '0 1 359 0'
  				},
  				'50%': {
  					strokeDasharray: '0 359 1 0'
  				},
  				'100%': {
  					strokeDasharray: '359 1 0 0'
  				}
  			},
  			spinDashArray: {
  				'0%': {
  					strokeDasharray: '270 90'
  				},
  				'50%': {
  					strokeDasharray: '0 360'
  				},
  				'100%': {
  					strokeDasharray: '270 90'
  				}
  			},
  			dashOffset: {
  				'0%': {
  					strokeDashoffset: '365'
  				},
  				'100%': {
  					strokeDashoffset: '5'
  				}
  			},
  			spin: {
  				'0%': {
  					rotate: '0deg'
  				},
  				'12.5%, 25%': {
  					rotate: '270deg'
  				},
  				'37.5%, 50%': {
  					rotate: '540deg'
  				},
  				'62.5%, 75%': {
  					rotate: '810deg'
  				},
  				'87.5%, 100%': {
  					rotate: '1080deg'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
  	variants: {
  		extend: {
  			opacity: [
  				'responsive',
  				'hover',
  				'focus',
  				'group-hover'
  			]
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};