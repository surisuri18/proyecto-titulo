import React from 'react';
import Inbox from '../All/Inbox';

export default function UserInbox() {
  const clienteId = '683b91ff63cbc45c099b199c';
  const proveedorId = '683b9d92a80e2fede82a3576';

  return (
    <Inbox
      miId={clienteId}
      otroId={proveedorId}
      usuario="cliente"
    />
  );
}
