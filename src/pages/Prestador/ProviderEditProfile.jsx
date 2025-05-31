import React, { useState } from 'react';
import '../../styles/PageStyles/ProviderEditProfile.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Valoracion from '../../components/PrestadorServicio/Valoracion';
import ImagenGaleria from '../../components/ImagenGaleria';
import Horario from '../../components/Horario';
import fotoPerfil from '../../assets/imagenPerfil.jpeg';

const regionesChile = {
  'Región Metropolitana': ['Santiago', 'Puente Alto', 'Maipú'],
  'Valparaíso': ['Valparaíso', 'Viña del Mar'],
  'Biobío': ['Concepción', 'Talcahuano']
};

function ProviderEditProfile() {
  const [nombre] = useState('María González');
  const [oficio, setOficio] = useState('Manicura');
  const [descripcion, setDescripcion] = useState('Soy una profesional con más de 5 años de experiencia...');
  const [region, setRegion] = useState('Región Metropolitana');
  const [comuna, setComuna] = useState('Santiago');

  const disponibilidadMock = {
    lunes: ['09:00', '10:00'],
    martes: ['14:00'],
    miercoles: [],
    jueves: ['09:00', '11:00'],
    viernes: ['16:00'],
    sabado: [],
    domingo: []
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ nombre, oficio, descripcion, region, comuna });
    alert('Cambios guardados correctamente 🎉');
  };

  return (
    <div className="container mt-5">
      <form className="perfil-top" onSubmit={handleSubmit}>
        {/* Columna izquierda */}
        <div className="perfil-columna">
          <div className="perfil-foto">
            <img src={fotoPerfil} alt="Foto del proveedor" />
          </div>

          <Valoracion valor={4} />

          <div className="perfil-ubicacion">
            <FaMapMarkerAlt className="ubicacion-icono" />
            <div className="ubicacion-inputs">
              <select value={region} onChange={(e) => {
                setRegion(e.target.value);
                setComuna(regionesChile[e.target.value][0]);
              }}>
                {Object.keys(regionesChile).map((reg) => (
                  <option key={reg} value={reg}>{reg}</option>
                ))}
              </select>
              <select value={comuna} onChange={(e) => setComuna(e.target.value)}>
                {regionesChile[region].map((com) => (
                  <option key={com} value={com}>{com}</option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="btn-chat">Guardar cambios</button>
        </div>

        {/* Centro */}
        <div className="perfil-lado-derecho">
          <p className="input-nombre">{nombre}</p>
          <input
            type="text"
            className="input-oficio"
            value={oficio}
            onChange={(e) => setOficio(e.target.value)}
          />
          <textarea
            className="input-descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows="5"
          ></textarea>
        </div>

        {/* Galería */}
        <div className="perfil-galeria">
          <ImagenGaleria />
          <ImagenGaleria />
          <ImagenGaleria />
          <ImagenGaleria />
        </div>
      </form>

      {/* Horario semanal (solo visual) */}
      <Horario disponibilidad={disponibilidadMock} />
    </div>
  );
}

export default ProviderEditProfile;
