// src/pages/RegistroUsuario.jsx
import React from 'react';
import FormBase from '../../components/formularios/FormBase';
import TituloCrearInicio from '../../components/TituloCrearInicio';
import RegistroExitosoModal from '../../components/Popups/PopupRegistroExitoso';
import logo from '../../assets/logo.png';         // Asegúrate de apuntar a la ruta correcta
import 'bootstrap/dist/css/bootstrap.min.css';

import { registerUser } from '../../services/authService'; 

const fieldsUsuario = [
  {
    name: 'nombre',
    label: 'Nombre',
    type: 'text',
    placeholder: 'Jimena Martínez',
    rules: { required: 'Obligatorio' }
  },
  {
    name: 'correo',
    label: 'Correo',
    type: 'email',
    placeholder: 'hola@ejemplo.com',
    rules: { required: 'Obligatorio' }
  },
  {
    name: 'clave',
    label: 'Clave',
    type: 'password',
    placeholder: '••••••••',
    rules: {
      required: 'Obligatorio',
      minLength: { value: 8, message: 'Mínimo 8 caracteres' }
    }
  },
  {
    name: 'confirmClave',
    label: 'Repetir clave',
    type: 'password',
    placeholder: '••••••••',
    rules: { required: 'Obligatorio' }
    // la validación de coincidencia se inyecta en FormBase
  }
];

export default function RegistroUsuario({ onSubmit }) {
  const [showModal, setShowModal] = React.useState(false);
  const [email,     setEmail]     = React.useState('');
  const [error, setError] = React.useState(null);

    const handleSubmit = async (data) => {
    setError(null);
    try {
      // Envía datos al backend (ojo, "clave" debe coincidir con el campo backend)
      await registerUser({
        nombre: data.nombre,
        correo: data.correo,
        clave: data.clave,
      });
      setEmail(data.correo);
      setShowModal(true);
    } catch (err) {
      setError(err.error || 'Error inesperado');
    }
  };

  return (
    <div className="container py-5">
      <div className="row align-items-center gx-5">
        {/* Logo a la izquierda */}
        <div className="col-md-5 d-flex justify-content-center mb-4 mb-md-0">
          <img
            src={logo}
            alt="Logo"
            className="img-fluid"
            style={{ maxWidth: '300px' }}
          />
        </div>

        {/* Formulario a la derecha */}
        <div className="col-md-7">
          <TituloCrearInicio
            texto="Registro de Usuario"
            height="140px"
            fontSize="2.5rem"
          />

          <FormBase
            fields={fieldsUsuario}
            onSubmit={handleSubmit}
            submitLabel="Registrarse"
          />
        </div>
      </div>

      {/* Modal de éxito */}
      <RegistroExitosoModal
        show={showModal}
        correo={email}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
