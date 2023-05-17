import {Controller} from "react-hook-form";
import {IFormSelect} from "./interfaces.ts";
import {InputLabel, MenuItem, Select} from "@mui/material";
import React from "react";
import {FormErrorText} from "./FormErrorText.tsx";

export const FormInputSelect: React.FC<IFormSelect> = ({name, form, label, data}) => {
    const {control} = form
    return (
        <Controller
            name={name}
            control={control}
            render={({
                         field: {onChange, value},
                         fieldState: {error},
                     }) => (
                <>
                    <InputLabel id={`select-label-${label}`}>{label}</InputLabel>
                    <Select
                        error={!!error}
                        id={`select-label-${label}`}
                        value={value || ''}
                        placeholder={label}
                        onChange={onChange}
                    >
                        {data.map(({value, label}) => (
                            <MenuItem key={label} value={value}>{label}</MenuItem>
                        ))}
                    </Select>
                    <FormErrorText text={error && error.message}/>
                </>
            )}
        />
    );
};