import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

// Interceptor para agregar el token en cada solicitud
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Obtiene el token del localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Agrega el token al header
  }
  return config;
});

// Registrar usuario
export const register = async (data) => {
  return axios.post(`${API_URL}/register`, data);
};

// Login usuario
export const login = async (data) => {
  return axios.post(`${API_URL}/login`, data);
};
