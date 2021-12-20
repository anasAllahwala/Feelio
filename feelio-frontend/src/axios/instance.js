import axios from "axios";
import API from "../constants/endpoints";
import { authInterceptor, responseInterceptor } from "../interceptors";

const axiosInstance = axios.create({
  baseURL: API.BASE_URL,
});

authInterceptor(axiosInstance);
responseInterceptor(axiosInstance);

export default axiosInstance;
