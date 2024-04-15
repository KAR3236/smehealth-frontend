import { HealthInfoDataInterface } from "../Utils/healthInfoInterface";
import { ADD_HEALTH_INFO } from "./APIs";
import { baseURL } from "./baseUrl";

export async function addHealthInfoAPI(data: HealthInfoDataInterface) {
  delete data.re_enter_email;
  delete data.terms_condition;
  return await baseURL.post(ADD_HEALTH_INFO, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function listOfHealthInfoAPI() {
  return await baseURL.get(ADD_HEALTH_INFO);
}
