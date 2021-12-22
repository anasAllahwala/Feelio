import { axiosInstance } from "../axios";
import { API } from "../constants";

const Login = (params) => {
  return axiosInstance.post(API.LOGIN, params);
};

const Register = (params) => {
  return axiosInstance.post(API.REGISTER, params, {
    "content-type": "multipart/form-data",
  });
};

const Profile = (params) => {
  let param = "";
  if (params) {
    param = "/" + params.user;
  }
  return axiosInstance.get(API.PROFILE + param, null);
};

const Auth = { Login, Register, Profile };

export default Auth;
