import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { ISelectDoctorForm, selectDoctorFormSchema } from "../utils";
import { SELECT_DOCTOR_FORM_FIELDS, SEX } from "../constants";
import { service } from "./services";

export const useSelectDoctorForm = () => {
  const { data: cities } = service.city.useGetCities();
  const { data: doctors } = service.doctor.useGetDoctors();
  const { data: doctorSpecialties } = service.doctor.useGetDoctorSpecialties();

  const form = useForm<ISelectDoctorForm>({
    resolver: zodResolver(selectDoctorFormSchema),
  });
  const { handleSubmit, watch, clearErrors, setError, setValue } = form;

  const {
    DOCTOR: selectedDoctor,
    CITY: selectedCity,
    BIRTHDAY_DATE: clientBirthday,
    EMAIL: email,
    PHONE_NUMBER: phoneNumber,
    SEX: selectedSex,
    DOCTOR_SPECIALITY: selectedDoctorSpeciality,
  }: Partial<ISelectDoctorForm> = watch();

  const [contactError, setContactError] = useState(false);

  //Start of the section for converting the date to display on the form
  const sexData = useMemo(
    () =>
      Object.values(SEX).map((value) => ({
        value,
        label: value,
      })),
    []
  );

  const citiesData = useMemo(() => {
    if (cities) {
      return cities.map(({ name, id }) => ({ id, label: name }));
    }
    return [];
  }, [cities]);

  const doctorSpecialtiesData = useMemo(() => {
    if (doctorSpecialties) {
      return doctorSpecialties
        .filter((speciality) => {
          return service.doctor.isSexMatchToSpeciality(speciality, selectedSex);
        })
        .map(({ name, id }) => ({ id, label: name }));
    }
    return [];
  }, [doctorSpecialties, selectedSex]);

  const isSexMatchToDoctorSpeciality =
    service.doctor.useIsSexMatchToDoctorSpeciality(
      selectedDoctorSpeciality?.id,
      selectedSex
    );
  const doctorsData = useMemo(() => {
    const isClientNeedPediatrician =
      service.client.isClientNeedPediatrician(clientBirthday);

    if (doctors) {
      return doctors
        .filter((doctor) => {
          const isPediatricianMatch = clientBirthday
            ? isClientNeedPediatrician === doctor.isPediatrician
            : true;
          const isSexMatch = isSexMatchToDoctorSpeciality || true;
          const isSpecialityMatch = selectedDoctorSpeciality
            ? doctor.specialityId === selectedDoctorSpeciality.id
            : true;
          const isCityMatch = selectedCity
            ? doctor.cityId === selectedCity.id
            : true;
          return (
            isPediatricianMatch &&
            isSpecialityMatch &&
            isCityMatch &&
            isSexMatch
          );
        })
        .map(({ name, id }) => ({ id, label: name }));
    }
    return [];
  }, [selectedCity, doctors, clientBirthday, selectedDoctorSpeciality]);
  // End of the section for converting the date to display on the form

  // Inform the user that the doctor is not appropriate for the selected age
  useEffect(() => {
    const doctor = doctors?.find(({ id }) => id === selectedDoctor?.id);
    if (selectedCity && doctor && doctor.cityId !== selectedCity.id) {
      setError(SELECT_DOCTOR_FORM_FIELDS.DOCTOR, {
        type: "manual",
        message: "Please choose a doctor who is located in the selected city",
      });
    } else if (doctor && clientBirthday) {
      const isClientNeedPediatrician =
        service.client.isClientNeedPediatrician(clientBirthday);
      if (isClientNeedPediatrician && !doctor.isPediatrician) {
        setError(SELECT_DOCTOR_FORM_FIELDS.DOCTOR, {
          type: "manual",
          message: "Please choose a pediatrician doctor",
        });
      } else if (!isClientNeedPediatrician && doctor.isPediatrician) {
        setError(SELECT_DOCTOR_FORM_FIELDS.DOCTOR, {
          type: "manual",
          message: "Please select a non-pediatrician doctor",
        });
      } else {
        clearErrors(SELECT_DOCTOR_FORM_FIELDS.DOCTOR);
      }
    } else {
      clearErrors(SELECT_DOCTOR_FORM_FIELDS.DOCTOR);
    }
  }, [selectedCity, doctors, clientBirthday, setError, clearErrors]);

  // set city when doctor is chosen
  service.city.useGetCityByDoctorId(selectedDoctor?.id, (city) => {
    if (city) {
      setValue(SELECT_DOCTOR_FORM_FIELDS.CITY, {
        id: city.id,
        label: city.name,
      });
    }
  });

  // set specialty when doctor is chosen
  service.doctor.useGetDoctorSpecialtyByDoctor(
    selectedDoctor?.id,
    (specialty) => {
      if (specialty) {
        setValue(SELECT_DOCTOR_FORM_FIELDS.DOCTOR_SPECIALITY, {
          id: specialty.id,
          label: specialty.name,
        });
      }
    }
  );

  // track changes in contact info, when one of the fields is filled, the error is removed
  useEffect(() => {
    if (phoneNumber || email) {
      setContactError(false);
      clearErrors(SELECT_DOCTOR_FORM_FIELDS.PHONE_NUMBER);
      clearErrors(SELECT_DOCTOR_FORM_FIELDS.EMAIL);
    }
  }, [email, phoneNumber]);

  const checkContactInfo = (data: ISelectDoctorForm) => {
    if (!(data.EMAIL || data.PHONE_NUMBER)) {
      setContactError(true);
      setError(SELECT_DOCTOR_FORM_FIELDS.PHONE_NUMBER, {
        type: "manual",
        message: "Please fill in at least one contact field",
      });
      setError(SELECT_DOCTOR_FORM_FIELDS.EMAIL, {
        type: "manual",
        message: "Please fill in at least one contact field",
      });
    }
  };

  const sendRequest = () => {
    alert("Form is valid and request can be sent");
  };

  const onSubmit = () => {
    checkContactInfo(form.getValues());
    handleSubmit(sendRequest)();
  };

  return {
    form,
    onSubmit,
    handleSubmit,
    citiesData,
    doctorsData,
    contactError,
    sexData,
    doctorSpecialtiesData,
  };
};
