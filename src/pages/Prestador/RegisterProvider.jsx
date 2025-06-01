import React from 'react';
import FormBase from '../../components/formularios/FormBase';
import TituloCrearInicio from '../../components/TituloCrearInicio';
import RegistroExitosoModal from '../../components/Popups/PopupRegistroExitoso';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { registerUser } from '../../services/authService';

const serviciosOpciones = [
  { value: 'plomeria',     label: 'Plomería'     },
  { value: 'electricidad', label: 'Electricidad' },
  { value: 'limpieza',     label: 'Limpieza'     },
  { value: 'jardineria',   label: 'Jardinería'   },
  { value: 'otros',        label: 'Otros'        },
];

const fieldsProveedor = [
  {
    name: 'nombre',
    label: 'Nombre o Empresa',
    type: 'text',
    placeholder: 'Nombre o Razón Social',
    rules: { required: 'El nombre es obligatorio' }
  },
  {
    name: 'correo',
    label: 'Correo electrónico',
    type: 'email',
    placeholder: 'contacto@empresa.com',
    rules: { required: 'El correo es obligatorio' }
  },
  {
    name: 'clave',
    label: 'Clave',
    type: 'password',
    placeholder: '••••••••',
    rules: {
      required: 'La clave es obligatoria',
      minLength: { value: 8, message: 'Mínimo 8 caracteres' }
    }
  },
  {
    name: 'confirmClave',
    label: 'Repetir clave',
    type: 'password',
    placeholder: '••••••••',
    rules: { required: 'Debes repetir la clave' }
  },
  {
    name: 'servicios',
    type: 'select',
    creatable: true,
    options: serviciosOpciones,
    isMulti: true,
    placeholder: '¿Qué servicios ofreces?',
    rules: {
      validate: val =>
        (val && val.length > 0) ||
        'Debes seleccionar al menos un servicio'
    }
  }
];

export default function RegistroProveedor({ onSubmit }) {
  const [showModal, setShowModal] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const handleSubmit = async (data) => {
    try {
      if (data.servicios.some(s => s.value === 'otros')) {
        const descripcion = window.prompt(
          'Seleccionaste "Otros". Por favor describe el servicio que ofreces:',
          ''
        );
        if (!descripcion || !descripcion.trim()) {
          window.alert('Debes describir tu servicio para continuar.');
          return;
        }
        const filtrados = data.servicios.filter(s => s.value !== 'otros');
        data.servicios = [
          ...filtrados,
          { value: descripcion.trim(), label: descripcion.trim() }
        ];
      }

      await registerUser({
        nombre: data.nombre,
        correo: data.correo,
        clave: data.clave,
        servicios: data.servicios.map(s => s.value)
      });

      setEmail(data.correo);
      setShowModal(true);
    } catch (err) {
      window.alert(err.error || 'Error inesperado al registrar proveedor');
    }
  };

  const handleClose = () => setShowModal(false);

  return (
    <div className="container py-5">
      <div className="row justify-content-end">
        <div className="col-12 col-md-7">
          <TituloCrearInicio
            texto="Registro de Prestador de Servicios"
            height="140px"
            fontSize="clamp(1.5rem, 5vw, 2.5rem)"
          />

          <FormBase
            fields={fieldsProveedor}
            onSubmit={handleSubmit}
            submitLabel="Registrarme como proveedor"
          />
        </div>
      </div>

      <RegistroExitosoModal
        show={showModal}
        correo={email}
        onClose={handleClose}
      />

      {/* Enlace al login */}
      <div className="text-center mt-4">
        <Link to="/login" className="btn btn-link">
          ¿Ya tienes cuenta? Inicia sesión aquí
        </Link>
      </div>
    </div>
  );
}
