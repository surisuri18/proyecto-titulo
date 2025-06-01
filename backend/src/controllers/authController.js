import jwt from 'jsonwebtoken';
import { sendConfirmationEmail } from '../utils/mailer.js';
import User from '../models/user.js';
import Proveedor from '../models/Proveedor.js';  // Importa modelo proveedor
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
  const { nombre, correo, clave, servicios } = req.body;

  try {
    // Verifica si existe en User o Proveedor
    const existsUser = await User.findOne({ correo });
    const existsProveedor = await Proveedor.findOne({ correo });
    if (existsUser || existsProveedor) {
      return res.status(400).json({ error: 'Correo ya registrado, por favor prueba otro' });
    }

    const hashedPassword = await bcrypt.hash(clave, 10);

    // Crea token con todos los datos para confirmación
    const token = jwt.sign(
      { nombre, correo, clave: hashedPassword, servicios },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

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

    // Verifica existencia en ambas colecciones
    const existsUser = await User.findOne({ correo: payload.correo });
    const existsProveedor = await Proveedor.findOne({ correo: payload.correo });
    if (existsUser || existsProveedor) {
      return res.status(400).json({ error: 'Cuenta creada exitosamente' });
    }

    if (payload.servicios && payload.servicios.length > 0) {
      // Es proveedor
      const newProveedor = new Proveedor({
        nombre: payload.nombre,
        correo: payload.correo,
        clave: payload.clave,
        servicios: payload.servicios,
      });
      await newProveedor.save();
    } else {
      // Es usuario normal
      const newUser = new User({
        nombre: payload.nombre,
        correo: payload.correo,
        clave: payload.clave,
      });
      await newUser.save();
    }

    res.json({ message: 'Usuario confirmado y registrado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Token inválido o expirado' });
  }
};

export const login = async (req, res) => {
  const { correo, clave } = req.body;

  try {
    // Busca primero en proveedores
    let user = await Proveedor.findOne({ correo });
    let tipo = 'proveedor';

    // Si no está, busca en usuarios
    if (!user) {
      user = await User.findOne({ correo });
      tipo = 'usuario';
    }

    if (!user) return res.status(400).json({ error: 'Correo o clave incorrectas' });

    const match = await bcrypt.compare(clave, user.clave);
    if (!match) return res.status(400).json({ error: 'Correo o clave incorrectas' });

    const token = jwt.sign(
      { id: user._id, correo: user.correo, tipo },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.json({ 
      message: 'Login exitoso', 
      token, 
      user: { nombre: user.nombre, correo: user.correo, servicios: user.servicios || [] , tipo } 
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
