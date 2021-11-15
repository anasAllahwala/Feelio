// Local URL of server
const BASE_URL = "http://127.0.0.1:5000/";

// Auth Endpoints
const LOGIN = BASE_URL + "auth/login";
const REGISTER = BASE_URL + "auth/register";
const PROFILE = BASE_URL + "auth/profile";

// Post Endpoints
const POSTS = BASE_URL + "posts";

// Friends Endpoints
const FRIENDS = BASE_URL + "friends";

const API = { LOGIN, REGISTER, PROFILE, POSTS, FRIENDS };

export default API;
