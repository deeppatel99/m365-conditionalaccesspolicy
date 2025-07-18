import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { SnackbarSeverity } from "../context/SnackbarContext";
import { AlertColor } from "@mui/material/Alert";

interface GlobalSnackbarProps {
  open: boolean;
  message: string;
  severity?: SnackbarSeverity;
  onClose: () => void;
}

const GlobalSnackbar: React.FC<GlobalSnackbarProps> = ({
  open,
  message,
  severity = "info",
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={8000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{
        "& .MuiSnackbarContent-root": {
          minWidth: 400,
          fontSize: 18,
          fontWeight: 500,
        },
      }}
    >
      <Alert
        onClose={onClose}
        severity={severity as AlertColor}
        sx={{
          width: "100%",
          fontSize: 18,
          fontWeight: 500,
          ...(severity === "success" && {
            bgcolor: "success.main",
            color: "white",
          }),
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
