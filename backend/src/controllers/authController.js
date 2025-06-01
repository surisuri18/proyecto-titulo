import jwt from 'jsonwebtoken';
import { sendConfirmationEmail } from '../utils/mailer.js';
import User from '../models/user.js';
import Proveedor from '../models/Proveedor.js';  // Importa modelo proveedor
import bcrypt from 'bcrypt';

// Registrar nuevo usuario o proveedor
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

// Confirmar cuenta al hacer clic en el enlace del correo
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

// Login para usuario o proveedor
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

// Función para obtener perfiles aleatorios
export const randomProfiles = async (req, res) => {
  try {
    // Saca 4 documentos aleatorios de la colección de proveedores
    const randomProfiles = await Proveedor.aggregate([
      { $sample: { size: 4 } }
    ]);
    return res.json(randomProfiles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener perfiles aleatorios' });
  }
};

/**
 * Busca proveedores que coincidan con la query en:
 * - nombre (contains, case-insensitive)
 * - servicios (al menos uno coincide con la query, case-insensitive)
 * - ciudad (contains, case-insensitive)
 * - calificacion >= valor (si la query es un número)
 */
export const searchProviders = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === '') {
      // Si el query está vacío, devolvemos todos o un array vacío:
      return res.json([]);
    }
    const term = q.trim();
    // Si se puede convertir a número:
    const num = parseFloat(term);
    const isNum = !isNaN(num);

    // Creamos expresiones regulares case-insensitive para texto
    const regex = new RegExp(term, 'i');

    // Armamos el filtro $or:
    const orConditions = [
      { nombre: { $regex: regex } },
      { servicios: { $regex: regex } },  // Mongoose busca cada elemento del array con regex
      { ciudad: { $regex: regex } },
    ];
    // Si term es numérico, también filtramos por calificación >= num
    if (isNum) {
      orConditions.push({ calificacion: { $gte: num } });
    }

    const results = await Proveedor.find({ $or: orConditions });
    return res.json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al buscar proveedores' });
  }
};