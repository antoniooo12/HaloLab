import { z } from "zod";

export const emailSchema = z.string().email();
export const phoneNumberSchema = z
  .string()
  .refine(
    (value) => /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(value),
    {
      message:
        "Invalid phone number format. Expected format like: +380-12345678990.",
    }
  );

export const validationAutocomplete = z.object({
  id: z.string(),
  label: z.string(),
});
