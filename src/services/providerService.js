import axios from 'axios';

const API_URL = 'http://localhost:4000/api/providers';

export const updateAvailability = async (token, disponibilidad) => {
  const res = await axios.put(
    `${API_URL}/disponibilidad`,
    { disponibilidad },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};