import React from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

interface GlobalSnackbarProps {
  open: boolean;
  message: string;
  severity?: AlertColor;
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
        severity={severity}
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
