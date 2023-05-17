import { useQuery } from "@tanstack/react-query";
import { DoctorApi } from "../API";

export const useGetDoctors = () => {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: () => DoctorApi.getDoctors().then((res) => res.data),
  });
};
