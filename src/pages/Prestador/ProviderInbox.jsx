import React from 'react';
import Inbox from '../All/Inbox';

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

export default function ProviderInbox() {
  return <Inbox conversaciones={mockConversations} usuario="proveedor" />;
}
