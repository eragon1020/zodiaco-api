const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Saint Seiya Characters API',
      version: '1.0.0',
      description: 'API para gestionar Caballeros del Zodiaco',
      contact: {
        name: 'API Support',
        email: 'support@saintsapi.com'
      }
    },
    servers: [
      {
        url: 'https://zodiaco-api.onrender.com',
        description: 'Production server'
      },
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    tags: [
      {
        name: 'Characters',
        description: 'Endpoints para gestionar personajes'
      }
    ]
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;