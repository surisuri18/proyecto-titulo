import React, { useState } from 'react';
import '../../styles/ProviderInbox.css';

const mockConversations = [
  {
    id: 1,
    cliente: 'Juan Pérez',
    mensaje: 'Hola, quisiera agendar una hora.',
    hora: '10:30',
    mensajes: [
      { de: 'cliente', texto: 'Hola, quisiera agendar una hora.', hora: '10:30' },
      { de: 'proveedor', texto: 'Hola Juan, claro que sí. ¿Qué día prefieres?', hora: '10:32' }
    ]
  },
  {
    id: 2,
    cliente: 'Camila Soto',
    mensaje: 'Gracias por el servicio de ayer 💅',
    hora: '09:15',
    mensajes: [
      { de: 'cliente', texto: 'Gracias por el servicio de ayer 💅', hora: '09:15' },
      { de: 'proveedor', texto: 'Un gusto atenderte, Camila 😊', hora: '09:16' }
    ]
  }
];

function ProviderInbox() {
  const [conversacionActiva, setConversacionActiva] = useState(mockConversations[0]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');

  const handleEnviar = () => {
    if (!nuevoMensaje.trim()) return;
    const actualizado = {
      ...conversacionActiva,
      mensajes: [...conversacionActiva.mensajes, { de: 'proveedor', texto: nuevoMensaje, hora: 'Ahora' }]
    };
    setConversacionActiva(actualizado);
    setNuevoMensaje('');
  };

  return (
    <div className="inbox-container">
      <div className="lista-conversaciones">
        {mockConversations.map((conv) => (
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

export default ProviderInbox;