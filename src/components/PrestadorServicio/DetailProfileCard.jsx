/ src/components/ProfileCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

/**
 * ProfileCard
 * Muestra avatar, nombre y correo de un proveedor.
 */
export default function ProfileCard({ imageUrl, nombre, correo }) {
  const src = imageUrl || 'https://via.placeholder.com/250';
  return (
    <Card className="mb-4 text-center">
      <Card.Img
        variant="top"
        src={src}
        alt={nombre}
        style={{ objectFit: 'cover', height: '250px' }}
      />
      <Card.Body>
        <Card.Title>{nombre}</Card.Title>
        <Card.Subtitle className="text-muted">{correo}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

ProfileCard.propTypes = {
  imageUrl: PropTypes.string,
  nombre: PropTypes.string.isRequired,
  correo: PropTypes.string.isRequired
};