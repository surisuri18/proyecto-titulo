import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import ChatRoom from '../../components/ChatRoom';
import axios from 'axios';
import { Container, Row, Col, Button, Card, ListGroup } from 'react-bootstrap';

export default function Inbox() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);

  // 1) Si venimos de “Iniciar chat” con un proveedor
  useEffect(() => {
    if (location.state && location.state.contacto) {
      const { contactoId, contactoModel, nombre } = location.state.contacto;
      setSelected({ _id: contactoId, userModel: contactoModel, nombre });
    }
  }, [location.state]);

  // 2) Cargar “últimos mensajes”
  useEffect(() => {
    const fetchContacts = async () => {
      if (!user || !user._id || !user.userModel) return;
      try {
        const res = await axios.get(`/api/chat/ultimos/${user._id}/${user.userModel}`);
        const resultados = await Promise.all(
          res.data.map(async (c) => {
            let nombre = c.contactoId;
            if (c.contactoModel === 'Provider') {
              try {
                const respProv = await axios.get(`/api/providers/${c.contactoId}`);
                nombre = respProv.data.nombre;
              } catch {
                nombre = c.contactoId;
              }
            } else if (c.contactoModel === 'User') {
              try {
                const respUser = await axios.get(`/api/users/${c.contactoId}`);
                nombre = respUser.data.nombre;
              } catch {
                nombre = c.contactoId;
              }
            }
            return {
              contactoId: c.contactoId,
              contactoModel: c.contactoModel,
              nombre,
              ultimoMensaje: c.ultimoMensaje,
              fecha: c.fecha
            };
          })
        );
        setContacts(resultados);
      } catch (err) {
        console.error('Error cargando contactos:', err);
      }
    };
    fetchContacts();
  }, [user]);

  if (!user) {
    return <div>Debes iniciar sesión para ver tus mensajes.</div>;
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={4} className="mb-4 sidebar">
          <Card>
            <Card.Header className="text-center">Mis Chats</Card.Header>
            <ListGroup variant="flush">
              {contacts.length === 0 && !selected && (
                <ListGroup.Item className="text-center">No tienes conversaciones aún.</ListGroup.Item>
              )}
              {contacts.map((c) => (
                <ListGroup.Item
                  key={c.contactoId}
                  className="d-flex justify-content-between align-items-center"
                  action
                  onClick={() =>
                    setSelected({
                      _id: c.contactoId,
                      userModel: c.contactoModel,
                      nombre: c.nombre
                    })
                  }
                  style={{
                    cursor: 'pointer',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    marginBottom: '10px',
                  }}
                >
                  <div>
                    <strong>{c.nombre}</strong> ({c.contactoModel})
                    <br />
                    <small className="text-muted">
                      {c.ultimoMensaje} • {new Date(c.fecha).toLocaleDateString()}{' '}
                      {new Date(c.fecha).toLocaleTimeString()}
                    </small>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        <Col md={8}>
          {selected && <ChatRoom miUsuario={user} otroUsuario={selected} />}
        </Col>
      </Row>
    </Container>
  );
}
