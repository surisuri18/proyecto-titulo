import React from "react";
import FormularioRegistroUsuario from "../../components/formularios/FormularioRegistroUsuario"
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/logo.png"

const UserPage = () => {
  const handleSubmit = (data) => {
    console.log("Datos enviados:", data);
    // Puedes conectar esto con backend o lógica adicional
  };

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        {/* Columna de imagen */}
        <div className="col-md-5 d-flex justify-content-center mb-4 mb-md-0">
          <img
            src={logo} // Ruta de prueba para tu logo
            alt="Logo"
            style={{ width: "300px", maxWidth: "100%", height: "auto" }}
          />
        </div>

        {/* Columna del formulario */}
        <div className="col-md-7">

          <FormularioRegistroUsuario onSubmit={handleSubmit} />

        </div>
      </div>
    </div>
  );
};

export default UserPage;

