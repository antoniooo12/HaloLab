import axios from "axios";
import { URLs } from "../constants";

export const baseNetwork = axios.create({
  baseURL: URLs.BASE_URL,
});
