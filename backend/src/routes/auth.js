const express = require('express');
const router = express.Router();
const { register, confirmEmail } = require('../controllers/authController');

const bcrypt = require('bcrypt');
const User = require('../models/user');


router.post('/register', register);
router.get('/confirm/:token', confirmEmail);

// Ruta rápida para crear usuarios sin confirmar correo (modo desarrollo)
router.post('/register-dev', async (req, res) => {
  const { nombre, correo, clave, servicios, rol = 'proveedor' } = req.body;

  try {
    console.log("BODY:", req.body); // ✅ dentro del try

    const exists = await User.findOne({ correo });
    if (exists) return res.status(400).json({ error: 'Correo ya registrado' });

    const hashedPassword = await bcrypt.hash(clave, 10);

    const newUser = new User({
      nombre,
      correo,
      clave: hashedPassword,
      servicios,
      rol
    });

    console.log("Nuevo usuario:", newUser); // ✅ justo antes de guardar

    await newUser.save();
    res.status(201).json({ message: 'Usuario creado correctamente (modo dev)' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});


module.exports = router;
