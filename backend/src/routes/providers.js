// src/routes/providers.js

const express = require('express');
const jwt = require('jsonwebtoken');
const Provider = require('../models/Provider');
const router = express.Router();

// ------------------------------------------------------------------
// Función inline de autenticación
// ------------------------------------------------------------------
function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No autorizado: falta token' });
  }
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, accountType: payload.accountType };
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

// ------------------------------------------------------------------
// 1) GET /api/providers/perfil
//    Perfil del proveedor autenticado
// ------------------------------------------------------------------
router.get(
  '/perfil',
  authenticate,
  async (req, res) => {
    try {
      const proveedor = await Provider
        .findById(req.user.id)
        .select('-clave');
      if (!proveedor) {
        return res.status(404).json({ error: 'Proveedor no encontrado' });
      }
      res.json(proveedor);
    } catch (error) {
      console.error('Error al obtener mi perfil:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  }
);

// ------------------------------------------------------------------
// 2) GET /api/providers
//    Lista todos los proveedores (público)
// ------------------------------------------------------------------
router.get(
  '/',
  async (req, res) => {
    try {
      const proveedores = await Provider.find().select('-clave');
      res.json(proveedores);
    } catch (error) {
      console.error('Error al obtener proveedores:', error);
      res.status(500).json({ error: 'Error al obtener proveedores' });
    }
  }
);

// ------------------------------------------------------------------
// 3) GET /api/providers/detalle/:id
//    Detalle público de un proveedor por su ID
// ------------------------------------------------------------------
router.get(
  '/detalle/:id',
  async (req, res) => {
    try {
      const proveedor = await Provider.findById(req.params.id).select('-clave');
      if (!proveedor) {
        return res.status(404).json({ error: 'Proveedor no encontrado' });
      }
      res.json(proveedor);
    } catch (error) {
      console.error('Error al obtener el proveedor:', error);
      res.status(500).json({ error: 'Error al obtener el proveedor' });
    }
  }
);

// ------------------------------------------------------------------
// 4) PUT /api/providers/detalle/:id
//    Actualiza la descripción de un proveedor
// ------------------------------------------------------------------
router.put(
  '/detalle/:id',
  // authenticate, // descomenta si quieres proteger esta ruta
  async (req, res) => {
    try {
      const { descripcion } = req.body;
      const updated = await Provider.findByIdAndUpdate(
        req.params.id,
        { descripcion },
        { new: true, select: '-clave' }
      );
      if (!updated) {
        return res.status(404).json({ error: 'Proveedor no encontrado' });
      }
      res.json(updated);
    } catch (error) {
      console.error('Error al actualizar descripción:', error);
      res.status(500).json({ error: 'Error al actualizar la descripción' });
    }
  }
);

module.exports = router;
