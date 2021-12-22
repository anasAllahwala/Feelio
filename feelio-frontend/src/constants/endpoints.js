// Local URL of server
const BASE_URL = "http://127.0.0.1:5000/";

// Auth Endpoints
const LOGIN = "auth/login";
const REGISTER = "auth/register";
const PROFILE = "auth/profile";

// Post Endpoints
const POSTS = "posts";
const USER_POSTS = "posts/user/";

// Friends Endpoints
const FRIENDS = "friends";
const FRIEND_REQUESTS = "friends/requests";
const ACCEPT_FRIEND_REQUEST = "friends/requests/accept";
const REJECT_FRIEND_REQUEST = "friends/requests/reject";

// Chats Endpoints
const MESSAGES = "chats/";
const SEND_MESSAGE = "/new";

// Admin Endpoints
const ADMIN_USERS = "admin/users";
const ADMIN_POSTS = "admin/posts";

// Global Endpoints
const ALL_USERS = "/users";

const API = {
  LOGIN,
  REGISTER,
  PROFILE,
  POSTS,
  USER_POSTS,
  FRIENDS,
  ALL_USERS,
  BASE_URL,
  FRIEND_REQUESTS,
  ACCEPT_FRIEND_REQUEST,
  REJECT_FRIEND_REQUEST,
  MESSAGES,
  SEND_MESSAGE,
  ADMIN_USERS,
  ADMIN_POSTS,
};

export default API;
