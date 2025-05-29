import React from 'react';
import FormBase from '../../components/formularios/FormBase';
import TituloCrearInicio from '../../components/TituloCrearInicio';
import RegistroExitosoModal from '../../components/Popups/PopupRegistroExitoso';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/PageStyles/RegisterUser.css';

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
  }
];

export default function RegistroUsuario({ onSubmit }) {
  const [showModal, setShowModal] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const handleSubmit = (data) => {
    setEmail(data.correo);
    onSubmit?.(data);
    setShowModal(true);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
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

      <RegistroExitosoModal
        show={showModal}
        correo={email}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
