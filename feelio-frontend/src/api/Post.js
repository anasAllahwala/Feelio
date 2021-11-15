import axios from "axios";
import { API } from "../constants";

export const create = (params) => {
  axios.post(API.POSTS);
};

export const fetch = (params) => {
  axios.get(API.POSTS);
};

export const destroy = (params) => {
  axios.delete(API.POSTS);
};

export const edit = (params) => {
  axios.patch(API.POSTS);
};
