import { File } from "buffer";

export interface HealthInfoDataInterface {
  id?: number;
  company_uen: string;
  company_name: string;
  full_name: string;
  company_position: string;
  email: string;
  re_enter_email?: string;
  mobile_no: string;
  file: File | null;
  terms_condition?: boolean;
  isActive?: boolean;
}

export interface HealthInfoResponse {
  statusCode: number;
  message: string;
  data?: HealthInfoDataInterface[];
}
