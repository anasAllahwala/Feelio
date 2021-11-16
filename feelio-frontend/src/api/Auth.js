import { axiosInstance } from "../axios";
import { API } from "../constants";

const Login = (params) => {
  return axiosInstance.post(API.LOGIN, params);
};

const Register = (params) => {
  return axiosInstance.post(API.REGISTER, params);
};

const Profile = () => {
  return axiosInstance.get(API.PROFILE, null);
};

const Auth = { Login, Register, Profile };

export default Auth;
