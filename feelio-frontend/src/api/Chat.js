import { axiosInstance } from "../axios";
import { API } from "../constants";

const fetchMessages = (data) => {
  return axiosInstance.get(API.MESSAGES + data);
};

const sendMessage = (chat, message) => {
  return axiosInstance.post(API.MESSAGES + chat + API.SEND_MESSAGE, {
    message,
  });
};

const ChatsApi = {
  fetchMessages,
  sendMessage,
};

export default ChatsApi;
