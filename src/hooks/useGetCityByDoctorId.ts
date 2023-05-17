import { useGetCities } from "./useGetCities.ts";
import { useGetDoctors } from "./useGetDoctors.ts";
import { useEffect, useMemo } from "react";
import { IResponseCity } from "../API";

export const useGetCityByDoctorId = (
  doctorId: string,
  callback?: (city?: IResponseCity) => void
) => {
  const { data: cities } = useGetCities();
  const { data: doctors } = useGetDoctors();
  const city = useMemo(() => {
    if (cities && doctors) {
      const doctor = doctors?.find(({ id }) => id === doctorId);
      return cities?.find(({ id }) => id === doctor?.cityId);
    }
  }, [cities, doctors, doctorId]);
  useEffect(() => {
    callback && callback(city);
  }, [city]);
  return city;
};
