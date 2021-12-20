import axios from "axios";
import API from "../constants/endpoints";
import { authInterceptor } from "../interceptors";
import responseInterceptor from "../interceptors/responseInterceptor";

const axiosInstance = axios.create({
  baseURL: API.BASE_URL,
});

authInterceptor(axiosInstance);
responseInterceptor(axiosInstance);

export default axiosInstance;
