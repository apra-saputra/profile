/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "var(--text)",
        background: "var(--background)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        disable: "var(--disable)",
        danger: "var(--danger)",
        accent: {
          DEFAULT: "var(--accent)",
          dark: "var(--accent-dark)",
          '2': "rgb(251 146 60 / var(--tw-bg-opacity))",
        },
      },
      boxShadow: {
        'main-box': '0 0 1.5rem rgba(255, 255, 255, 0.3)',
        'danger-box': '0 0 1.5rem rgba(243, 67, 17, 0.5)',
      }
    },
  },
  plugins: [],
};
