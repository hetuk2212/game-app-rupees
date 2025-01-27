/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:"#304553",
        secondry:"#0e212e",
        accent: "#4B5563",
        border:"#007BFF",
        btnBg:"#00e601"
      },
    },
  },
  plugins: [],
};
