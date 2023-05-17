import { useGetDoctorSpecialties } from "./useGetDoctorSpecialties";
import { useGetDoctors } from "./useGetDoctors";
import { useEffect, useMemo } from "react";
import { IResponseDoctorSpeciality } from "../../../API";

export const useGetDoctorSpecialtyByDoctor = (
  doctorId: string,
  callback?: (doctorSpeciality?: IResponseDoctorSpeciality) => void
) => {
  const { data: doctorSpecialties } = useGetDoctorSpecialties();
  const { data: doctors } = useGetDoctors();
  const doctorSpecialtyByDoctor = useMemo(() => {
    if (doctorSpecialties && doctors) {
      const doctor = doctors?.find(({ id }) => id === doctorId);
      return (
        doctor &&
        doctorSpecialties.find(({ id }) => {
          return id === doctor.specialityId;
        })
      );
    }
  }, [doctorSpecialties, doctors, doctorId]);
  useEffect(() => {
    callback && callback(doctorSpecialtyByDoctor);
  }, [doctorSpecialtyByDoctor]);
  return doctorSpecialtyByDoctor;
};
