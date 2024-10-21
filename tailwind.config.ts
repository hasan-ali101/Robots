import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "h-base": { raw: "(min-height: 0px)" },
        "h-md": { raw: "(min-height: 1000px)" },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        stars: {
          "0%": { opacity: "0.3" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0.3" },
        },
        clouds: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-40%)" },
        },
        "shooting-star": {
          "0%": { transform: "translate(0, 100vh)" },
          "100%": { transform: "translate(100vw, -100vh)" },
        },
        "shooting-star-2": {
          "0%": { transform: "translate(100vw, 20vh)" },
          "10%": { transform: "translate(100vw, 20vh)" },
          "35%": { transform: "translate(0, 60vh)" },
          "100%": {
            transform: "translate(10vw, 80vh)",
          },
        },
      },
      animation: {
        stars: "stars 2.5s infinite ease-in-out",
        "shooting-star": "shooting-star 6s infinite",
        "shooting-star-slow": "shooting-star 10s infinite",
        "shooting-star-2": "shooting-star-2 20s linear infinite",
        clouds: "clouds linear 40s infinite alternate",
        cloudsSlow: "clouds linear 80s infinite alternate",
      },
    },
  },
  plugins: [],
};
export default config;
