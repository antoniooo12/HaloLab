import {useQuery} from "@tanstack/react-query";
import {CityApi} from "../API";

export const useGetCities = () => {
    return  useQuery({
        queryKey: ['cities'],
        queryFn: () =>
            CityApi.getCities().then((res) => res.data),
    })
}