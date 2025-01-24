import axios from "axios";

// Set the base URL for the API (adjust according to your API's base URL)
const API_BASE_URL = "http://localhost:3000/api/";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add Authorization token to request headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle responses and errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle specific response errors here
    if (error.response) {
      // You can check for specific status codes here
      if (error.response.status === 401) {
        console.error("Unauthorized! Please login.");
      } else if (error.response.status === 500) {
        console.error("Server error! Please try again later.");
      }
    } else if (error.request) {
      console.error("No response received from server.");
    } else {
      console.error("Error occurred: ", error.message);
    }
    return Promise.reject(error);
  }
);

// API Service Methods
export const apiService = {
  get: async (url, params = {}) => {
    try {
      const response = await apiClient.get(url, { params });
      return response.data;
    } catch (error) {
      console.error("GET Error:", error);
      throw error;
    }
  },

  post: async (url, data) => {
    try {
      const response = await apiClient.post(url, data);
      return response.data;
    } catch (error) {
      console.error("POST Error:", error);
      throw error;
    }
  },

  put: async (url, data) => {
    try {
      const response = await apiClient.put(url, data);
      return response.data;
    } catch (error) {
      console.error("PUT Error:", error);
      throw error;
    }
  },

  patch: async (url, data) => {
    try {
      const response = await apiClient.patch(url, data);
      return response.data;
    } catch (error) {
      console.error("PATCH Error:", error);
      throw error;
    }
  },

  delete: async (url) => {
    try {
      const response = await apiClient.delete(url);
      return response.data;
    } catch (error) {
      console.error("DELETE Error:", error);
      throw error;
    }
  },
};
