// src/pages/All/Inbox.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import ChatRoom from '../../components/ChatRoom';
import axios from 'axios';

export default function Inbox() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);

  // 1) Si venimos de “Iniciar chat” con un proveedor
  useEffect(() => {
    if (location.state && location.state.contacto) {
      const { contactoId, contactoModel, nombre } = location.state.contacto;
      setSelected({ _id: contactoId, userModel: contactoModel, nombre });
    }
  }, [location.state]);

  // 2) Cargar “últimos mensajes”
  useEffect(() => {
    const fetchContacts = async () => {
      if (!user || !user._id || !user.userModel) return;
      try {
        const res = await axios.get(`/api/chat/ultimos/${user._id}/${user.userModel}`);
        // res.data => [{ contactoId, contactoModel, ultimoMensaje, fecha, mensajeId }, ...]
        const resultados = await Promise.all(
          res.data.map(async (c) => {
            let nombre = c.contactoId;
            if (c.contactoModel === 'Provider') {
              try {
                const respProv = await axios.get(`/api/providers/${c.contactoId}`);
                nombre = respProv.data.nombre;
              } catch {
                nombre = c.contactoId;
              }
            } else if (c.contactoModel === 'User') {
              try {
                const respUser = await axios.get(`/api/users/${c.contactoId}`);
                nombre = respUser.data.nombre;
              } catch {
                nombre = c.contactoId;
              }
            }
            return {
              contactoId: c.contactoId,
              contactoModel: c.contactoModel,
              nombre,
              ultimoMensaje: c.ultimoMensaje,
              fecha: c.fecha
            };
          })
        );
        setContacts(resultados);
      } catch (err) {
        console.error('Error cargando contactos:', err);
      }
    };
    fetchContacts();
  }, [user]);

  if (!user) {
    return <div>Debes iniciar sesión para ver tus mensajes.</div>;
  }

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 10 }}>
      <h2>Mis Chats</h2>
      <div style={{ border: '1px solid #ccc', padding: 10 }}>
        {contacts.length === 0 && !selected && (
          <p>No tienes conversaciones aún.</p>
        )}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {contacts.map((c) => (
            <li key={c.contactoId}>
              <button
                onClick={() =>
                  setSelected({
                    _id: c.contactoId,
                    userModel: c.contactoModel,
                    nombre: c.nombre
                  })
                }
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 12px',
                  border: 'none',
                  background: '#f9f9f9',
                  marginBottom: 5,
                  cursor: 'pointer'
                }}
              >
                {c.nombre} ({c.contactoModel})
                <br />
                <small style={{ fontSize: '0.8rem', color: '#666' }}>
                  {c.ultimoMensaje} •{' '}
                  {new Date(c.fecha).toLocaleDateString()}{' '}
                  {new Date(c.fecha).toLocaleTimeString()}
                </small>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selected && <ChatRoom miUsuario={user} otroUsuario={selected} />}
    </div>
  );
}
