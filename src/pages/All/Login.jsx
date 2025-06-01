import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TituloCrearInicio from '../../components/TituloCrearInicio';
import { LabeledInput } from '../../components/formularios/LabelGenerico';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = ({ onLogin }) => {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!correo.trim() || !clave.trim()) {
      setError('Por favor ingresa correo y clave para continuar.');
      return;
    }
    setError('');
    onLogin?.({ correo, clave });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-end">
        <div className="col-12 col-md-7">
          <TituloCrearInicio 
            texto="Iniciar sesión" 
            height="140px" 
            fontSize="clamp(1.5rem, 5vw, 2.5rem)" 
          />

          <p className="text-center mt-2 text-muted">
            ¿Ya tienes cuenta? Accede
          </p>

          {error && (
            <div className="alert alert-danger text-center">
              {error}
            </div>
          )}

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
