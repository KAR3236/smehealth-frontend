import { HealthInfoDataInterface } from "../Utils/healthInfoInterface";
import { ADD_HEALTH_INFO, HEALTH_INFO_PDF } from "./APIs";
import { baseURL } from "./baseUrl";

export async function addHealthInfoAPI(data: HealthInfoDataInterface) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null) {
      // Check if the value is not null
      if (value instanceof FileList || value instanceof Array) {
        // If the value is a FileList or an array of Files, append each file
        Array.from(value).forEach((file) => {
          formData.append(key, file, file.name);
        });
      } else {
        // For string values, just append them directly
        formData.append(key, value);
      }
    }
  });

  return await baseURL.post(ADD_HEALTH_INFO, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function listOfHealthInfoAPI(
  page: number,
  pageSize: number,
  field: string | undefined,
  sort: string | undefined | null
) {
  return await baseURL.get(ADD_HEALTH_INFO, {
    params: {
      take: pageSize,
      skip: page * pageSize,
      orderfield: field,
      order: sort,
    },
  });
}

export async function viewHealthInfoPdfAPI(id: string | null) {
  return await baseURL.get(`${HEALTH_INFO_PDF}/${id}`);
}
