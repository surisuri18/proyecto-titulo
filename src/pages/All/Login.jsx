import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TituloCrearInicio from '../../components/TituloCrearInicio';
import { LabeledInput } from '../../components/formularios/LabelGenerico';
import logo from '../../assets/logo.png'; // Asegúrate de que este path sea correcto
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Componente de login que gestiona la entrada del usuario.
 * Recibe `onLogin` que es la función que maneja el login en el backend
 * y `error` que es el mensaje de error que puede ser enviado desde el backend.
 */
const LoginPage = ({ onLogin, error }) => {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!correo.trim() || !clave.trim()) {
      setLocalError('Por favor ingresa correo y clave para continuar.');
      return;
    }
    setLocalError('');
    onLogin?.({ correo, clave });
  };

  return (
    <div className="container py-5">
      {(localError || error) && (
        <div className="alert alert-danger text-center">
          {localError || error}
        </div>
      )}

      <div className="row align-items-center">
        {/* Imagen lateral */}
        <div className="col-md-5 d-flex justify-content-center mb-4 mb-md-0">
          <img
            src={logo}
            alt="Logo"
            className="img-fluid"
            style={{ maxWidth: '300px' }}
          />
        </div>

        {/* Formulario de login */}
        <div className="col-md-7">
          <TituloCrearInicio
            texto="Iniciar sesión"
            height="140px"
            fontSize="clamp(1.5rem, 5vw, 2.5rem)"
          />

          <p className="text-center mt-2 text-muted">
            ¿Ya tienes cuenta? Accede
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-3"
            style={{ maxWidth: '450px' }}
            noValidate
          >
            <div className="mb-3">
              <LabeledInput
                label="Correo electrónico"
                name="correo"
                type="email"
                value={correo}
                onChange={e => setCorreo(e.target.value)}
                placeholder="hola@sitioincreible.com"
                required
              />
            </div>
            <div className="mb-3">
              <LabeledInput
                label="Clave"
                name="clave"
                type="password"
                value={clave}
                onChange={e => setClave(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <div className="d-grid mb-4">
              <button type="submit" className="btn btn-dark btn-lg">
                Iniciar sesión
              </button>
            </div>
          </form>

          <p className="text-center">
            O regístrate <Link to="/registeruser">aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
