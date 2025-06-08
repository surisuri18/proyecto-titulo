// src/pages/ProviderProfile.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import ProfileCard from '../../components/ProfileCard';
import HorarioEditable from '../../components/HorarioEditable';
import { updateAvailability } from '../../services/providerService';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import '../../styles/PageStyles/ProviderProfile.css';

export default function MiPerfilProvider() {
  const { user, token } = useContext(AuthContext);
  const [providerData, setProviderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
    const [availability, setAvailability] = useState({
    lunes: [], martes: [], miercoles: [],
    jueves: [], viernes: [], sabado: [], domingo: []
  });

  useEffect(() => {
    console.log('🏷️ AuthContext.user =', user);
    console.log('🔑 token =', token);

    // Asegurarnos de que sea un proveedor
    if (!user?._id || user.accountType !== 'Provider') {
      console.warn('No hay provider logueado o userModel distinto de Provider');
      setLoading(false);
      return;
    }

    setLoading(true);

    const url = 'http://localhost:4000/api/providers/perfil';
    console.log('📡 Llamando a:', url);

    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        console.log('✅ /perfil response.data =', res.data);
        setProviderData(res.data);
         if (res.data.disponibilidad) {
          setAvailability(res.data.disponibilidad);
        }
      })
      .catch(err => {
        console.error('❌ Error al obtener mi perfil:', err.response?.data || err);
      })
      .finally(() => setLoading(false));
  }, [user, token]);

  const handleImageChange = file => setImageFile(file);

  const handleSaveChanges = async () => {
    if (!imageFile) return;
    const formData = new FormData();
    formData.append('imagen', imageFile);

    try {
      const url = `http://localhost:4000/api/providers/upload-profile-image/${user._id}`;
      console.log('📤 Subiendo imagen a:', url);
      const res = await axios.post(
        url,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('✅ upload response =', res.data);
      setProviderData(prev => ({
        ...prev,
        imagenUrl: res.data.imagenUrl,
      }));
    } catch (error) {
      console.error('❌ Error al guardar la imagen', error.response?.data || error);
    }
  };

    const handleSaveAvailability = async () => {
    try {
      const updated = await updateAvailability(token, availability);
      setProviderData(updated);
    } catch (error) {
      console.error('❌ Error al guardar disponibilidad', error.response?.data || error);
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
          <HorarioEditable
            disponibilidad={availability}
            onChange={setAvailability}
          />
        </ProfileCard>

          <Button
            className="button-save-changes mt-3"
             onClick={handleSaveChanges}
          disabled={!imageFile}
        >
          Guardar Cambios
        </Button>
        <Button
          className="button-save-changes mt-3 ms-2"
          onClick={handleSaveAvailability}
        >
          Guardar Disponibilidad
        </Button>
      </Col>
            
      </Row>
    </Container>
  );
}
