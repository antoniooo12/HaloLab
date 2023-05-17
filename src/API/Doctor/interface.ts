import {SEX} from "../../constants";

export type IResponseDoctor = {
    id: string,
    name: string,
    surname: string,
    specialityId: string,
    isPediatrician: boolean,
    cityId: string
}


export interface IResponseDoctorSpeciality {
    id: string,
    name: string,
    params?: {
        maxAge?: number,
        minAge?: number,
        gender?: SEX,
    }
}