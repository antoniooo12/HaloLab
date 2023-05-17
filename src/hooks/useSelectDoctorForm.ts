import {useGetCities} from "./useGetCities.ts";
import {useGetDoctors} from "./useGetDoctors.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useMemo, useState} from "react";
import {Client} from "../services";
import {ISelectDoctorForm, selectDoctorFormSchema} from "../utils/validations/selectDoctorFormSchema.ts";
import {SELECT_DOCTOR_FORM_FIELDS, SEX} from "../constants";


export const useSelectDoctorForm = () => {

    const {data: cities} = useGetCities()
    const {data: doctors} = useGetDoctors()

    const form = useForm<ISelectDoctorForm>({
        resolver: zodResolver(selectDoctorFormSchema),
    });
    const {handleSubmit, watch, clearErrors, setError, setValue} = form;


    const {
        DOCTOR: selectedDoctor,
        CITY: selectedCity,
        BIRTHDAY_DATE: clientBirthday,
        EMAIL: email,
        PHONE_NUMBER: phoneNumber
    } = watch()

    const [contactError, setContactError] = useState(false)
    const sexData = Object.values(SEX).map((value) => ({value, label: value}))
    const citiesData = useMemo(() => {
        if (cities) {
            return cities.map(({name, id}) => ({id, label: name}))
        }
        return []
    }, [cities])

    const doctorsData = useMemo(() => {
        const isClientNeedPediatrician = Client.isClientNeedPediatrician(clientBirthday)
        if (doctors) {
            return doctors
                .filter(({isPediatrician}) => {
                    if (clientBirthday) {
                        if (isClientNeedPediatrician && isPediatrician) {
                            return true
                        } else if (isClientNeedPediatrician && !isPediatrician) {
                            return false
                        } else if (!isClientNeedPediatrician && !isPediatrician) {
                            return true
                        } else {
                            return false
                        }
                    }
                    return true
                })
                .filter(({cityId}) => {
                    if (selectedCity) {
                        return cityId === selectedCity.id
                    }
                    return true
                }).map(({name, id}) => ({id, label: name}))
        }
        return []
    }, [selectedCity, doctors, clientBirthday])


    useEffect(() => {
        let isError = false
        const doctor = doctors?.find(({id}) => id === selectedDoctor?.id)
        if (selectedCity && doctor?.cityId !== selectedCity.id) {
            isError = true
            setError(SELECT_DOCTOR_FORM_FIELDS.DOCTOR, {
                type: 'manual',
                message: 'Please choose a doctor who is located in the selected city'
            })
        }
        if (doctor && clientBirthday) {
            const isClientNeedPediatrician = Client.isClientNeedPediatrician(clientBirthday)
            if (isClientNeedPediatrician && !doctor.isPediatrician) {
                isError = true
                setError(SELECT_DOCTOR_FORM_FIELDS.DOCTOR, {
                    type: 'manual',
                    message: 'Please choose a pediatrician doctor'
                })
            } else if (!isClientNeedPediatrician && doctor.isPediatrician) {
                isError = true
                setError(SELECT_DOCTOR_FORM_FIELDS.DOCTOR, {
                    type: 'manual',
                    message: 'Please select a non-pediatrician doctor'
                })
            }
        }
        if (!isError) {
            clearErrors(SELECT_DOCTOR_FORM_FIELDS.DOCTOR)
        }
    }, [selectedCity, doctors, selectedDoctor, clientBirthday])

    useEffect(() => {
        const doctor = doctors?.find(({id}) => id === selectedDoctor?.id)
        const city = cities?.find(({id}) => id === doctor?.cityId)
        console.log(city)
        if (city) {
            console.log('set')
            setValue(SELECT_DOCTOR_FORM_FIELDS.CITY, {id: city.id, label: city.name})
        }
    }, [selectedDoctor])


    useEffect(() => {
        if (phoneNumber || email) {
            setContactError(false)
            clearErrors(SELECT_DOCTOR_FORM_FIELDS.PHONE_NUMBER)
            clearErrors(SELECT_DOCTOR_FORM_FIELDS.EMAIL)
        }
    }, [email, phoneNumber])

    const checkContactInfo = (data: ISelectDoctorForm) => {
        console.log(!(data.EMAIL || data.PHONE_NUMBER))
        if (!(data.EMAIL || data.PHONE_NUMBER)) {
            setContactError(true)
            setError(SELECT_DOCTOR_FORM_FIELDS.PHONE_NUMBER, {
                type: 'manual',
                message: 'Please fill in at least one contact field'
            })
            setError(SELECT_DOCTOR_FORM_FIELDS.EMAIL, {
                type: 'manual',
                message: 'Please fill in at least one contact field'
            })
        } else {
            setContactError(false)
            clearErrors(SELECT_DOCTOR_FORM_FIELDS.PHONE_NUMBER)
            clearErrors(SELECT_DOCTOR_FORM_FIELDS.EMAIL)
        }
    }

    const sendRequest = () => {
        alert('Form is valid and request can be sent')
    }
    const onSubmit = async () => {
        checkContactInfo(form.getValues())
        handleSubmit(sendRequest)()
    }
    return {form, onSubmit, handleSubmit, citiesData, doctorsData, contactError, sexData}
}