/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'royal-base': '#2e1065',  // Deep Royal Purple
                'royal-dark': '#1e1b4b',  // Darker Night
                'royal-gold': '#b45309',  // Bronze/Gold
                'royal-cream': '#fffbeb', // Parchment
                'royal-light': '#f3e8ff', // Light Purple tint
                'k-red': '#be123c',       // Keeping a red accent (more crimson now)
                'k-green': '#15803d',     // Deep Green
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'], // Royal Header Font
            }
        },
    },
    plugins: [],
}
