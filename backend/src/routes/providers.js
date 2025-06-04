// routes/providers.js
const express = require('express');
const router = express.Router();
const Provider = require('../models/Provider');

// GET /api/providers
// Devuelve todos los proveedores (sin la clave ni datos sensibles)
router.get('/', async (req, res) => {
  try {
    const proveedores = await Provider.find().select('-clave');
    res.json(proveedores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener proveedores' });
  }
});

// GET /api/providers/:id
// Devuelve un proveedor específico por su ID
router.get('/:id', async (req, res) => {
  try {
    const proveedor = await Provider.findById(req.params.id).select('-clave');
    if (!proveedor) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
    res.json(proveedor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el proveedor' });
  }
});

module.exports = router;
