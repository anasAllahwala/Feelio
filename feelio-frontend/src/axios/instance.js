import axios from "axios";
import API from "../constants/endpoints";
import { authInterceptor } from "../interceptors";

const axiosInstance = axios.create({
  baseURL: API.BASE_URL,
});

authInterceptor(axiosInstance);

export default axiosInstance;
