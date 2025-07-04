import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://69.62.67.197:8000/api",
  withCredentials: true,
});

// Interceptor para agregar el token JWT si existe
api.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejo global de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Aquí puedes manejar errores globales (ej: redirect a login si 401)
    if (error.response && error.response.status === 401) {
      // window.location.href = "/(auth)/login";
    }
    return Promise.reject(error);
  }
);

export default api; 