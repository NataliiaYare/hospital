/** @type {import('tailwindcss').Config} */

// Tailwind main configuration
module.exports = {
  // 👀 1. Files where Tailwind will look for classes to generate
  content: ["./src/**/*.{html,js}"],

  // 🛟 2. Safelist ensures dynamic background-image classes are NOT purged
  safelist: [{ pattern: /bg-\[url\(.*?\)\]/ }],

  theme: {
    extend: {
      // 🎚 3. Modern spring-like cubic bezier for soft, natural motion
      transitionTimingFunction: {
        "minor-spring": "cubic-bezier(0.16, 1, 0.3, 1)",
      },

      // 🎞 4. Modern, smooth UI animations used in 2024–2025 design trends
      keyframes: {
        // 🔼 Smooth upward motion + soft scale for a natural "lift"
        "smooth-lift": {
          "0%": {
            opacity: "0",
            transform: "translateY(40px) scale(0.98)",
          },
          "60%": {
            opacity: "1", // opacity increases earlier for better polish
          },
          "100%": {
            transform: "translateY(0) scale(1)",
          },
        },

        // 🔽 Smooth downward motion + soft scale
        "smooth-drop": {
          "0%": {
            opacity: "0",
            transform: "translateY(-40px) scale(0.98)",
          },
          "60%": {
            opacity: "1",
          },
          "100%": {
            transform: "translateY(0) scale(1)",
          },
        },

        // 🌫 Clean unblur animation (modern cinematic reveal)
        "soft-unblur": {
          "0%": {
            opacity: "0",
            filter: "blur(8px)",
          },
          "100%": {
            opacity: "1",
            filter: "blur(0)",
          },
        },
      },

      // 🏷 5. Animation utilities you can use directly in HTML
      animation: {
        "smooth-lift": "smooth-lift 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        "smooth-drop": "smooth-drop 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        "soft-unblur": "soft-unblur 0.6s ease-out",
      },
    },
  },

  // 🧩 6. No extra plugins used, but you can add them here if needed
  plugins: [],
};
