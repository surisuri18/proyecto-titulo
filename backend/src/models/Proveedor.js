// models/Proveedor.js
const mongoose = require('mongoose');

const proveedorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  clave: { type: String, required: true },
  imagenUrl: { type: String }, 
  servicios: { type: [String], required: true },  // arreglo con servicios
  ciudad:       { type: String },  
  calificacion: { type: Number, min: 0, max: 5, default: 0 },
});

module.exports = mongoose.model('Proveedor', proveedorSchema);
