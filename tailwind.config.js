module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    borderWidth: {
      0.5: "0.5px",
      1: "1px",
      2: "2px",
      12: "12px",
    },
    rotate: {
      45: "45deg",
      135: "135deg",
    },
    // padding: {
    //   100: '100px',
    // },
    extend: {
      padding: {
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "3rem",
        section: "5rem",
      },
      lineHeight: {
        150: "150%",
        160: "160%",
        170: "170%",
      },
      width: {
        64: "64px",
        70: "70%",
        80: "80%",
        90: "90%",
      },
      maxWidth: {
        70: "70%",
        700: "700px",
      },
      height: {
        64: "64px",
        59: "59px",
      },
      fontFamily: {
        sans: "sans-serif",
      },
      colors: {
        primary: {
          main: "#684574",
          dark: "#433450",
          light: "#936598",
          background: "#F6F3F7",
          border: "rgba(104, 69, 116, 0.5)",
          input: "#e0e0e0",
        },
        secondary: {
          main: "#3CECEC",
          dark: "#00BFCB",
          light: "#9DF4F2",
          background: "#D9FBFA",
          border: "rgba(60, 236, 236, 0.5)",
        },
        font: {
          primary: "#141414",
          secondary: "#525252",
          disabled: "#ADADAD",
          contrast: "#FFFFFF",
        },
        info: {
          main: "#2196F3",
          dark: "#0B79D0",
          light: "#64B6F7",
        },
        error: {
          main: "#F44336",
          dark: "#E31B0C",
          light: "#F88078",
        },
        warning: {
          main: "#FF9800",
          dark: "#C77700",
          light: "#FFB547",
        },
        success: {
          main: "#4CAF50",
          dark: "#3B873E",
          light: "#7BC67E",
        },
        gray: {
          "AA": "#949494",
          2: "#666666",
          3: " #CCCCCC",
          50: "#F8F8F8",
          100: "#EFEFEF",
          200: "#E4E4E4",
          300: "#D2D2D2",
          400: "#ADADAD",
          500: "#8D8D8D",
          600: "#656565",
          700: "#525252",
          800: "#343434",
          900: "",
        },
        input: {
          "active": "#1A1A1A",
          "activeBorder": "#543FD3",
          "error": "#EE0004",
          "default": "#EE0004",
          "hover":"#767676"
        }
      },
      letterSpacing: {
        1: "1px", //1px
      },
      lineHeight: {
        200: 2,
        175: 1.75,
        170: 1.7,
        160: 1.6,
        150: 1.5,
        130: 1.3,
        120: 1.2,
        116: 1.16,
      },
      fontSize: {
        "2xl": "4.5rem",
        xl: "3.75rem",
        xlm: "3.5rem",
        lg: "3rem",
        md: "2rem",
        sm: "1.5rem",
        title: "20px",
        subtitle: "18px",
        body: "16px",
        body2: "14px",
        small: "12px",
      },
      boxShadow: {
        blue: "0px 2px 16px rgba(60, 236, 236, 0.5)",
        small: "0 5px 10px rgba(0, 0, 0, 0.12)",
        medium: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};