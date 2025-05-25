import React, { useState } from 'react';
import { LabeledInput } from './LabelGenerico';
import TituloCrearInicio from '../TituloCrearInicio';
import 'bootstrap/dist/css/bootstrap.min.css';

const FormularioRegistroUsuario = ({ onSubmit }) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [confirmClave, setConfirmClave] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (clave !== confirmClave) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    setError('');
    onSubmit?.({ nombre, correo, clave });
  };

  return (
    <div className="container py-5">
      {/* Título decorativo */}
      <TituloCrearInicio texto="Crear una cuenta nueva" height="140px" fontSize="2.5rem" />
      <p className="text-center mt-3">Crea tu cuenta para contratar servicios</p>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '450px' }}>
        <div className="mb-3">
          <LabeledInput
            label="Nombre"
            name="nombre"
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            placeholder="Jimena Martínez"
          />
        </div>
        <div className="mb-3">
          <LabeledInput
            label="Correo electrónico"
            name="correo"
            type="email"
            value={correo}
            onChange={e => setCorreo(e.target.value)}
            placeholder="hola@sitioincreible.com"
          />
        </div>
        <div className="mb-3">
          <LabeledInput
            label="Clave"
            name="clave"
            type="password"
            value={clave}
            onChange={e => setClave(e.target.value)}
            placeholder="••••••"
          />
        </div>
        <div className="mb-3">
          <LabeledInput
            label="Confirmar Clave"
            name="confirmClave"
            type="password"
            value={confirmClave}
            onChange={e => setConfirmClave(e.target.value)}
            placeholder="••••••"
          />
        </div>

        {error && <div className="text-danger small mb-3">{error}</div>}

        <div className="d-grid mb-4">
          <button type="submit" className="btn btn-dark btn-lg">
            Registrarse
          </button>
        </div>

        <div className="text-center">
          <a href="#" className="text-decoration-underline">
            O regístrate con tu cuenta de Google
          </a>
          <div className="mt-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google"
              width={32}
              height={32}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormularioRegistroUsuario;
