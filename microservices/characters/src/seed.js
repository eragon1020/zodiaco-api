// seed.js - Script para poblar la base de datos
require('dotenv').config();
const mongoose = require('mongoose');

// ====================================
// MODELO DE PERSONAJE
// ====================================
const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  zodiacSign: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String }
}, { timestamps: true });

const Character = mongoose.model('Character', characterSchema);

// ====================================
// DATOS DE PERSONAJES CON IMÁGENES VERIFICADAS
// ====================================
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

// ====================================
// FUNCIÓN PRINCIPAL DE SEED
// ====================================
async function seedDatabase() {
  try {
    console.log('\n🚀 Iniciando proceso de seed...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // 1. CONEXIÓN A MONGODB
    console.log('\n📡 Conectando a MongoDB...');
    console.log(`   URI: ${process.env.MONGO_URI?.substring(0, 30)}...`);
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('✅ Conexión exitosa a MongoDB');
    
    // 2. LIMPIAR BASE DE DATOS
    console.log('\n🧹 Limpiando base de datos...');
    const deleteResult = await Character.deleteMany({});
    console.log(`   Documentos eliminados: ${deleteResult.deletedCount}`);
    
    // 3. INSERTAR NUEVOS PERSONAJES
    console.log('\n💾 Insertando personajes...');
    const insertedCharacters = await Character.insertMany(characters);
    console.log(`✅ ${insertedCharacters.length} personajes insertados exitosamente`);
    
    // 4. MOSTRAR PERSONAJES INSERTADOS
    console.log('\n📋 Personajes en la base de datos:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    insertedCharacters.forEach((char, index) => {
      console.log(`\n${index + 1}. ${char.name}`);
      console.log(`   Signo: ${char.zodiacSign}`);
      console.log(`   ID: ${char._id}`);
      console.log(`   Imagen: ${char.imageUrl.substring(0, 60)}...`);
    });
    
    // 5. VERIFICAR TOTAL
    const total = await Character.countDocuments();
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📊 Total de personajes en DB: ${total}`);
    console.log('✅ Seed completado exitosamente');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
  } catch (error) {
    console.error('\n❌ ERROR EN EL SEED:');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('Tipo:', error.name);
    console.error('Mensaje:', error.message);
    
    if (error.name === 'MongooseServerSelectionError') {
      console.error('\n⚠️  No se pudo conectar a MongoDB.');
      console.error('Verifica:');
      console.error('  1. El archivo .env existe y tiene MONGO_URI');
      console.error('  2. La URI de MongoDB es correcta');
      console.error('  3. Tu IP está en la whitelist de MongoDB Atlas');
      console.error('  4. Hay conexión a internet');
    }
    
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    process.exit(1);
    
  } finally {
    // 6. CERRAR CONEXIÓN
    await mongoose.connection.close();
    console.log('🔌 Conexión cerrada\n');
  }
}

// ====================================
// EJECUTAR SEED
// ====================================
seedDatabase();