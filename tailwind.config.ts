import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Raw warm neutrals (no pure black/white)
        "warm-white": "#f9f9f0",
        cream: "#efecca",
        sand: "#ccc5a3",
        tan: "#9d937c",
        ash: "#3d3b34",
        graphite: "#2f2d28",
        coal: "#21201c",
        ink: "#171612",
        "warm-black": "#0f0e0b",
        mint: "#d5fad3",
        "accent-blue": "#badbee",
        coral: "#ff8866",
        // Semantic tokens (CSS var — light/dark aware)
        "surface-100": "var(--surface-100)",
        "surface-200": "var(--surface-200)",
        "surface-300": "var(--surface-300)",
        "surface-400": "var(--surface-400)",
        "inv-100": "var(--inv-100)",
        "inv-200": "var(--inv-200)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "'Courier New'", "monospace"],
      },
      fontSize: {
        "2xs":       ["0.563rem", { lineHeight: "1.3",  letterSpacing: "0.02em"  }],
        "token-xs":  ["0.688rem", { lineHeight: "1.3",  letterSpacing: "0.03em"  }],
        "token-sm":  ["0.813rem", { lineHeight: "1.4",  letterSpacing: "0.02em"  }],
        "token-base":["1rem",     { lineHeight: "1.4",  letterSpacing: "0.02em"  }],
        "token-lg":  ["1.125rem", { lineHeight: "1.4",  letterSpacing: "0.01em"  }],
        "token-xl":  ["1.25rem",  { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        "token-2xl": ["1.5rem",   { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        "token-3xl": ["2.25rem",  { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        "token-4xl": ["3.438rem", { lineHeight: "1.0",  letterSpacing: "-0.02em" }],
        "token-5xl": ["5.625rem", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "token-6xl": ["7.5rem",   { lineHeight: "0.95", letterSpacing: "-0.03em" }],
      },
      spacing: {
        "sp-1":  "5px",
        "sp-2":  "10px",
        "sp-3":  "15px",
        "sp-4":  "20px",
        "sp-5":  "25px",
        "sp-6":  "30px",
        "sp-8":  "40px",
        "sp-9":  "45px",
        "sp-10": "50px",
        "sp-12": "60px",
        "sp-18": "90px",
        "sp-24": "120px",
      },
      maxWidth: {
        content: "110rem",
      },
      transitionDuration: {
        fast:   "100ms",
        normal: "150ms",
        medium: "200ms",
        slow:   "300ms",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.4, 0, 0.2, 1)",
        enter:    "cubic-bezier(0, 0, 0.2, 1)",
        exit:     "cubic-bezier(0.4, 0, 1, 1)",
        reveal:   "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      keyframes: {
        "marquee-rtl": {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        "marquee-ltr": {
          from: { transform: "translateX(-50%)" },
          to:   { transform: "translateX(0)" },
        },
        "code-up": {
          from: { transform: "translateY(0)" },
          to:   { transform: "translateY(-50%)" },
        },
        "globe-spin": {
          from: { transform: "rotateY(0deg)" },
          to:   { transform: "rotateY(360deg)" },
        },
      },
      animation: {
        "marquee-rtl": "marquee-rtl 10s linear infinite",
        "marquee-ltr": "marquee-ltr 10s linear infinite",
        "code-up":     "code-up 10s linear infinite",
        "globe-spin":  "globe-spin 60s linear infinite",
      },
      gridTemplateColumns: {
        "16": "repeat(16, minmax(0, 1fr))",
        "32": "repeat(32, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};

export default config;
