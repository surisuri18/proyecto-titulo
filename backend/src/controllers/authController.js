const jwt = require('jsonwebtoken'); 
const { sendConfirmationEmail } = require('../utils/mailer');
const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { nombre, correo, clave, servicios } = req.body;

  try {
    const exists = await User.findOne({ correo });
    if (exists) return res.status(400).json({ error: 'Correo ya registrado' });

    const hashedPassword = await bcrypt.hash(clave, 10);

    const token = jwt.sign(
      { nombre, correo, clave: hashedPassword, servicios },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Enviar correo con enlace de confirmación (usando la función sendConfirmationEmail)
    await sendConfirmationEmail(correo, token);

    res.status(201).json({ message: 'Correo de confirmación enviado. Revisa tu bandeja.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

exports.confirmEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const exists = await User.findOne({ correo: payload.correo });
    if (exists) return res.status(400).json({ error: 'Usuario ya confirmado' });

    const newUser = new User({
      nombre: payload.nombre,
      correo: payload.correo,
      clave: payload.clave,
      servicios: payload.servicios,
    });

    await newUser.save();

    res.json({ message: 'Usuario confirmado y registrado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Token inválido o expirado' });
  }
};
