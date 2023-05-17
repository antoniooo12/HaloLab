import {baseNetwork} from "../baseNetwork.ts";
import {URLs} from "../../constants";
import {ApiResponse} from "../interface.ts";
import {IResponseDoctor} from "./interface.ts";

export class DoctorApi {
    private static readonly api = baseNetwork

    static async getDoctors(): ApiResponse<IResponseDoctor[]> {
        return this.api.get(URLs.DOCTOR)
    }

}