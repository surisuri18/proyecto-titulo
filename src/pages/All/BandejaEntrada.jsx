// src/pages/All/BandejaEntrada.jsx
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import imagenPerfil from '../../assets/imagenPerfil.jpeg';
import '../../styles/PageStyles/BandejaEntrada.css';

export default function BandejaEntrada() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [conversaciones, setConversaciones] = useState([]);

  useEffect(() => {
    if (!user || !user._id || !user.userModel) return;

    const fetchConversaciones = async () => {
      try {
        // Solicita a /api/chat/ultimos usando baseURL configurado arriba
        const res = await axios.get(`/api/chat/ultimos/${user._id}/${user.userModel}`);
        console.log('RES ULTIMOS MENSAJES:', res.data);

        // Cada elemento: { contactoId, contactoModel, ultimoMensaje, fecha, mensajeId }
        const resultados = await Promise.all(
          res.data.map(async (conv) => {
            const { contactoId, contactoModel, ultimoMensaje, fecha } = conv;
            let urlPerfil = '';

            if (contactoModel === 'User') {
              urlPerfil = `/api/users/${contactoId}`;
            } else if (contactoModel === 'Provider') {
              urlPerfil = `/api/providers/${contactoId}`;
            }

            let nombre = 'Sin nombre';
            let imagen = imagenPerfil;

            try {
              const datosUsuario = await axios.get(urlPerfil);
              nombre = datosUsuario.data.nombre || 'Sin nombre';
              imagen = datosUsuario.data.imagenUrl || imagenPerfil;
            } catch (err) {
              console.warn(
                `No se pudo obtener perfil de ${contactoModel} ${contactoId}`,
                err
              );
            }

            return {
              contactoId,
              contactoModel,
              nombre,
              imagen,
              ultimoMensaje,
              fecha
            };
          })
        );

        setConversaciones(resultados);
      } catch (error) {
        console.error('Error al obtener conversaciones:', error);
      }
    };

    fetchConversaciones();
  }, [user]);

  const irAChat = (contacto) => {
    // contacto = { contactoId, contactoModel, nombre, imagen, ultimoMensaje, fecha }
    navigate('/inbox', { state: { contacto } });
  };

  if (!user) {
    return <div>Debes iniciar sesión para ver tu bandeja de entrada.</div>;
  }

  return (
    <div className="bandeja-container">
      <h2 className="titulo-bandeja">Bandeja de entrada</h2>
      {conversaciones.length === 0 && (
        <p className="sin-conversaciones">No tienes conversaciones aún.</p>
      )}
      {conversaciones.map((conv) => (
        <div
          className="bandeja-item"
          key={conv.contactoId}
          onClick={() => irAChat(conv)}
        >
          <img
            src={conv.imagen}
            alt="perfil"
            className="bandeja-avatar"
          />
          <div className="bandeja-info">
            <div className="bandeja-nombre">{conv.nombre}</div>
            <div className="bandeja-mensaje">{conv.ultimoMensaje}</div>
            <div className="bandeja-fecha">
              {new Date(conv.fecha).toLocaleDateString()}{' '}
              {new Date(conv.fecha).toLocaleTimeString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
