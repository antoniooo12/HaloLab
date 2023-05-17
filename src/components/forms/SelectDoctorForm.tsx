import {Form} from "../formComponents";
import {Button, Card, Typography} from "@mui/material";
import {useSelectDoctorForm} from "../../hooks/useSelectDoctorForm.ts";
import {SELECT_DOCTOR_FORM_FIELDS} from "../../constants";

const labels = {
    [SELECT_DOCTOR_FORM_FIELDS.NAME]: 'Name',
    [SELECT_DOCTOR_FORM_FIELDS.BIRTHDAY_DATE]: 'Birthday date',
    [SELECT_DOCTOR_FORM_FIELDS.SEX]: 'Sex',
    [SELECT_DOCTOR_FORM_FIELDS.CITY]: 'City',
    [SELECT_DOCTOR_FORM_FIELDS.DOCTOR]: 'Doctor',
    [SELECT_DOCTOR_FORM_FIELDS.DOCTOR_SPECIALITY]: 'Doctor Specialty',
    [SELECT_DOCTOR_FORM_FIELDS.EMAIL]: 'Email',
    [SELECT_DOCTOR_FORM_FIELDS.PHONE_NUMBER]: 'Phone number',
}

export const SelectDoctorForm = () => {
    const {contactError, sexData, doctorsData, citiesData,form, onSubmit, doctorSpecialtiesData} = useSelectDoctorForm()



    return (
        <
            Card
            sx={{
                bgcolor: 'background.paper',
                boxShadow: 1,
                borderRadius: 2,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: 400,
            }}
        >
            <Form.Text
                form={form}
                name={SELECT_DOCTOR_FORM_FIELDS.NAME}
                label={labels[SELECT_DOCTOR_FORM_FIELDS.NAME]}
            />

            <Form.Date
                form={form}
                name={SELECT_DOCTOR_FORM_FIELDS.BIRTHDAY_DATE}
                label={labels[SELECT_DOCTOR_FORM_FIELDS.BIRTHDAY_DATE]}/>
            <Form.Select
                form={form}
                name={SELECT_DOCTOR_FORM_FIELDS.SEX}
                label={labels[SELECT_DOCTOR_FORM_FIELDS.SEX]}
                data={sexData}
            />
            <Form.Autocomplete
                form={form}
                name={SELECT_DOCTOR_FORM_FIELDS.CITY}
                label={labels[SELECT_DOCTOR_FORM_FIELDS.CITY]}
                data={citiesData}
            />
            <Form.Autocomplete
                form={form}
                name={SELECT_DOCTOR_FORM_FIELDS.DOCTOR_SPECIALITY}
                label={labels[SELECT_DOCTOR_FORM_FIELDS.DOCTOR_SPECIALITY]}
                data={doctorSpecialtiesData}
            />
            <Form.Autocomplete
                form={form}
                name={SELECT_DOCTOR_FORM_FIELDS.DOCTOR}
                label={labels[SELECT_DOCTOR_FORM_FIELDS.DOCTOR]}
                data={doctorsData}
            />
            <Form.Text
                type={'email'}
                form={form}
                name={SELECT_DOCTOR_FORM_FIELDS.EMAIL}
                label={labels[SELECT_DOCTOR_FORM_FIELDS.EMAIL]}
            />
            <Typography
                sx={{
                    textAlign: 'center',
                    color: 'text.secondary',
                    fontSize: 14,
                }}
            >
                OR
            </Typography>
            <Form.Text
                type={'tel'}
                form={form}
                name={SELECT_DOCTOR_FORM_FIELDS.PHONE_NUMBER}
                label={labels[SELECT_DOCTOR_FORM_FIELDS.PHONE_NUMBER]}
            />
            {contactError && <Form.Error text={'Please provide at least one method of contact'}/>}
            <Button onClick={onSubmit} variant="contained">Contained</Button>
        </Card>
    );
};

