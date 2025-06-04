// src/controllers/authController.js
import jwt from 'jsonwebtoken';
import { sendConfirmationEmail } from '../utils/mailer.js';
import User from '../models/user.js';
import Provider from '../models/Provider.js'; // <-- aquí debe coincidir exactamente con el nombre "Provider.js"
import bcrypt from 'bcrypt';

// Registrar nuevo usuario o proveedor (envía correo de confirmación)
export const register = async (req, res) => {
  const { nombre, correo, clave, servicios, ciudad, descripcion } = req.body;

  try {
    const existsUser = await User.findOne({ correo });
    const existsProvider = await Provider.findOne({ correo });
    if (existsUser || existsProvider) {
      return res
        .status(400)
        .json({ error: 'Correo ya registrado, por favor prueba otro.' });
    }

    const hashedPassword = await bcrypt.hash(clave, 10);
    const token = jwt.sign(
      { nombre, correo, clave: hashedPassword, servicios, ciudad, descripcion },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    await sendConfirmationEmail(correo, token);
    res
      .status(201)
      .json({ message: 'Correo de confirmación enviado. Revisa tu bandeja.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Confirmar cuenta al hacer clic en el enlace del correo
export const confirmEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const existsUser = await User.findOne({ correo: payload.correo });
    const existsProvider = await Provider.findOne({ correo: payload.correo });
    if (existsUser || existsProvider) {
      return res
        .status(400)
        .json({ error: 'La cuenta ya fue creada previamente.' });
    }

    if (payload.servicios && payload.servicios.length > 0) {
      // Es proveedor
      const newProvider = new Provider({
        nombre: payload.nombre,
        correo: payload.correo,
        clave: payload.clave,
        servicios: payload.servicios,
        ciudad: payload.ciudad || '',
        descripcion: payload.descripcion || '',
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
      await newProvider.save();
    } else {
      // Es usuario normal
      const newUser = new User({
        nombre: payload.nombre,
        correo: payload.correo,
        clave: payload.clave
      });
      await newUser.save();
    }

    res.json({ message: 'Cuenta confirmada y registrada correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Token inválido o expirado.' });
  }
};

// Login para usuario o proveedor
export const login = async (req, res) => {
  const { correo, clave } = req.body;
  try {
    let user = await Provider.findOne({ correo });
    let userModel = 'Provider';
    if (!user) {
      user = await User.findOne({ correo });
      userModel = 'User';
    }
    if (!user) {
      return res.status(400).json({ error: 'Correo o clave incorrectas.' });
    }

    const match = await bcrypt.compare(clave, user.clave);
    if (!match) {
      return res.status(400).json({ error: 'Correo o clave incorrectas.' });
    }

    const token = jwt.sign(
      { id: user._id, correo: user.correo, model: userModel },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        _id: user._id,
        nombre: user.nombre,
        correo: user.correo,
        userModel,
        servicios: userModel === 'Provider' ? user.servicios : []
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor.' });
  }
};

// Obtener perfiles aleatorios de proveedores
export const randomProfiles = async (req, res) => {
  try {
    const providers = await Provider.aggregate([{ $sample: { size: 4 } }]);
    const sanitized = providers.map(p => ({
      _id: p._id,
      nombre: p.nombre,
      correo: p.correo,
      imagenUrl: p.imagenUrl,
      servicios: p.servicios,
      ciudad: p.ciudad,
      calificacion: p.calificacion,
      descripcion: p.descripcion
    }));
    return res.json(sanitized);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Error al obtener perfiles aleatorios.' });
  }
};

// Búsqueda de proveedores
export const searchProviders = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === '') {
      return res.json([]);
    }
    const term = q.trim();
    const num = parseFloat(term);
    const isNum = !isNaN(num);
    const regex = new RegExp(term, 'i');

    const orConditions = [
      { nombre: { $regex: regex } },
      { servicios: { $regex: regex } },
      { ciudad: { $regex: regex } }
    ];
    if (isNum) {
      orConditions.push({ calificacion: { $gte: num } });
    }

    const results = await Provider.find({ $or: orConditions }).select('-clave');
    return res.json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al buscar proveedores.' });
  }
};
