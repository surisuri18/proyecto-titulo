import React, { useState } from 'react';
import '../../styles/PageStyles/Inbox.css';

export default function Inbox({ conversaciones, usuario = 'proveedor' }) {
  const [conversacionActiva, setConversacionActiva] = useState(conversaciones[0]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');

  const handleEnviar = () => {
    if (!nuevoMensaje.trim()) return;
    const actualizado = {
      ...conversacionActiva,
      mensajes: [...conversacionActiva.mensajes, { de: usuario, texto: nuevoMensaje, hora: 'Ahora' }]
    };
    setConversacionActiva(actualizado);
    setNuevoMensaje('');
  };

  return (
    <div className="inbox-container">
      <div className="lista-conversaciones">
        {conversaciones.map((conv) => (
          <div
            key={conv.id}
            className={`conversacion-preview ${conversacionActiva.id === conv.id ? 'activa' : ''}`}
            onClick={() => setConversacionActiva(conv)}
          >
            <div className="nombre-cliente">{conv.cliente}</div>
            <div className="mensaje-preview">{conv.mensaje}</div>
            <div className="hora-preview">{conv.hora}</div>
          </div>
        ))}
      </div>

      <div className="zona-chat">
        <div className="chat-header">{conversacionActiva.cliente}</div>

        <div className="chat-mensajes">
          {conversacionActiva.mensajes.map((msg, idx) => (
            <div key={idx} className={`mensaje ${msg.de}`}>{msg.texto}</div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            value={nuevoMensaje}
            onChange={(e) => setNuevoMensaje(e.target.value)}
          />
          <button onClick={handleEnviar}>Enviar</button>
        </div>
      </div>
    </div>
  );
}
