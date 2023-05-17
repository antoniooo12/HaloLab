import { Typography } from "@mui/material";
import React from "react";

interface IFormErrorText {
  text?: string;
}

export const FormErrorText: React.FC<IFormErrorText> = ({ text }) => {
  return (
    <Typography
      sx={{
        color: "red",
        fontSize: 12,
        fontFamily: "Inter",
      }}
    >
      {text}
    </Typography>
  );
};
