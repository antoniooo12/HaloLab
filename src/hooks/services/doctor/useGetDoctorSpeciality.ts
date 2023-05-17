import { useGetDoctorSpecialties } from "./useGetDoctorSpecialties";

export const useGetDoctorSpeciality = (doctorSpecialityId: string) => {
  const { data: doctorSpecialties } = useGetDoctorSpecialties();
  return doctorSpecialties?.find(
    (doctorSpecialty) => doctorSpecialty.id === doctorSpecialityId
  );
};
