import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/PageStyles/BandejaEntrada.css'; // Estilos sugeridos
import { useNavigate } from 'react-router-dom';
import imagenPerfil from '../../assets/imagenPerfil.jpeg'; // Imagen por defecto

export default function BandejaEntrada({ miId, usuario }) {
  const [conversaciones, setConversaciones] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversaciones = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/chat/ultimos/${miId}`);
        const resultados = await Promise.all(
          res.data.map(async (conv) => {
            const otroId = conv._id;

            const datosUsuario = await axios.get(`http://localhost:4000/api/users/${otroId}`);

            return {
              id: otroId,
              nombre: datosUsuario.data.nombre,
              imagen: datosUsuario.data.imagenUrl || imagenPerfil,
              ultimoMensaje: conv.ultimoMensaje,
            };
          })
        );

        setConversaciones(resultados);
      } catch (error) {
        console.error('Error al obtener conversaciones:', error);
      }
    };

    fetchConversaciones();
  }, [miId]);

  const irAChat = (otroId) => {
    const ruta = usuario === 'cliente' ? '/cliente/inbox' : '/proveedor/inbox';
    navigate(ruta, { state: { miId, otroId } });
  };

  return (
    <div className="bandeja-container">
      <h2 className="titulo-bandeja">Bandeja de entrada</h2>
      {conversaciones.map((conv) => (
        <div className="bandeja-item" key={conv.id} onClick={() => irAChat(conv.id)}>
          <img src={conv.imagen} alt="perfil" className="bandeja-avatar" />
          <div className="bandeja-info">
            <div className="bandeja-nombre">{conv.nombre}</div>
            <div className="bandeja-mensaje">{conv.ultimoMensaje}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
