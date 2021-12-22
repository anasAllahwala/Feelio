import { axiosInstance } from "../axios";
import { API } from "../constants";

const fetchUsers = (params) => {
  return axiosInstance.get(API.ALL_USERS, { params });
};

const UsersApi = { fetchUsers };

export default UsersApi;
