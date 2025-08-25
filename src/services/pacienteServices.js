import axios from "axios";
import API from "./api";

const API_URL = "http://localhost:3000/api/pacientes";

export const registrarPaciente = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data; // Devuelve la respuesta del backend
  } catch (error) {
    // Manejo de errores de la solicitud
    if (error.response) {
      // Si la respuesta de error es del servidor (status no 2xx)
      throw new Error(
        error.response.data.mensaje || "Error al registrar el paciente"
      );
    } else if (error.request) {
      // Si la solicitud se realizó pero no hubo respuesta
      throw new Error("No se recibió respuesta del servidor");
    } else {
      // Otros errores
      throw new Error(error.message);
    }
  }
};
export const fetchResumenPaciente = async (cedula) => {
  const res = await API.get(`/pacientes/resumen/${cedula}`);
  return res.data;
};
