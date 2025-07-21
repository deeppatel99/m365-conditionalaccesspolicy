import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "dark" ? "#60a5fa" : "#2563eb",
        contrastText: "#fff",
      },
      secondary: {
        main: mode === "dark" ? "#bdbdbd" : "#28292c",
        contrastText: "#fff",
      },
      background: {
        default: mode === "dark" ? "#181a1b" : "#f3f6fb",
        paper: mode === "dark" ? "#23272a" : "#fff",
      },
      text: {
        primary: mode === "dark" ? "#f3f6fb" : "#22292f",
        secondary: mode === "dark" ? "#bdbdbd" : "#42474c",
      },
      success: {
        main: "#34AF45",
        contrastText: "#fff",
      },
      error: {
        main: "#EF4444",
        contrastText: "#fff",
      },
      warning: {
        main: "#F59E42",
        contrastText: "#fff",
      },
      info: {
        main: "#3B82F6",
        contrastText: "#fff",
      },
    },
    shape: {
      borderRadius: 16,
    },
    typography: {
      fontFamily: [
        "Nunito",
        "Nunito Light",
        "Inter",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ].join(","),
      h4: { fontWeight: 800, letterSpacing: 0.5 },
      h5: { fontWeight: 700, letterSpacing: 0.2 },
      h6: { fontWeight: 600 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            fontWeight: 600,
            fontSize: 16,
            padding: "10px 24px",
            transition: "background 0.2s, box-shadow 0.2s",
          },
          containedPrimary: {
            background:
              mode === "dark"
                ? "linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)"
                : "linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          },
        },
      },
    },
  });
