import axios from "axios";
import { SERVER_URL } from "../constants/constants";

const BASE_URL = SERVER_URL;

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original_request = error.config;

    if (error.response?.status === 401 && !original_request._retry) {
      original_request._retry = true;

      try {
        await refresh_token();
        return api(original_request);
      } catch (refreshError) {
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const get_user_profile_data = async (username) => {
  const response = await api.get(`/user_data/${username}/`);
  return response.data;
};

const refresh_token = async () => {
  const response = await api.post("/token/refresh/");
  return response.data;
};

export const login = async (username, password) => {
  try {
    const response = await api.post("/token/", { username, password });
    return response.data;
  } catch {
    return { error: true };
  }
};

export const register = async (
  username,
  email,
  first_name,
  last_name,
  password
) => {
  const response = await api.post("/register/", {
    username: username,
    email: email,
    first_name: first_name,
    last_name: last_name,
    password: password,
  });
  return response.data;
};

export const get_auth = async () => {
  const response = await api.get("/authenticated/");
  return response.data;
};

export const toggleFollow = async (username) => {
  const response = await api.post("/toggle_follow/", { username: username });
  return response.data;
};

export const get_user_posts = async (username, pageNum) => {
  const response = await api.get(`/posts/${username}/?page=${pageNum}`);
  return response.data;
};

export const toggleLike = async (id) => {
  const response = await api.post("/toggle_like/", { id: id });
  return response.data;
};

export const createPost = async (formData) => {
  const response = await api.post("/create_post/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getPosts = async (pageNum) => {
  const response = await api.get(`/get_posts/?page=${pageNum}`);
  return response.data;
};

export const search = async (query) => {
  const response = await api.get(`/search/?query=${query}`);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/logout/");
  return response.data;
};

export const update_user = async (updated_data) => {
  const response = await api.patch("/update_user/", updated_data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const delete_post = async (id) => {
  const response = await api.post("/delete_post/", { id: id });
  return response.data;
};

export const getFriends = async (username) => {
  const response = await api.get(`/get_friends/${username}`);
  return response.data;
};

export const postComment = async (id, comment) => {
  const response = await api.post("/post_comment/", {
    id: id,
    comment: comment,
  });
  return response.data;
};

export const fetchThreadMessages = async (threadId) => {
  try {
    const response = await api.get(`/chat/threads/${threadId}/`);
    return response.data; // Expected to return thread data including chat_messages
  } catch (error) {
    console.error("Error fetching thread messages:", error);
    throw error;
  }
};

export const getOrCreateThread = async (profile_username) => {
  try {
    const response = await api.post("/chat/create_thread/", {
      profile_username: profile_username,
    });
    return response.data;
  } catch {
    console.error("Error getting thread:");
  }
};

export const getDisplayThreads = async () => {
  const response = await api.get("/chat/display_threads/");
  return response.data;
};
