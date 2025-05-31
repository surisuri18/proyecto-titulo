import React, { useRef, useState } from 'react';
import '../styles/Components/ImagenGaleria.css';

function ImagenGaleria() {
  const [imagen, setImagen] = useState(null);
  const fileInputRef = useRef();

  const handleImagenClick = () => {
    fileInputRef.current.click();
  };

  const handleArchivoSeleccionado = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const urlTemporal = URL.createObjectURL(archivo);
      setImagen(urlTemporal);
    }
  };

  return (
    <div className="galeria-imagen" onClick={handleImagenClick}>
      {imagen ? (
        <img src={imagen} alt="Imagen subida" />
      ) : (
        <span className="texto-subir">Subir imagen</span>
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleArchivoSeleccionado}
      />
    </div>
  );
}

export default ImagenGaleria;
