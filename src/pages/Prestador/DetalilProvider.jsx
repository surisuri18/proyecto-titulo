
// src/pages/DetailProviderPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProfileCard from '../../components/PrestadorServicio/CardPrestadorPerfil';
import DescriptionBox from '../../components/PrestadorServicio/DescripcionPerfil';
import FotosTrabajo from '../../components/PrestadorServicio/FotosTrabajo';
import Valoracion from '../../components/PrestadorServicio/Valoracion';
import { Container, Spinner } from 'react-bootstrap';

export default function DetailProviderPage() {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/providers/detalle/${id}`)
      .then(({ data }) => setProvider(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!provider) {
    return (
      <Container className="text-center my-5">
        <p>Proveedor no encontrado.</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      {/* 1. Cabecera con avatar y datos básicos */}
      <ProfileCard
        data={provider}
        nameField="nombre"
        emailField="correo"
        imageField="imagenUrl"
      />

      {/* 2. Valoración */}
      <h5 className="mt-4">Calificación</h5>
      <Valoracion rating={provider.calificacion} readOnly />

      {/* 3. Descripción */}
      <h5 className="mt-4">Descripción</h5>
      <DescriptionBox
        description={provider.descripcion}
        placeholder="El proveedor no ha añadido descripción."
        rows={6}
      />

      {/* 4. Galería */}
      <h5 className="mt-4">Fotos de trabajos</h5>
      <FotosTrabajo initialPhotos={provider.galeria} />
    </Container>
  );
}
