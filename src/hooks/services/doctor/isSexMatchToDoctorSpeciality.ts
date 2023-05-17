import { SEX } from "../../../constants";
import { IResponseDoctorSpeciality } from "../../../API";

export const isSexMatchToDoctorSpeciality = (
  speciality: IResponseDoctorSpeciality,
  selectedSex: SEX
) => {
  const doctorFor = speciality?.params?.gender;
  return !(
    (selectedSex === SEX.Female && doctorFor === SEX.Male) ||
    (selectedSex === SEX.Male && doctorFor === SEX.Female)
  );
};
