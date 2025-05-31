import axios from 'axios';

// URL base de tu backend (ajusta según tu configuración)
const API_URL = 'http://localhost:4000/api/auth';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;  // Devuelve mensaje o token
  } catch (error) {
    // Puedes procesar el error aquí para mostrar mensajes al usuario
    throw error.response?.data || { error: 'Error en la solicitud' };
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error en la solicitud' };
  }
};
