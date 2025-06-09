// src/pages/UserProfile.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import ProfileCard from '../../components/ProfileCard';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import '../../styles/PageStyles/UserProfile.css';

export default function UserProfile() {
  const { user, token } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);

    const handleSaveDescription = async (desc) => {
    try {
      const url = `http://localhost:4000/api/users/descripcion/${user._id}`;
      const res = await axios.put(
        url,
        { descripcion: desc },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfileData(res.data);
    } catch (error) {
      console.error('Error al actualizar descripción:', error.response?.data || error);
    }
  };

  useEffect(() => {
    if (!user?._id) {
      setLoading(false);
      return;
    }

    const url = `http://localhost:4000/api/users/perfil/${user._id}`;
    setLoading(true);
    axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setProfileData(res.data))
    .catch(err => console.error('Error fetching profile:', err.response?.data || err))
    .finally(() => setLoading(false));
  }, [user, token]);

  const handleImageChange = file => {
    setImageFile(file);
  };

  const handleSaveChanges = async () => {
    if (!imageFile) return;
    const formData = new FormData();
    formData.append('imagen', imageFile);

    const uploadUrl = `http://localhost:4000/api/users/upload-profile-image/${user._id}`;
    try {
      const res = await axios.post(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setProfileData(prev => ({
        ...prev,
        imagenUrl: res.data.imagenUrl,
      }));
    } catch (error) {
      console.error('Error uploading image:', error.response?.data || error);
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!profileData) {
    return (
      <Container className="text-center my-5">
        <p>No se encontró el perfil.</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <ProfileCard
            data={profileData}
            nameField="nombre"
            emailField="correo"
            imageField="imagenUrl"
            descriptionField="descripcion"
            onImageChange={handleImageChange}
            onSaveDescription={handleSaveDescription}
          />
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
