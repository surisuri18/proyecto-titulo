import React from 'react';
import Inbox from '../All/Inbox';

const mockConversations = [
  {
    id: 1,
    cliente: 'Yo',
    mensaje: 'Hola, ¿estás disponible esta semana?',
    hora: '11:00',
    mensajes: [
      { de: 'cliente', texto: 'Hola, ¿estás disponible esta semana?', hora: '11:00' },
      { de: 'proveedor', texto: '¡Hola! Sí, tengo disponibilidad jueves o viernes.', hora: '11:01' }
    ]
  },
  {
    id: 2,
    cliente: 'Yo',
    mensaje: 'Gracias por el corte 👌',
    hora: '08:45',
    mensajes: [
      { de: 'cliente', texto: 'Gracias por el corte 👌', hora: '08:45' },
      { de: 'proveedor', texto: '¡Un gusto como siempre! 💇‍♂️', hora: '08:46' }
    ]
  }
];

export default function UserInbox() {
  return <Inbox conversaciones={mockConversations} usuario="cliente" />;
}
