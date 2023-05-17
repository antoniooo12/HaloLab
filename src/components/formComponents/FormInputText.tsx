import { Controller } from "react-hook-form";
import { IBaseFormInput } from "./interfaces.ts";
import { TextField } from "@mui/material";
import React from "react";
import { BaseTextFieldProps } from "@mui/material/TextField/TextField";
import { FormErrorText } from "./FormErrorText.tsx";

export const FormInputText: React.FC<IBaseFormInput & BaseTextFieldProps> = ({
  name,
  form,
  label,
  ...props
}) => {
  const { control } = form;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <TextField
            size="small"
            error={!!error}
            onChange={onChange}
            value={value || ""}
            fullWidth
            label={label}
            variant="outlined"
            {...props}
          />
          <FormErrorText text={error && error.message} />
        </>
      )}
    />
  );
};
