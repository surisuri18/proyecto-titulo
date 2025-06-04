// src/components/ChatRoom.jsx
import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

export default function ChatRoom({ miUsuario, otroUsuario }) {
  const [mensajes, setMensajes] = useState([]);
  const [texto, setTexto] = useState('');
  const socketRef = useRef(null);

  // 1) Conectar Socket.IO
  useEffect(() => {
    if (!miUsuario || !otroUsuario) return;

    socketRef.current = io('http://localhost:4000', {
      query: {
        userId: miUsuario._id,
        userModel: miUsuario.userModel
      }
    });

    socketRef.current.on('recibir-mensaje', (mensaje) => {
      const esDeEstaConversacion =
        (mensaje.emisor === miUsuario._id &&
          mensaje.emisorModel === miUsuario.userModel &&
          mensaje.receptor === otroUsuario._id &&
          mensaje.receptorModel === otroUsuario.userModel) ||
        (mensaje.emisor === otroUsuario._id &&
          mensaje.emisorModel === otroUsuario.userModel &&
          mensaje.receptor === miUsuario._id &&
          mensaje.receptorModel === miUsuario.userModel);

      if (esDeEstaConversacion) {
        setMensajes((prev) => [...prev, mensaje]);
      }
    });

    socketRef.current.on('mensaje-guardado', (msgGuardado) => {
      console.log('Mensaje guardado en BD:', msgGuardado);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [miUsuario, otroUsuario]);

  // 2) Cargar historial REST (ahora usa baseURL)
  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const url = `/api/chat/conversacion/${miUsuario._id}/${miUsuario.userModel}/${otroUsuario._id}/${otroUsuario.userModel}`;
        const res = await axios.get(url);
        setMensajes(res.data);
      } catch (err) {
        console.error('Error cargando historial:', err);
      }
    };

    if (otroUsuario && otroUsuario._id) {
      fetchHistorial();
    }
  }, [miUsuario, otroUsuario]);

  // 3) Enviar mensaje
  const enviarMensaje = () => {
    if (!texto.trim() || !socketRef.current) return;

    const payload = {
      emisorId: miUsuario._id,
      emisorModel: miUsuario.userModel,
      receptorId: otroUsuario._id,
      receptorModel: otroUsuario.userModel,
      contenido: texto
    };

    socketRef.current.emit('enviar-mensaje', payload);

    setMensajes((prev) => [
      ...prev,
      {
        _id: 'pendiente_' + Date.now(),
        emisor: miUsuario._id,
        emisorModel: miUsuario.userModel,
        receptor: otroUsuario._id,
        receptorModel: otroUsuario.userModel,
        contenido: texto,
        enviadoEn: new Date().toISOString()
      }
    ]);

    setTexto('');
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: 10, marginTop: 20 }}>
      <h4>
        {miUsuario.nombre} ({miUsuario.userModel}) ↔ {otroUsuario.nombre} (
        {otroUsuario.userModel})
      </h4>
      <div
        style={{
          border: '1px solid #eee',
          height: 300,
          overflowY: 'auto',
          padding: 8,
          marginBottom: 10
        }}
      >
        {mensajes.map((m, idx) => {
          const soyYo =
            m.emisor === miUsuario._id &&
            m.emisorModel === miUsuario.userModel;
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: soyYo ? 'flex-end' : 'flex-start',
                margin: '6px 0'
              }}
            >
              <div
                style={{
                  backgroundColor: soyYo ? '#daf8cb' : '#f1f1f1',
                  padding: '8px 12px',
                  borderRadius: 8,
                  maxWidth: '80%'
                }}
              >
                <div>{m.contenido}</div>
                <small style={{ fontSize: '0.7rem', color: '#555' }}>
                  {new Date(m.enviadoEn).toLocaleTimeString()}
                </small>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') enviarMensaje();
          }}
          style={{ flex: 1, padding: '6px 8px' }}
          placeholder="Escribe tu mensaje..."
        />
        <button onClick={enviarMensaje} style={{ padding: '6px 14px' }}>
          Enviar
        </button>
      </div>
    </div>
  );
}
