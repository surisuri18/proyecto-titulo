import React from 'react';
import Inbox from '../All/Inbox';

export default function ProviderInbox() {
  const proveedorId = '683c87ed5df0c60790d6ebdd';   // ID del proveedor (Pedro)
  const clienteId = '683c87da5df0c60790d6ebda';     // ID del cliente (Camila)

  return (
    <Inbox
      miId={proveedorId}
      otroId={clienteId}
      usuario="proveedor"
    />
  );
}
