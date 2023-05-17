import { z } from "zod";

export const emailSchema = z.string().email();
export const phoneNumberSchema = z
  .string()
  .refine(
    (value) => /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(value),
    {
      message:
        "Invalid phone number format. Expected format like: 123 456 7890",
    }
  );

export const validationAutocomplete = z.object({
  id: z.string(),
  label: z.string(),
});
