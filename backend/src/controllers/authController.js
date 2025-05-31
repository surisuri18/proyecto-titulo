import jwt from 'jsonwebtoken';
import { sendConfirmationEmail } from '../utils/mailer.js';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
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

export const confirmEmail = async (req, res) => {
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

export const login = async (req, res) => {
  const { correo, clave } = req.body;

  try {
    const user = await User.findOne({ correo });
    if (!user) return res.status(400).json({ error: 'Credenciales inválidas' });

    const match = await bcrypt.compare(clave, user.clave);
    if (!match) return res.status(400).json({ error: 'Credenciales inválidas' });

    // Opcional: crea un token JWT para sesiones
    const token = jwt.sign(
      { id: user._id, correo: user.correo },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.json({ message: 'Login exitoso', token, user: { nombre: user.nombre, correo: user.correo, servicios: user.servicios } });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
