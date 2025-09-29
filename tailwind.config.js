// //  // tailwind.config.js

// module.exports = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "./node_modules/flowbite/**/*.js",
//   ],
//   theme: {
//     extend: {
//       backgroundImage: {
//         "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
//         "gradient-conic":
//           "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
//       },

//       colors: {
//         transparent: "transparent",
//         current: "currentColor",
//         NavClr: "#f2fff2",
//         green: "#00D121",
//         greenDark: "#13A52A",
//         white: "#ffffff",
//         btColour: "#047481",
//         footerClr: "#1e293b",
//         purple: "#8400AB",
//         purple2: "#7402BA",
//         dark: "#000000",
//         customBlack: "#201F1F",

//         extend: {},
//       },
//       screens: {
//         xs: "400px",
//         sm: "640px",
//         // => @media (min-width: 640px) { ... }
//         md: "768px",
//         // => @media (min-width: 768px) { ... }
//         lg: "1024px",
//         // => @media (min-width: 1024px) { ... }
//         xl: "1280px",
//         // => @media (min-width: 1280px) { ... }
//         "2xl": "1536px",
//         // // => @media (min-width: 1536px) { ... }
//         xsmall: { max: "399px" },
//         mod: { max: "639px" },
//         expcard: { max: "1066px" },
//         minilg: { min: "899px" },
//         mid: { max: "767px" },
//         Nlg: { max: "1023px" },
//         // => @media (min-width: 0px and max-width: 639px) { ... }
//       },

//       fontFamily: {
//         montserrat: ["Montserrat", "sans-serif"],
//         "montserrat-subrayada": ["Montserrat Subrayada", "sans-serif"],
//         // Defined Montserrat and Montserrat Subrayada fonts
//       },
//       animation: {
//         progress: "progress 3s ease-in-out forwards",
//       },

//       keyframes: {
//         progress: {
//           "0%": { width: "0%" },
//           "100%": { width: "100%" },
//         },
//         bounce: {
//           "0%, 100%": { transform: "translateY(0)" },
//           "50%": { transform: "translateY(-10px)" },
//         },
//         fadeIn: {
//           from: { opacity: 0, transform: "scale(0.8)" },
//           to: { opacity: 1, transform: "scale(1)" },
//         },
//         fadeInUp: {
//           from: { opacity: 0, transform: "translateY(20px)" },
//           to: { opacity: 1, transform: "translateY(0)" },
//         },
//       },
//     },
//   },
//   variants: {
//     extend: {
//       transitionProperty: ["responsive", "hover", "focus"],
//       translate: ["responsive", "hover", "focus"],
//     },
//   },
//   plugins: [require("flowbite/plugin")],
// };
// tailwind.config.js

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "brand-gradient": "linear-gradient(135deg, #110b79 0%, #e4ff04 100%)",
        "brand-gradient-reverse":
          "linear-gradient(135deg, #e4ff04 0%, #110b79 100%)",
      },

      colors: {
        // Primary: Dark Blue
        primary: {
          50: "#e8e8f5", // Light blue tint
          500: "#110b79", // Main brand blue
          900: "#080759", // Dark blue
        },

        // Secondary: Electric Yellow
        secondary: {
          50: "#f8f9e6", // Light yellow tint
          500: "#e4ff04", // Main brand yellow
          600: "#e4ff04", // Main brand yellow
          900: "#92ac00", // Dark yellow
        },

        // Accent: Clean Gray
        neutral: {
          50: "#f9fafb", // Very light gray
          500: "#6b7280", // Medium gray
          900: "#111827", // Dark gray
        },

        // Legacy colors (kept for backward compatibility)
        white: "#ffffff",
        dark: "#000000",

        // Brand utilities
        brand: {
          blue: "#110b79",
          yellow: "#e4ff04",
        },
        error: {
          500: "#ef4444", // red-500
          600: "#dc2626", // red-600
          800: "#991b1b", // red-800
        },
      },

      screens: {
        xs: "400px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        xsmall: { max: "399px" },
        mod: { max: "639px" },
        expcard: { max: "1066px" },
        minilg: { min: "899px" },
        mid: { max: "767px" },
        Nlg: { max: "1023px" },
      },

      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        "montserrat-subrayada": ["Montserrat Subrayada", "sans-serif"],
      },

      animation: {
        progress: "progress 3s ease-in-out forwards",
        "brand-glow": "brandGlow 2s ease-in-out infinite alternate",
      },

      keyframes: {
        progress: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        brandGlow: {
          "0%": {
            boxShadow: "0 0 5px rgba(228, 255, 4, 0.3)",
            textShadow: "0 0 5px rgba(228, 255, 4, 0.3)",
          },
          "100%": {
            boxShadow: "0 0 15px rgba(228, 255, 4, 0.7)",
            textShadow: "0 0 8px rgba(228, 255, 4, 0.7)",
          },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeIn: {
          from: { opacity: 0, transform: "scale(0.8)" },
          to: { opacity: 1, transform: "scale(1)" },
        },
        fadeInUp: {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  variants: {
    extend: {
      transitionProperty: ["responsive", "hover", "focus"],
      translate: ["responsive", "hover", "focus"],
    },
  },
  plugins: [require("flowbite/plugin")],
};
