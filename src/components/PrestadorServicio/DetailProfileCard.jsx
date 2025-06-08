// src/components/ProfileCard.jsx
import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * ProfileCard
 * Componente minimalista para mostrar imagen, nombre y correo
 * Props:
 *  - data: objeto con campos imageField, nameField, emailField
 *  - imageField: nombre del campo de la URL de la imagen
 *  - nameField: nombre del campo de nombre
 *  - emailField: nombre del campo de correo
 */
export default function ProfileCard({ data, imageField, nameField, emailField }) {
  const imgUrl = data?.[imageField] || 'https://via.placeholder.com/150';
  return (
    <Card className="mb-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Card.Img
        variant="top"
        src={imgUrl}
        alt={data?.[nameField] || 'Avatar'}
        style={{ objectFit: 'cover', height: '250px' }}
      />
      <Card.Body className="text-center">
        <Card.Title>{data?.[nameField] || '—'}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {data?.[emailField] || '—'}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

ProfileCard.propTypes = {
  data: PropTypes.object.isRequired,
  imageField: PropTypes.string.isRequired,
  nameField: PropTypes.string.isRequired,
  emailField: PropTypes.string.isRequired,
};