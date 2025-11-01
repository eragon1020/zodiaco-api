# 📱 Saints Mobile - Frontend

Aplicación móvil para visualizar los Caballeros del Zodiaco consumiendo API desplegada en Render.

## 🚀 Características

- ✅ Búsqueda en tiempo real por nombre y descripción
- ✅ Filtros por rol (Oro, Plata, Bronce, Espectros, Dioses)
- ✅ Diseño moderno con glassmorphism
- ✅ Pull to refresh
- ✅ Estados de carga y error
- ✅ Compatible con Expo SDK 54

## 📦 Instalación
```bash
cd mobile
npm install
npx expo start -c
```

## 🔧 Configuración

API conectada: `https://zodiaco-api.onrender.com/characters`

Para cambiar la URL del backend, edita en `App.js`:
```javascript
const API_BASE = 'TU_NUEVA_URL';
```

## 📱 Ejecutar
```bash
# Inicia el servidor de desarrollo
npx expo start

# Con túnel (si hay problemas de red)
npx expo start --tunnel

# Limpiar caché
npx expo start -c
```

Escanea el QR con Expo Go (Android) o la cámara (iOS).

## 🎨 Estructura
```
mobile/
├── App.js              # Componente principal con búsqueda y filtros
├── assets/             # Imágenes y recursos
├── package.json        # Dependencias
└── app.json           # Configuración de Expo
```

## 🐛 Troubleshooting

**Error: "Project is incompatible with this version of Expo Go"**
- Actualiza expo: `npm install expo@~54.0.0`
- Limpia caché: `npx expo start -c`

**Error: "failed to download remote update"**
- Desactiva updates en `app.json`:
```json
  "updates": { "enabled": false }
```

## 📞 Soporte

Desarrollado para el proyecto Saints Full Stack.