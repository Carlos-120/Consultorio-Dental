// /frontend/src/services/citaServices.js
import axios from "axios";

// La URL base de tu API backend
const API_URL = "http://localhost:3000/api/citas"; // Cambia la URL si es diferente

// Función para registrar una cita
export const registrarCita = async (data) => {
  try {
    // Realiza la solicitud POST para registrar la cita
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data; // Retorna la respuesta del backend (cita registrada)
  } catch (error) {
    // Manejo de errores
    console.error("Error al registrar la cita:", error);
    throw error; // Lanza el error para que pueda ser manejado en el frontend
  }
};

// Puedes agregar más funciones si necesitas interactuar con otras rutas de la API relacionadas con las citas.
