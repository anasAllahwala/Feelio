import { axiosInstance } from "../axios";
import { API } from "../constants";

const fetchUsers = (params) => {
  return axiosInstance.get(API.ADMIN_USERS, {
    params: { page_num: params },
  });
};

const fetchPosts = (params) => {
  return axiosInstance.get(API.ADMIN_POSTS, {
    params: { page_num: params },
  });
};

const deleteUser = (params) => {
  return axiosInstance.delete(API.ADMIN_USERS + "/" + params.user, params);
};

const deletePost = (params) => {
  return axiosInstance.delete(API.ADMIN_POSTS + "/" + params.post, params);
};

const AdminApi = { fetchUsers, fetchPosts, deleteUser, deletePost };

export default AdminApi;
