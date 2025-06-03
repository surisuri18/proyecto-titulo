import React, { useState } from 'react';
import '../../styles/PageStyles/UserProfile.css';
import usuarioDefault from '../../assets/IconosUsuario/Hombre1.png';

export default function UserEditProfile({ usuario }) {
  const datosIniciales = usuario || {
    nombre: 'Jimena Martínez',
    correo: 'jimena@ejemplo.com',
    foto: usuarioDefault
  };

  const [formData, setFormData] = useState({
    nombre: datosIniciales.nombre,
    correo: datosIniciales.correo,
    foto: datosIniciales.foto
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos actualizados:', formData);
    alert('Perfil actualizado correctamente');
  };

  return (
    <div className="container perfil-usuario d-flex align-items-center justify-content-center py-5">
      <div className="card perfil-card shadow w-100" style={{ maxWidth: '550px' }}>
        <div className="card-body text-center">
          <img
            src={formData.foto}
            alt="Foto de perfil"
            className="foto-perfil rounded-circle mb-3 shadow-sm"
          />

          <form onSubmit={handleSubmit} className="text-start px-3 px-md-4">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                name="nombre"
                className="form-control"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input
                type="email"
                name="correo"
                className="form-control"
                value={formData.correo}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">URL de foto de perfil</label>
              <input
                type="text"
                name="foto"
                className="form-control text-break"
                value={formData.foto}
                onChange={handleChange}
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-dark btn-lg w-100 mt-3">
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
