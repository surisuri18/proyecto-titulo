// src/pages/Prestador/ProviderProfile.jsx
import React, { useContext, useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Valoracion from '../../components/PrestadorServicio/Valoracion';
import Horario from '../../components/Horario';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import '../../styles/PageStyles/ProviderProfile.css';
import fotoPerfil from '../../assets/imagenPerfil.jpeg';
//este componente es el detalle del perfil de un proveedor al apretar su preview

export default function ProviderProfile() {
  const { user, token } = useContext(AuthContext);
  const { id: providerId } = useParams();
  const navigate = useNavigate();

  const [proveedor, setProveedor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProveedor = async () => {
      try {
        const config = {};
        if (token) {
          config.headers = { Authorization: `Bearer ${token}` };
        }

        const res = await axios.get(
          `http://localhost:4000/api/providers/${providerId}`,
          config
        );
        setProveedor(res.data);
      } catch (err) {
        console.error('Error al obtener proveedor:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProveedor();
  }, [providerId, token]);

  if (loading) {
    return <div>Cargando perfil de proveedor...</div>;
  }

  if (!proveedor) {
    return <div>No se encontró el proveedor.</div>;
  }

  const handleIniciarChat = () => {
    if (!user || user.userModel !== 'User') {
      alert('Debes iniciar sesión como usuario para chatear con un proveedor.');
      return;
    }
    // Preparo el objeto “contacto” que Inbox leerá
    const contacto = {
      contactoId: proveedor._id,
      contactoModel: 'Provider',
      nombre: proveedor.nombre
    };
    navigate('/inbox', { state: { contacto } });
  };

  return (
    <div className="container perfil-container">
      <div className="perfil-top">
        {/* Columna Izquierda */}
        <div className="perfil-columna izquierda">
          <div className="perfil-foto">
            <img
              src={proveedor.imagenUrl || fotoPerfil}
              alt={`Foto de ${proveedor.nombre}`}
            />
          </div>

          <Valoracion valor={proveedor.calificacion || 0} />

          <div className="perfil-ubicacion">
            <FaMapMarkerAlt className="ubicacion-icono" />
            <span>{proveedor.ciudad}</span>
          </div>

          <button className="btn-chat" onClick={handleIniciarChat}>
            Iniciar chat
          </button>
        </div>

        {/* Columna Central */}
        <div className="perfil-columna centro">
          <h2 className="perfil-nombre">{proveedor.nombre}</h2>
          <p className="perfil-oficio">
            {Array.isArray(proveedor.servicios)
              ? proveedor.servicios.join(', ')
              : '—'}
          </p>
          <p className="perfil-descripcion">{proveedor.descripcion}</p>
        </div>

        {/* Columna Derecha: Galería */}
        <div className="perfil-columna derecha perfil-galeria">
          {Array.isArray(proveedor.galeria) &&
            proveedor.galeria.map((imgSrc, idx) => (
              <div className="galeria-imagen" key={idx}>
                <img src={imgSrc} alt={`Galería ${idx + 1}`} />
              </div>
            ))}
        </div>
      </div>

      {/* Horario semanal */}
      <Horario disponibilidad={proveedor.disponibilidad || {}} />
    </div>
  );
}
