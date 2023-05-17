import {UseFormReturn} from 'react-hook-form'

export interface IBaseFormInput {
    form:  UseFormReturn<any>,
    name: string,
    label: string,
}


export interface IFormSelect extends IBaseFormInput{
    data: Array<{value: string, label: string}>,
}

export interface IFormAutocomplete extends IBaseFormInput{
    data: Array<{id: string, label: string}>,
}