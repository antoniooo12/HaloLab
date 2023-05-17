import { useGetDoctors } from "./useGetDoctors";
import { useGetDoctorSpecialties } from "./useGetDoctorSpecialties";
import { useGetDoctorSpecialtyByDoctor } from "./useGetDoctorSpecialtyByDoctor";
import { isSexMatchToDoctorSpeciality } from "./isSexMatchToDoctorSpeciality";
import { useGetDoctorSpeciality } from "./useGetDoctorSpeciality";
import { useIsSexMatchToDoctorSpeciality } from "./useIsSexMatchToDoctor";

export const doctor = {
  useGetDoctors: useGetDoctors,
  useGetDoctorSpecialties: useGetDoctorSpecialties,
  useGetDoctorSpecialtyByDoctor: useGetDoctorSpecialtyByDoctor,
  isSexMatchToSpeciality: isSexMatchToDoctorSpeciality,
  useGetDoctorSpeciality: useGetDoctorSpeciality,
  useIsSexMatchToDoctor: isSexMatchToDoctorSpeciality,
  useIsSexMatchToDoctorSpeciality: useIsSexMatchToDoctorSpeciality,
};
