import axios from "axios";

const authInterceptor = () => {
  axios.interceptors.request.use(
    function (config) {
      if (config.url !== "/auth/login" && config.url !== "/auth/register") {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};

export default authInterceptor;
