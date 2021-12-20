// Local URL of server
const BASE_URL = "http://127.0.0.1:5000/";

// Auth Endpoints
const LOGIN = "auth/login";
const REGISTER = "auth/register";
const PROFILE = "auth/profile";

// Post Endpoints
const POSTS = "posts";

// Friends Endpoints
const FRIENDS = "friends";
const FRIEND_REQUESTS = "friends/requests";
const ACCEPT_FRIEND_REQUEST = "friends/requests/accept";
const REJECT_FRIEND_REQUEST = "friends/requests/reject";

const API = {
  LOGIN,
  REGISTER,
  PROFILE,
  POSTS,
  FRIENDS,
  BASE_URL,
  FRIEND_REQUESTS,
  ACCEPT_FRIEND_REQUEST,
  REJECT_FRIEND_REQUEST,
};

export default API;
