import axios from "axios";
import { API } from "../constants";

const create = (params) => {
  return axios.post(API.POSTS, params, {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });
};

const fetch = (params) => {
  return axios.get(API.POSTS, params, {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });
};

const destroy = (params) => {
  return axios.delete(API.POSTS, params, {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });
};

const edit = (params) => {
  return axios.patch(API.POSTS, params, {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });
};

const PostsApi = { create, fetch, destroy, edit };

export default PostsApi;
