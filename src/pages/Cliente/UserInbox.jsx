import React from 'react';
import Inbox from '../All/Inbox';

export default function UserInbox() {
  const clienteId = '683c87da5df0c60790d6ebda';
  const proveedorId = '683c87ed5df0c60790d6ebdd';

  return (
    <Inbox
      miId={clienteId}
      otroId={proveedorId}
      usuario="cliente"
    />
  );
}
