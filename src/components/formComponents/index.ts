import { FormInputText } from "./FormInputText";
import { FormInputDate } from "./FormInputDate";
import { FormInputSelect } from "./FormInputSelect";
import { FormInputAutocomplete } from "./FormInputAutocomplete";
import { FormErrorText } from "./FormErrorText";

export const Form = {
  Text: FormInputText,
  Date: FormInputDate,
  Select: FormInputSelect,
  Autocomplete: FormInputAutocomplete,
  Error: FormErrorText,
};
