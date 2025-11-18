import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // If you have a `src` directory:
    // './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // shadcn/ui will add its theme variables here
    },
  },
  plugins: [
    // shadcn/ui might add 'tailwindcss-animate' here or expect it
    //require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
};
export default config;
