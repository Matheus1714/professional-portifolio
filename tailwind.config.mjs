/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			animation: {
				blinker: 'blinker 1s linear infinite',
			},
			keyframes: {
				blinker: {
					'50%': { opacity: '0' },
				},
			},
			colors: {
				primary: "var(--color-primary)",
				secondary: "var(--color-secondary)",
			},
			textColor: {
				default: "var(--color-text)",
				offset: "var(--color-text-offset)",
			},
			backgroundColor: {
				default: "var(--color-background)",
				offset: "var(--color-background-offset)",
				border: "var(--color-border)",
				text: "var(--color-text)",
			},
			borderColor: {
				default: "var(--color-border)",
			},
			animation: {
				"spin-slower": "spin 35s ease infinite",
				"spin-slow": "spin 25s ease-in-out infinite reverse",
			},
			fontFamily: {
				mono: ['"Fira Code"', 'monospace'],
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography')
	],
}
