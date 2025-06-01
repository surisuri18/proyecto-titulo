import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import '../../styles/PageStyles/Inbox.css';
import defaultAvatar from '../../assets/imagenPerfil.jpeg'; // asegúrate de tener esta imagen

const socket = io('http://localhost:4000');

export default function Inbox({ miId, otroId, usuario = 'cliente' }) {
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [contacto, setContacto] = useState({ nombre: '', imagenUrl: '' });

  // Obtener datos del contacto
  useEffect(() => {
    fetch(`http://localhost:4000/api/users/${otroId}`)
      .then(res => res.json())
      .then(data => setContacto({ nombre: data.nombre, imagenUrl: data.imagenUrl }))
      .catch(() => setContacto({ nombre: 'Usuario', imagenUrl: '' }));
  }, [otroId]);

  // Cargar historial
  useEffect(() => {
    fetch(`http://localhost:4000/api/chat/historial?usuario1=${miId}&usuario2=${otroId}`)
      .then(res => res.json())
      .then(data => setMensajes(data));
  }, [miId, otroId]);

  // Escuchar mensajes entrantes
  useEffect(() => {
    const recibir = (mensaje) => {
      if (
        (mensaje.emisor === otroId && mensaje.receptor === miId) ||
        (mensaje.emisor === miId && mensaje.receptor === otroId)
      ) {
        setMensajes((prev) => [...prev, mensaje]);
      }
    };

    socket.on('recibir-mensaje', recibir);
    return () => socket.off('recibir-mensaje', recibir);
  }, [miId, otroId]);

  const handleEnviar = async () => {
    if (!nuevoMensaje.trim()) return;

    const mensaje = {
      emisor: miId,
      receptor: otroId,
      contenido: nuevoMensaje,
      enviadoEn: new Date().toISOString()
    };

    socket.emit('enviar-mensaje', mensaje);

    await fetch('http://localhost:4000/api/chat/enviar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mensaje)
    });

    setMensajes((prev) => [...prev, mensaje]);
    setNuevoMensaje('');
  };

  return (
    <div className="chat-wrapper">
      {/* Cabecera con avatar y nombre */}
      <div className="chat-header">
        <img src={contacto.imagenUrl || defaultAvatar} alt="Avatar" className="chat-avatar" />
        <span className="chat-nombre">{contacto.nombre}</span>
      </div>

      {/* Mensajes */}
      <div className="chat-body">
        {mensajes.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-burbuja ${msg.emisor === miId ? 'chat-yo' : 'chat-otro'}`}
          >
            {msg.contenido}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="chat-input-bar">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
        />
        <button onClick={handleEnviar}>Enviar</button>
      </div>
    </div>
  );
}
