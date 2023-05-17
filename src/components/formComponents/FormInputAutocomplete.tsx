import { Controller } from "react-hook-form";
import { IFormAutocomplete } from "./interfaces";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { FormErrorText } from "./FormErrorText";

export const FormInputAutocomplete: React.FC<IFormAutocomplete> = ({
  name,
  form,
  label,
  data,
}) => {
  const { control } = form;
  const [inputValue, setInputValue] = React.useState("");

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <>
            <Autocomplete
              onChange={(_, value) => {
                onChange(value);
              }}
              value={value || null}
              inputValue={inputValue}
              onInputChange={(_, newInputValue) => {
                console.log(newInputValue);
                setInputValue(newInputValue);
              }}
              isOptionEqualToValue={(option, value) =>
                value === undefined || value === "" || option.id === value.id
              }
              fullWidth
              disablePortal
              options={data}
              renderInput={(params) => (
                <TextField {...params} label={label} variant="outlined" />
              )}
            />
            <FormErrorText text={error && error.message} />
          </>
        );
      }}
    />
  );
};
