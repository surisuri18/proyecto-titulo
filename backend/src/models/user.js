const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true, lowercase: true },
  clave: { type: String, required: true },
  imagenUrl: { type: String }, 
  creadoEn: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
