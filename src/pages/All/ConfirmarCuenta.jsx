import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ConfirmarCuenta() {
  const { token } = useParams();
  const [mensaje, setMensaje] = useState('Confirmando cuenta...');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/auth/confirm/${token}`)
      .then(res => setMensaje(res.data.message))
      .catch(err => {
        setError(err.response?.data?.error || 'Error desconocido');
        setMensaje(null);
      });
  }, [token]);

  return (
    <div className="container py-5">
      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}
