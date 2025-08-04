// src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

// Registrar usuario
export const register = async (data) => {
  // data: { correo, password, rol }
  return axios.post(`${API_URL}/register`, data);
};

// Login usuario
export const login = async (data) => {
  // data: { correo, password }
  return axios.post(`${API_URL}/login`, data);
};
