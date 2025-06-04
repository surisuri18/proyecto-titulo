// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/auth';

export const registerUser = async (userData) => {
  try {
    const res = await axios.post(`${API_URL}/register`, userData);
    return res.data;
  } catch (error) {
    // Re-lanzar el objeto de error que venga del servidor
    throw error.response?.data || { error: 'Error en la solicitud' };
  }
};

export const loginUser = async (userData) => {
  try {
    const res = await axios.post(`${API_URL}/login`, userData);
    return res.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error en la solicitud' };
  }
};
