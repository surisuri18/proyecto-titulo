// src/routes/auth.js
const express = require('express');
const router = express.Router();

// Importar los controladores reales
const {
  register,
  confirmEmail,
  login,
  randomProfiles,
  searchProviders
} = require('../controllers/authController');

// Registro “real” (envía email de confirmación)
router.post('/register', register);

// Confirmación de cuenta (email)
router.get('/confirm/:token', confirmEmail);

// Login (usuarios o proveedores)
router.post('/login', login);

// Obtener perfiles aleatorios de proveedores
router.get('/random-profiles', randomProfiles);

// Búsqueda de proveedores según query ?q=
router.get('/search', searchProviders);

// Ruta DEV: crea usuario o proveedor sin etapa de confirmación
router.post('/register-dev', async (req, res) => {
  const { nombre, correo, clave, servicios, ciudad = '', descripcion = '' } = req.body;
  const bcrypt = require('bcrypt');
  const User = require('../models/user');       // archivo user.js
  const Provider = require('../models/Provider'); // archivo Provider.js

  try {
    // 1) Verificar que no exista ya en ninguna colección
    const existsUser = await User.findOne({ correo });
    const existsProv = await Provider.findOne({ correo });
    if (existsUser || existsProv) {
      return res.status(400).json({ error: 'Correo ya registrado' });
    }

    // 2) Encriptar clave
    const hashedPassword = await bcrypt.hash(clave, 10);

    // 3) Si viene “servicios” (arreglo no vacío), lo creamos como proveedor
    if (Array.isArray(servicios) && servicios.length > 0) {
      const newProv = new Provider({
        nombre,
        correo,
        clave: hashedPassword,
        servicios,
        ciudad,
        descripcion,
        imagenUrl: '',
        calificacion: 0,
        galeria: [],
        disponibilidad: {
          lunes: [],
          martes: [],
          miercoles: [],
          jueves: [],
          viernes: [],
          sabado: [],
          domingo: []
        }
      });
      await newProv.save();
      return res
        .status(201)
        .json({ message: 'Proveedor creado correctamente (modo dev)', provider: newProv });
    }

    // 4) Si no vienen servicios, es usuario normal
    const newUser = new User({
      nombre,
      correo,
      clave: hashedPassword
    });
    await newUser.save();
    return res
      .status(201)
      .json({ message: 'Usuario creado correctamente (modo dev)', user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al crear usuario/proveedor' });
  }
});

module.exports = router;
