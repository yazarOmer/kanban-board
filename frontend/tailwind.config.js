/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                jakarta: ["Plus Jakarta Sans", "sans-serif"],
            },
            dropShadow: {
                task: "0 4px 6px rgba(54, 78, 126, 0.1)",
            },
            colors: {
                "very-dark-grey": "#20212C",
                "light-grey": "#F4F7FD",
                "dark-border": "#3E3F4E",
                "dark-grey": "#2B2C37",
                "medium-grey": "#828FA3",
                "lines-color": "#E4EBFA",
                "main-purple": "#635FC7",
                "main-purple-hover": "#A8A4FF",
                "white-color": "#FFFFFF",
                "black-color": "#000112",
                "red-color": "#EA5555",
                "red-hover": "#FF9898",
                "lines-dark": "#3E3F4E",
            },
        },
    },
    plugins: [],
};
