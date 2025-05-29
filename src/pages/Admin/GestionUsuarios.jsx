import React, { useState } from 'react';
import '../../styles/PageStyles/GestionUsuarios.css';

function GestionUsuarios() {
  const [busqueda, setBusqueda] = useState('');
  
  const usuarios = [
    { id: 1, nombre: 'Ana Torres', correo: 'ana@mail.com', tipo: 'Cliente' },
    { id: 2, nombre: 'Luis Bravo', correo: 'luis@gasfiter.cl', tipo: 'Proveedor' },
    { id: 3, nombre: 'Camila Rojas', correo: 'camila@mail.com', tipo: 'Cliente' }
  ];

  const usuariosFiltrados = usuarios.filter(u =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.correo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="gestion-container">
      <h2>Gestión de Usuarios</h2>

      <div className="acciones">
        <input
          type="text"
          placeholder="Buscar por nombre o correo"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button className="btn-crear">➕ Crear nuevo usuario</button>
      </div>

      <table className="tabla-usuarios">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map((user) => (
            <tr key={user.id}>
              <td>{user.nombre}</td>
              <td>{user.correo}</td>
              <td>{user.tipo}</td>
              <td>
                <button className="btn-editar">✏️ Editar</button>
                <button className="btn-eliminar">🗑️ Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GestionUsuarios;
