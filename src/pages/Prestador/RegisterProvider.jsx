// src/pages/RegistroProveedor.jsx

import React from 'react';
import FormBase from '../../components/formularios/FormBase';
import TituloCrearInicio from '../../components/TituloCrearInicio';
import RegistroExitosoModal from '../../components/Popups/PopupRegistroExitoso';
import logo from '../../assets/logo.png';  
import { registerUser } from '../../services/authService';         // Ajusta la ruta si es necesario
import 'bootstrap/dist/css/bootstrap.min.css';

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
    creatable: true,         // permite teclear opciones nuevas
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
  const [email,     setEmail]     = React.useState('');

  const handleSubmit = async (data) => {
  // 1) Chequear “Otros”
  if (data.servicios.some(s => s.value === 'otros')) {
    const descripcion = window.prompt(
      'Seleccionaste "Otros". Por favor describe el servicio que ofreces:',
      ''
    );
    if (!descripcion || !descripcion.trim()) {
      window.alert('Debes describir tu servicio para continuar.');
      return;
    }
    // Reemplazar "otros" por la descripción
    const filtrados = data.servicios.filter(s => s.value !== 'otros');
    data.servicios = [
      ...filtrados,
      { value: descripcion.trim(), label: descripcion.trim() }
    ];
  }

  try {
    // 2) Llamar al backend para registrar proveedor
    await registerUser({
      nombre: data.nombre,
      correo: data.correo,
      clave: data.clave,
      servicios: data.servicios.map(s => s.value), // enviar solo valores
    });

    setEmail(data.correo);
    setShowModal(true);
  } catch (err) {
    // Manejar error (puedes mostrar alerta o estado de error)
    window.alert(err.error || 'Error inesperado al registrar proveedor');
  }
};

  const handleClose = () => setShowModal(false);

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
            texto="Registro de Prestador de Servicios"
            height="140px"
            fontSize="2.5rem"
          />

          <FormBase
            fields={fieldsProveedor}
            onSubmit={handleSubmit}
            submitLabel="Registrarme como proveedor"
          />
        </div>
      </div>

      {/* Modal de éxito */}
      <RegistroExitosoModal
        show={showModal}
        correo={email}
        onClose={handleClose}
      />
    </div>
  );
}
