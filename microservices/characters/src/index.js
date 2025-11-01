require('dotenv').config();          // Cargar variables del archivo .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const charactersRoutes = require('./routes/characters');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.use('/characters', charactersRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Variables de entorno
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// 🔹 Verificación de que existe la URI
if (!MONGO_URI) {
  console.error('❌ No se encontró MONGO_URI en el archivo .env');
  process.exit(1);
}

// 🔹 Conexión a Mongo Atlas
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
    app.listen(PORT, () => console.log(`🚀 Microservicio corriendo en el puerto ${PORT}`));
  })
  .catch(err => {
    console.error('❌ Error al conectar con MongoDB Atlas:', err);
    process.exit(1);
  });
