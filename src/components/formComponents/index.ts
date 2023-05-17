import {FormInputText} from "./FormInputText.tsx";
import {FormInputDate} from "./FormInputDate.tsx";
import {FormInputSelect} from "./FormInputSelect.tsx";
import {FormInputAutocomplete} from "./FormInputAutocomplete.tsx";
import {FormErrorText} from "./FormErrorText.tsx";

export const Form = {
    Text : FormInputText,
    Date : FormInputDate,
    Select : FormInputSelect,
    Autocomplete : FormInputAutocomplete,
    Error : FormErrorText,
}