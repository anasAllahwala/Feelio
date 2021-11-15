import axios from "axios";
import { API } from "../constants";

const Login = (params) => {
  return axios.post(API.LOGIN, params);
};

const Register = (params) => {
  return axios.post(API.REGISTER, params);
};

const Profile = () => {
  return axios.get(API.PROFILE, null, {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });
};

const Auth = { Login, Register, Profile };

export default Auth;
