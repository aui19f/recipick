// // tailwind.config.ts
// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         // 커스텀 색상 이름과 hex 코드 지정
//         // primary: "#1E40AF", // 파란색 계열
//         // secondary: "#F59E0B", // 노란색 계열
//         // "soft-gray": "#f5f5f5", // 하얀 회색
//         "custom-gray": {
//           100: "#F8F8F8",
//           200: "#D1D1D1",
//           300: "#ABABAB",
//           400: "#858585",
//           500: "#1F1F1F",
//         },
//       },
//     },
//   },
//   plugins: [],
// };
// export default config;

//  @type {import('tailwindcss').Config}

module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "text-gray": {
          200: "#D1D1D1",
          300: "#ABABAB",
          400: "#858585",
          500: "#fafafa",
        },
      },
    },
  },

  plugins: [],
};
