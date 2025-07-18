import React, { useRef } from "react";
import { Box, TextField } from "@mui/material";

interface OtpInputProps {
  value: string;
  onChange: (val: string) => void;
  length?: number;
}

const OtpInput: React.FC<OtpInputProps> = ({ value, onChange, length = 6 }) => {
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx: number
  ) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) return;
    const newValue = value.split("");
    newValue[idx] = val[val.length - 1];
    const joined = newValue.join("").slice(0, length);
    onChange(joined);
    if (val && idx < length - 1) {
      inputs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "Backspace") {
      if (value[idx]) {
        // Clear the current box
        const newValue = value.split("");
        newValue[idx] = "";
        onChange(newValue.join(""));
        e.preventDefault();
      } else if (idx > 0) {
        // Move to previous box and clear it
        const newValue = value.split("");
        newValue[idx - 1] = "";
        onChange(newValue.join(""));
        inputs.current[idx - 1]?.focus();
        e.preventDefault();
      }
    }
  };

  return (
    <Box display="flex" gap={2} justifyContent="center" mb={2}>
      {Array.from({ length }).map((_, idx) => (
        <TextField
          key={idx}
          inputRef={(el) => (inputs.current[idx] = el)}
          value={value[idx] || ""}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          inputProps={{
            maxLength: 1,
            inputMode: "numeric",
            pattern: "[0-9]*",
            style: { textAlign: "center", fontSize: 28, width: 48, height: 48 },
          }}
          variant="outlined"
        />
      ))}
    </Box>
  );
};

export default OtpInput;
