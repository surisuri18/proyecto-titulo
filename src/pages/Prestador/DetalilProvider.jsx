// src/pages/ProviderProfile.jsx

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import ProfileCard from '../../components/ProfileCard';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import '../../styles/PageStyles/ProviderProfile.css';

export default function DetailProvider() {
  // 1) Sacamos `user` (no `provider`) y el `token`
  const { user, token } = useContext(AuthContext);

  const [providerData, setProviderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    // 2) Si no está logueado, salimos
    if (!user?._id || user.accountType !== 'Provider') {
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      // 3) Llamamos a /api/providers/perfil
      .get('http://localhost:4000/api/providers/perfil', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setProviderData(res.data))
      .catch(err => console.error('Error al obtener mi perfil:', err))
      .finally(() => setLoading(false));
  }, [user, token]);

  const handleImageChange = file => setImageFile(file);

  const handleSaveChanges = async () => {
    if (!imageFile) return;
    const formData = new FormData();
    formData.append('imagen', imageFile);

    try {
      const res = await axios.post(
        'http://localhost:4000/api/providers/upload-profile-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProviderData(prev => ({
        ...prev,
        imagenUrl: res.data.imagenUrl,
      }));
    } catch (error) {
      console.error('Error al guardar la imagen', error);
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!providerData) {
    return (
      <Container className="text-center my-5">
        <p>No se encontró al proveedor.</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <ProfileCard
            data={providerData}
            nameField="nombre"
            emailField="correo"
            imageField="imagenUrl"
            descriptionField="descripcion"
            onImageChange={handleImageChange}
          >
            <h6>Servicios</h6>
            <ul>
              {providerData.servicios.map(s => (
                <li key={s}>{s}</li>
              ))}
            </ul>

            <h6>Disponibilidad</h6>
            <div className="availability-grid">
              {Object.entries(providerData.disponibilidad).map(([dia, horas]) => (
                <div key={dia}>
                  <strong>{dia.charAt(0).toUpperCase() + dia.slice(1)}:</strong>{' '}
                  {horas.length ? horas.join(', ') : '—'}
                </div>
              ))}
            </div>
          </ProfileCard>

          <Button
            className="button-save-changes mt-3"
            onClick={handleSaveChanges}
            disabled={!imageFile}
          >
            Guardar Cambios
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
