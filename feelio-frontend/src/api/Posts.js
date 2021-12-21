import { axiosInstance } from "../axios";
import { API } from "../constants";

const create = (params) => {
  return axiosInstance.post(API.POSTS, params);
};

const fetch = (params) => {
  return axiosInstance.get(API.POSTS, params);
};

const fetchMyPosts = (params) => {
  return axiosInstance.get(API.USER_POSTS + params.user);
};

const destroy = (params) => {
  return axiosInstance.delete(API.POSTS, {
    data: params,
  });
};

const edit = (params) => {
  return axiosInstance.patch(API.POSTS, params);
};

const PostsApi = { create, fetch, destroy, edit, fetchMyPosts };

export default PostsApi;
