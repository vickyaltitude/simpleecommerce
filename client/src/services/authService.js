import api from "./api";

export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);

  // Store token and user in localStorage
  if (response.data.success && response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }

  return response;
};

export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);

  // Store token and user in localStorage
  if (response.data.success && response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }

  return response;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response;
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const getStoredUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};
