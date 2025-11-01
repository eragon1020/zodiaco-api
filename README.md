# Proyecto Caballeros del Zodiaco - Entrega mínima

Contenido:
- microservices/characters: microservicio de ejemplo (Node.js + Express + Swagger)
- mobile: skeleton Expo React Native (gestos + consumo de API)
- docker-compose.yml: para levantar el servicio characters localmente (necesita MONGO_URI)
- README.md: instrucciones básicas

Pasos para preparar la entrega:
1. Configura MongoDB Atlas y copia la URI en cada microservicio (como variable de entorno MONGO_URI).
2. Despliega cada microservicio en la nube (Heroku, Render, DigitalOcean, AWS, Railway, etc).
3. Actualiza `API_BASE` en `mobile/App.js` con la URL pública del microservicio.
4. Genera capturas de Swagger (/api-docs), Postman y la app móvil. Crea PDF con las capturas.
5. Empaqueta todo en un ZIP sin node_modules: `zip -r entrega.zip . -x "**/node_modules/**"`

Archivos sensibles:
- No subir `.env` con credenciales a repositorios públicos.
