import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import fondo from "../assets/espirales.png";

function RegisterUser() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
  });

  const [errores, setErrores] = useState({});
  const [correoExiste, setCorreoExiste] = useState(false);
  const [registroExitoso, setRegistroExitoso] = useState(false);

  const correosRegistrados = ["test@correo.com", "usuario@ejemplo.com"];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "./instalar-bp-ac/js/bootstrap.bundle.min.js";
    script.async = true;
    document.body.appendChild(script);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "./instalar-bp-ac/css/bootstrap.min.css";
    document.head.appendChild(link);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

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

    if (correosRegistrados.includes(formData.correo)) {
      setCorreoExiste(true);
      return;
    }

    setCorreoExiste(false);
    setRegistroExitoso(true);

    console.log("Registrando usuario:", formData);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-5 d-none d-md-block">
          <img src={logo} alt="Registro" className="img-fluid" style={{ maxHeight: "1000px" }} />
        </div>
        <div className="col-md-7">
          <div
            className="text-center text-white py-4 mb-4"
            style={{
              backgroundImage: `url(${fondo})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "10px",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            <h1 className="display-6 fw-bold" style={{ color: "#0c1c17" }}>Crear una cuenta nueva</h1>
          </div>

          <div className="p-4">
            <h4 className="h6 text-center mb-4" style={{ fontFamily: "'Roboto', sans-serif" }}>
              Crea tu cuenta para contratar servicios
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">NOMBRE</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="form-control border border-dark rounded-0"
                />
                {errores.nombre && <div className="text-danger small">{errores.nombre}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">CORREO ELECTRÓNICO</label>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  className="form-control border border-dark rounded-0"
                />
                {errores.correo && <div className="text-danger small">{errores.correo}</div>}
                {correoExiste && <div className="text-danger small">Este correo ya está registrado.</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">CLAVE</label>
                <input
                  type="password"
                  name="contraseña"
                  value={formData.contraseña}
                  onChange={handleChange}
                  className="form-control border border-dark rounded-0"
                />
                {errores.contraseña && <div className="text-danger small">{errores.contraseña}</div>}
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Registrarse
              </button>
            </form>

            {registroExitoso && (
              <div className="alert alert-success mt-3">
                Registro exitoso. Se ha enviado un correo de confirmación.
              </div>
            )}

            <div className="text-center mt-3">
              <a href="/recuperar-clave" className="text-decoration-none">
                O registrate con tu cuenta de Google
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
