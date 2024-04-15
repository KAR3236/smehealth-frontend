import axios from "axios";

export const URL = "http://localhost:5000/";

export const baseURL = axios.create({
  baseURL: `${URL}api/`,
});
