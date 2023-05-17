import {z} from "zod";
import {emailSchema, phoneNumberSchema, validationAutocomplete} from "./base.ts";
import {SELECT_DOCTOR_FORM_FIELDS} from "../../constants";

export const selectDoctorFormSchema = z.object({
    [SELECT_DOCTOR_FORM_FIELDS.NAME]: z.string().min(1)
        .refine((value) => /^([^0-9]*)$/.test(value), 'Name is not valid'),
    [SELECT_DOCTOR_FORM_FIELDS.BIRTHDAY_DATE]: z.date(),
    [SELECT_DOCTOR_FORM_FIELDS.SEX]: z.string().min(1),
    [SELECT_DOCTOR_FORM_FIELDS.CITY]: validationAutocomplete,
    [SELECT_DOCTOR_FORM_FIELDS.DOCTOR]: validationAutocomplete,
    [SELECT_DOCTOR_FORM_FIELDS.DOCTOR_SPECIALITY]: validationAutocomplete,
    [SELECT_DOCTOR_FORM_FIELDS.EMAIL]: emailSchema.optional(),
    [SELECT_DOCTOR_FORM_FIELDS.PHONE_NUMBER]: phoneNumberSchema.optional(),
})

export type ISelectDoctorForm = z.infer<typeof selectDoctorFormSchema>;
