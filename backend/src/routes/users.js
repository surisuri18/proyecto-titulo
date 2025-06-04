// src/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Provider = require('../models/Provider');

// Obtener todos los proveedores
router.get('/proveedores', async (req, res) => {
  try {
    // Ya no filtramos por rol; usamos el modelo Provider directamente
    const proveedores = await Provider.find().select('-clave');
    res.json(proveedores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener proveedores' });
  }
});

// Obtener un usuario por su ID
router.get('/:id', async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id).select('-clave');
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});

module.exports = router;
