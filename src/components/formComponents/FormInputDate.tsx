import { Controller } from "react-hook-form";
import { IBaseFormInput } from "./interfaces";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import moment from "moment";
import { FormErrorText } from "./FormErrorText";

export const FormInputDate: React.FC<IBaseFormInput> = ({
  name,
  form,
  label,
}) => {
  const { control } = form;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <DatePicker
            label={label}
            onChange={(value) => {
              if (value !== null) {
                onChange(value.toDate());
              }
            }}
            value={value ? moment(value) : null}
            format={"DD/MM/YYYY"}
          />
          <FormErrorText text={error && error.message} />
        </>
      )}
    />
  );
};
