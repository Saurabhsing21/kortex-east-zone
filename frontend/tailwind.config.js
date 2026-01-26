/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
			colors: {
				primary: {
					'50': '#faf5ff',
					'100': '#f3e8ff',
					'200': '#e9d5ff',
					'300': '#d8b4fe',
					'400': '#c084fc',
					'500': '#a855f7',
					'600': '#9333ea',
					'700': '#7e22ce',
					'800': '#6b21a8',
					'900': '#581c87',
					'950': '#3b0764',
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				'brand-purple': {
					'50': '#faf5ff',
					'100': '#f3e8ff',
					'200': '#e9d5ff',
					'300': '#d8b4fe',
					'400': '#c084fc',
					'500': '#a855f7',
					'600': '#9333ea',
					'700': '#7e22ce',
					'800': '#6b21a8',
					'900': '#581c87',
					'950': '#3b0764'
				},
				'brand-pink': {
					'50': '#fdf2f8',
					'100': '#fce7f3',
					'200': '#fbcfe8',
					'300': '#f9a8d4',
					'400': '#f472b6',
					'500': '#ec4899',
					'600': '#db2777',
					'700': '#be185d'
				},
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
			backgroundImage: {
				"gradient-purple-pink": "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
				"gradient-purple-deep": "linear-gradient(135deg, #7e22ce 0%, #5b21b6 100%)",
				"gradient-light-purple": "linear-gradient(135deg, #e9d5ff 0%, #d8b4fe 100%)",
				"gradient-primary": "linear-gradient(135deg, #7e22ce 0%, #6b21a8 100%)",
				"gradient-hero": "linear-gradient(135deg, #e9d5ff 0%, #f3e8ff 50%, #fce7f3 100%)",
				"gradient-card-hover": "linear-gradient(135deg, #f3e8ff 0%, #ffffff 100%)",
				"gradient-accent": "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)"
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}
