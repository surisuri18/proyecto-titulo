require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🔗 MongoDB conectado'))
  .catch(err => console.error('❌ Error MongoDB', err));

// Importar rutas de autenticación
const authRoutes = require('./routes/auth');

// Usar rutas para /api/auth
app.use('/api/auth', authRoutes);

// Ruta raíz para probar servidor
app.get('/', (req, res) => {
  res.send('Servidor backend corriendo');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
