import { useQuery } from "@tanstack/react-query";
import { DoctorApi } from "../API";

export const useGetDoctorSpecialties = () => {
  return useQuery({
    queryKey: ["doctorSpecialties"],
    queryFn: () => DoctorApi.getDoctorSpecialties().then((res) => res.data),
  });
};
