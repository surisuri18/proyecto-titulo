import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // npm install react-icons
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Components/PopupExitoso.css';

const PopupExitoso = ({ show, correo, onClose }) => {
  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>

      {/* Modal */}
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content border-0 rounded-3 shadow">
            <div className="modal-header border-0">
              <FaCheckCircle className="text-success me-2" size={28} />
              <h5 className="modal-title">¡Registro Exitoso!</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Cerrar"
                onClick={onClose}
              />
            </div>
            <div className="modal-body text-center">
              <p className="mb-2">
                Tu cuenta ha sido creada con éxito. 
              </p>
              <p className="mb-3">
                Hemos enviado un correo de confirmación a:
              </p>
              <p className="fw-bold">{correo}</p>
              <p className="text-muted small">
                Por favor revisa tu bandeja de entrada (y spam) para finalizar
                la activación de tu cuenta.
              </p>
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-primary"
                onClick={onClose}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupExitoso;
