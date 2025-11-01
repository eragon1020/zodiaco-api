require('dotenv').config();
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

// ====================================
// RUTA RAÍZ - Bienvenida
// ====================================
app.get('/', (req, res) => {
  res.json({
    message: '🌟 Saint Seiya Characters API',
    version: '1.0.0',
    status: 'active',
    description: 'API RESTful para gestionar Caballeros del Zodiaco',
    endpoints: {
      listCharacters: 'GET /characters',
      getCharacter: 'GET /characters/:id',
      createCharacter: 'POST /characters',
      updateCharacter: 'PUT /characters/:id',
      deleteCharacter: 'DELETE /characters/:id',
      filterBySign: 'GET /characters?zodiacSign=Leo',
      swagger: 'GET /api-docs',
      health: 'GET /api/health',
      seed: 'POST /api/seed'
    },
    documentation: 'https://zodiaco-api.onrender.com/api-docs',
    repository: 'https://github.com/eragon1020/zodiaco-api',
    author: 'Briam',
    timestamp: new Date().toISOString()
  });
});

// ====================================
// RUTAS DE LA API
// ====================================
app.use('/characters', charactersRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ====================================
// ENDPOINT HEALTH CHECK
// ====================================
app.get('/api/health', async (req, res) => {
  try {
    const Character = require('./models/Character');
    const count = await Character.countDocuments();
    
    res.json({
      status: 'OK',
      service: 'Characters Microservice',
      database: 'Connected',
      charactersCount: count,
      mongoUri: process.env.MONGO_URI ? 'Configured' : 'Missing',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      error: error.message
    });
  }
});

// ====================================
// ENDPOINT SEED (Desarrollo)
// ====================================
app.post('/api/seed', async (req, res) => {
  try {
    const Character = require('./models/Character');
    
    const characters = [
      {
        name: "Seiya de Pegaso",
        zodiacSign: "Sagitario",
        imageUrl: "https://i.pinimg.com/474x/d9/9e/85/d99e855c6de91918796ae3af711005d5.jpg",
        description: "Caballero de bronce de Pegaso, protagonista principal"
      },
      {
        name: "Shiryu de Dragón",
        zodiacSign: "Libra",
        imageUrl: "https://e7.pngegg.com/pngimages/232/187/png-clipart-dragon-shiry%C5%AB-pegasus-seiya-%E8%81%96%E9%97%98%E5%A3%AB%E6%98%9F%E7%9F%A2-%E3%82%AE%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%B7%E3%83%BC%E3%82%AB%E3%83%BC%E3%83%89%E3%83%90%E3%83%88%E3%83%AB-saint-seiya-knights-of-the-zodiac-anime-anime-superhero-pin-thumbnail.png",
        description: "Caballero de bronce de Dragón, discípulo del Maestro Dohko"
      },
      {
        name: "Hyoga de Cisne",
        zodiacSign: "Acuario",
        imageUrl: "https://i.pinimg.com/474x/71/45/09/714509ece562495f6b0a768ff5dc1b1c.jpg",
        description: "Caballero de bronce de Cisne, maestro del hielo"
      },
      {
        name: "Shun de Andrómeda",
        zodiacSign: "Virgo",
        imageUrl: "https://w7.pngwing.com/pngs/811/754/png-transparent-andromeda-shun-pegasus-seiya-saint-seiya-brave-soldiers-saint-seiya-knights-of-the-zodiac-milo-television-manga-fictional-character-thumbnail.png",
        description: "Caballero de bronce de Andrómeda, hermano de Ikki"
      },
      {
        name: "Ikki de Fénix",
        zodiacSign: "Leo",
        imageUrl: "https://c0.klipartz.com/pngpicture/186/714/gratis-png-phoenix-ikki-phoenix-thumbnail.png",
        description: "Caballero de bronce de Fénix, hermano mayor de Shun"
      },
      {
        name: "Saga de Géminis",
        zodiacSign: "Géminis",
        imageUrl: "https://w7.pngwing.com/pngs/765/20/png-transparent-gemini-saga-pegasus-seiya-athena-cygnus-hyoga-phoenix-ikki-anime-purple-fictional-character-cartoon-thumbnail.png",
        description: "Caballero dorado de Géminis, personalidad dual"
      },
      {
        name: "Aiolia de Leo",
        zodiacSign: "Leo",
        imageUrl: "https://p7.hiclipart.com/preview/168/87/632/cancer-deathmask-pegasus-seiya-leo-aiolia-saint-seiya-knights-of-the-zodiac-others.jpg",
        description: "Caballero dorado de Leo, hermano de Aioros"
      },
      {
        name: "Shaka de Virgo",
        zodiacSign: "Virgo",
        imageUrl: "https://c0.klipartz.com/pngpicture/922/33/gratis-png-shaka-pegasus-seiya-andromeda-shun-saint-seiya-caballeros-del-zodiaco-saint-seiya-alma-de-los-soldados-virgo.png",
        description: "Caballero dorado de Virgo, el más cercano a los dioses"
      },
      {
        name: "Camus de Acuario",
        zodiacSign: "Acuario",
        imageUrl: "https://e7.pngegg.com/pngimages/689/372/png-clipart-aquarius-camus-pegasus-seiya-capricorn-shura-aries-mu-cygnus-hyoga-aquarius-fictional-character-shaka-thumbnail.png",
        description: "Caballero dorado de Acuario, maestro de Hyoga"
      },
      {
        name: "Mu de Aries",
        zodiacSign: "Aries",
        imageUrl: "https://i.pinimg.com/736x/37/bb/a0/37bba0bcc6d71b844ca2c86f323fb227.jpg",
        description: "Caballero dorado de Aries, reparador de armaduras"
      },
      {
        name: "Aldebarán de Tauro",
        zodiacSign: "Tauro",
        imageUrl: "https://i.pinimg.com/736x/30/d9/0b/30d90bfa90b49da1687b347d5c9ee645.jpg",
        description: "Caballero dorado de Tauro, gran corazón noble"
      },
      {
        name: "Milo de Escorpio",
        zodiacSign: "Escorpio",
        imageUrl: "https://i.pinimg.com/474x/39/12/7c/39127c98396f1b12f60a39c7de0f4300.jpg",
        description: "Caballero dorado de Escorpio, aguijón escarlata"
      }
    ];

    console.log('🧹 Limpiando base de datos...');
    const deleteResult = await Character.deleteMany({});
    console.log(`   Documentos eliminados: ${deleteResult.deletedCount}`);
    
    console.log('💾 Insertando personajes...');
    const inserted = await Character.insertMany(characters);
    console.log(`✅ ${inserted.length} personajes insertados`);
    
    res.json({
      success: true,
      message: `✅ Seed ejecutado exitosamente`,
      deletedCount: deleteResult.deletedCount,
      insertedCount: inserted.length,
      characters: inserted.map(c => ({
        id: c._id,
        name: c.name,
        zodiacSign: c.zodiacSign
      }))
    });
    
  } catch (error) {
    console.error('❌ Error en seed:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ====================================
// MANEJO DE RUTAS NO ENCONTRADAS
// ====================================
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    message: `La ruta ${req.method} ${req.url} no existe`,
    availableEndpoints: {
      root: 'GET /',
      characters: 'GET /characters',
      swagger: 'GET /api-docs',
      health: 'GET /api/health'
    }
  });
});

// ====================================
// CONFIGURACIÓN Y CONEXIÓN
// ====================================
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Verificación de URI
if (!MONGO_URI) {
  console.error('❌ No se encontró MONGO_URI en el archivo .env');
  process.exit(1);
}

// Conexión a MongoDB Atlas
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
    app.listen(PORT, () => {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`🚀 Saint Seiya API corriendo en puerto ${PORT}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`📖 Documentación: http://localhost:${PORT}/api-docs`);
      console.log(`💚 Health check:  http://localhost:${PORT}/api/health`);
      console.log(`🌱 Seed endpoint:  POST http://localhost:${PORT}/api/seed`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    });
  })
  .catch(err => {
    console.error('❌ Error al conectar con MongoDB Atlas:', err);
    process.exit(1);
  });