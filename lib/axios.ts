import axios from "axios";

const axiosInstance = axios.create({
  // Setting the base URL ensures relative paths like axios.put('/api/upload') resolve correctly
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add a response interceptor to handle global errors cleanly
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log failures to the console for easier debugging during development
    console.error(
      "API Error Interceptor:",
      error.response?.data || error.message,
    );
    return Promise.reject(error);
  },
);

export default axiosInstance;
