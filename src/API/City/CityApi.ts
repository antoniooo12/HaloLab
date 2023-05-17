import { baseNetwork } from "../baseNetwork";
import { URLs } from "../../constants";
import { IResponseCity } from "./interface";
import { ApiResponse } from "../interface.ts";

export class CityApi {
  private static readonly api = baseNetwork;

  static async getCities(): ApiResponse<IResponseCity[]> {
    return this.api.get(URLs.CITY);
  }
}
