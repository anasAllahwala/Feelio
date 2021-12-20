import { axiosInstance } from "../axios";
import { API } from "../constants";

const fetchFriends = () => {
  return axiosInstance.get(API.FRIENDS);
};

const fetchPendingRequests = () => {
  return axiosInstance.get(API.FRIEND_REQUESTS);
};

const acceptFriendRequest = (data) => {
  return axiosInstance.patch(API.ACCEPT_FRIEND_REQUEST, data);
};

const rejectFriendRequest = (data) => {
  return axiosInstance.patch(API.REJECT_FRIEND_REQUEST, data);
};

const sendFriendRequest = (data) => {
  return axiosInstance.post(API.FRIEND_REQUESTS, data);
};

const FriendsApi = {
  fetchPendingRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  sendFriendRequest,
  fetchFriends,
};

export default FriendsApi;
