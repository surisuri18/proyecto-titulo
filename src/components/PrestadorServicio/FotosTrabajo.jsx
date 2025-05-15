import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * PhotoUploader
 * Permite subir y mostrar fotos de un servicio.
 * - Muestra 4 tarjetas (2x2) por defecto.
 * - Las primeras 3 muestran las imágenes subidas.
 * - La cuarta muestra "Ver más" (+n) y abre un modal con todas las fotos.
 *
 * Props:
 *  - initialPhotos: array de URLs iniciales (opcional)
 */
const FotosTrabajo = ({ initialPhotos = [] }) => {
  const [photos, setPhotos] = useState(initialPhotos);
  const [modalOpen, setModalOpen] = useState(false);
  const fileInput = useRef(null);

  const onFilesSelected = e => {
    const files = Array.from(e.target.files);
    const urls = files.map(file => URL.createObjectURL(file));
    setPhotos(prev => [...prev, ...urls]);
  };

  const openFileDialog = () => fileInput.current.click();

  const photosToShow = photos.slice(0, 3);
  const remaining = photos.length - 3;

  return (
    <>
      {/* Input oculto para subir fotos */}
      <input
        type="file"
        accept="image/*"
        multiple
        hidden
        ref={fileInput}
        onChange={onFilesSelected}
      />

      {/* Grid de 4 tarjetas */}
      <div className="row g-2">
        {photosToShow.map((url, idx) => (
          <div className="col-6" key={idx}>
            <div className="card">
              <img
                src={url}
                alt={`Foto ${idx + 1}`}
                className="card-img-top"
                style={{ height: '150px', objectFit: 'cover' }}
                onClick={openFileDialog}
              />
            </div>
          </div>
        ))}

        {/* Cuarta carta: Ver más o subir */}
        <div className="col-6">
          <div
            className="card bg-light text-center d-flex align-items-center justify-content-center"
            style={{ height: '150px', cursor: 'pointer' }}
            onClick={() => (photos.length > 3 ? setModalOpen(true) : openFileDialog())}
          >
            {photos.length > 3 ? (
              <span className="fw-bold">
                +{remaining} Ver más
              </span>
            ) : (
              <span className="text-muted">Subir fotos</span>
            )}
          </div>
        </div>
      </div>

      {/* Modal con todas las fotos */}
      {modalOpen && (
        <div className="modal show d-block" tabIndex="-1" onClick={() => setModalOpen(false)}>
          <div className="modal-dialog modal-lg modal-dialog-centered" onClick={e => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Todas las fotos</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalOpen(false)}
                />
              </div>
              <div className="modal-body">
                <div className="row g-2">
                  {photos.map((url, i) => (
                    <div className="col-6 col-md-4" key={i}>
                      <img
                        src={url}
                        alt={`Foto ${i + 1}`}
                        className="img-fluid rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

FotosTrabajo.propTypes = {
  initialPhotos: PropTypes.arrayOf(PropTypes.string)
};

export default FotosTrabajo;
