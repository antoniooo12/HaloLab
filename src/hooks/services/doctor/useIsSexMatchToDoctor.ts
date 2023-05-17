import { SEX } from "../../../constants";
import { useGetDoctorSpeciality } from "./useGetDoctorSpeciality";
import { isSexMatchToDoctorSpeciality } from "./isSexMatchToDoctorSpeciality";

export const useIsSexMatchToDoctorSpeciality = (
  doctorSpecialityId: string,
  sex: SEX
) => {
  const doctorSpecialty = useGetDoctorSpeciality(doctorSpecialityId);

  if (doctorSpecialty) {
    return isSexMatchToDoctorSpeciality(doctorSpecialty, sex);
  }
};
