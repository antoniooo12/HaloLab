import {baseNetwork} from "../baseNetwork";
import {URLs} from "../../constants";
import {ApiResponse} from "../interface";
import {IResponseDoctor, IResponseDoctorSpeciality} from "./interface";

export class DoctorApi {
    private static readonly api = baseNetwork

    static async getDoctors(): ApiResponse<IResponseDoctor[]> {
        return this.api.get(URLs.DOCTOR)
    }

    static async getDoctorSpecialties(): ApiResponse<IResponseDoctorSpeciality[]> {
        return this.api.get(URLs.DOCTOR_SPECIALITY)
    }

}