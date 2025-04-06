import React, { useState } from "react";

function RegisterUser() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
  });

  const [errores, setErrores] = useState({});
  const [correoExiste, setCorreoExiste] = useState(false);
  const [registroExitoso, setRegistroExitoso] = useState(false);

  const correosRegistrados = ["test@correo.com", "usuario@ejemplo.com"]; // Simulación

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formData.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!formData.correo) {
      nuevosErrores.correo = "El correo es obligatorio";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.correo)) {
      nuevosErrores.correo = "Correo inválido";
    }

    if (!formData.contraseña || formData.contraseña.length < 6) {
      nuevosErrores.contraseña = "La contraseña debe tener al menos 6 caracteres";
    }

    return nuevosErrores;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrores({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidados = validarFormulario();
    if (Object.keys(erroresValidados).length > 0) {
      setErrores(erroresValidados);
      return;
    }

    // Simulación: validación si el correo ya está registrado
    if (correosRegistrados.includes(formData.correo)) {
      setCorreoExiste(true);
      return;
    }

    // Simular "envío" y éxito
    setCorreoExiste(false);
    setRegistroExitoso(true);

    // Aquí puedes enviar la data real a tu backend con fetch o axios
    console.log("Registrando usuario:", formData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errores.nombre && <p className="text-red-500 text-sm">{errores.nombre}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Correo electrónico</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errores.correo && <p className="text-red-500 text-sm">{errores.correo}</p>}
          {correoExiste && <p className="text-red-500 text-sm">Este correo ya está registrado.</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Contraseña</label>
          <input
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errores.contraseña && <p className="text-red-500 text-sm">{errores.contraseña}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Registrarse
        </button>
      </form>

      {registroExitoso && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded">
          Registro exitoso. Se ha enviado un correo de confirmación.
        </div>
      )}

      <div className="mt-4 text-center">
        <a href="/recuperar-clave" className="text-sm text-blue-500 hover:underline">
          ¿Olvidaste tu contraseña?
        </a>
      </div>
    </div>
  );
}

export default RegisterUser;
