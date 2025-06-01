// src/components/PerfilesDestacados.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardPrestadorPerfil from './CardPrestadorPerfil';

const PerfilesDestacados = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/auth/random-profiles');
        setProfiles(response.data);
      } catch (error) {
        console.error('Error al obtener perfiles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) {
    return <p className="text-center">Cargando perfiles...</p>;
  }

  if (profiles.length === 0) {
    return <p className="text-center">No hay perfiles disponibles.</p>;
  }

  return (
    <section className="mb-4">
      <div className="row justify-content-center">
        {profiles.map((profile) => (
          <div className="col-6 col-md-3 mb-3" key={profile._id}>
            <CardPrestadorPerfil
              imagenUrl={profile.imagenUrl || 'default-image.jpg'}
              nombre={profile.nombre}
              oficio={Array.isArray(profile.servicios)
              ? profile.servicios.join(', ')
              : 'Servicio'}// Ajusta según tu modelo
              colorBarra="#bd4fca"
              colorEtiqueta="#f5a623"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PerfilesDestacados;
