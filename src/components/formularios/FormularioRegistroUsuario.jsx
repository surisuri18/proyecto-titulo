import { LabeledInput } from "./LabelGenerico";
import { useState } from "react";

const UserForm = ({ onSubmit }) => {
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
    if (onSubmit) onSubmit({ nombre, correo, clave });
  };

  return (
    <form onSubmit={handleSubmit}>
      <LabeledInput
        label="Nombre"
        name="nombre"
        type="text"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        placeholder="Jimena Martínez"
      />

      <LabeledInput
        label="Correo electrónico"
        name="correo"
        type="email"
        value={correo}
        onChange={e => setCorreo(e.target.value)}
        placeholder="hola@sitiincreible.com"
      />

      <LabeledInput
        label="Clave"
        name="clave"
        type="password"
        value={clave}
        onChange={e => setClave(e.target.value)}
        placeholder="••••••"
      />

      <LabeledInput
        label="Confirmar Clave"
        name="confirmClave"
        type="password"
        value={confirmClave}
        onChange={e => setConfirmClave(e.target.value)}
        placeholder="••••••"
      />

      {error && <div className="text-danger small mb-3">{error}</div>}

      <button type="submit" className="btn btn-primary">
        Enviar
      </button>
    </form>
  );
};

export default UserForm;