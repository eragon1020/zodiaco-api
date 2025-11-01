const express = require('express');
const router = express.Router();
const Character = require('../models/Character');

/**
 * @swagger
 * components:
 *   schemas:
 *     Character:
 *       type: object
 *       required:
 *         - name
 *         - zodiacSign
 *         - imageUrl
 *       properties:
 *         _id:
 *           type: string
 *           description: ID auto-generado del personaje
 *         name:
 *           type: string
 *           description: Nombre del caballero
 *         zodiacSign:
 *           type: string
 *           description: Signo zodiacal
 *         imageUrl:
 *           type: string
 *           description: URL de la imagen del personaje
 *         description:
 *           type: string
 *           description: Descripción del personaje
 *       example:
 *         _id: 507f1f77bcf86cd799439011
 *         name: Seiya de Pegaso
 *         zodiacSign: Sagitario
 *         imageUrl: https://i.pinimg.com/474x/d9/9e/85/d99e855c6de91918796ae3af711005d5.jpg
 *         description: Caballero de bronce de Pegaso
 */

/**
 * @swagger
 * tags:
 *   name: Characters
 *   description: API para gestionar Caballeros del Zodiaco
 */

/**
 * @swagger
 * /characters:
 *   get:
 *     summary: Obtener todos los personajes
 *     tags: [Characters]
 *     parameters:
 *       - in: query
 *         name: zodiacSign
 *         schema:
 *           type: string
 *         description: Filtrar por signo zodiacal
 *     responses:
 *       200:
 *         description: Lista de personajes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Character'
 *       500:
 *         description: Error del servidor
 */
router.get('/', async (req, res) => {
  try {
    const { zodiacSign } = req.query;
    const filter = zodiacSign ? { zodiacSign } : {};
    
    const characters = await Character.find(filter);
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /characters/{id}:
 *   get:
 *     summary: Obtener un personaje por ID
 *     tags: [Characters]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del personaje
 *     responses:
 *       200:
 *         description: Personaje encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
 *       404:
 *         description: Personaje no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    
    if (!character) {
      return res.status(404).json({ message: 'Personaje no encontrado' });
    }
    
    res.json(character);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /characters:
 *   post:
 *     summary: Crear un nuevo personaje
 *     tags: [Characters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Character'
 *     responses:
 *       201:
 *         description: Personaje creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', async (req, res) => {
  try {
    const character = new Character({
      name: req.body.name,
      zodiacSign: req.body.zodiacSign,
      imageUrl: req.body.imageUrl,
      description: req.body.description
    });
    
    const newCharacter = await character.save();
    res.status(201).json(newCharacter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /characters/{id}:
 *   put:
 *     summary: Actualizar un personaje
 *     tags: [Characters]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del personaje
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Character'
 *     responses:
 *       200:
 *         description: Personaje actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
 *       404:
 *         description: Personaje no encontrado
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    
    if (!character) {
      return res.status(404).json({ message: 'Personaje no encontrado' });
    }
    
    if (req.body.name) character.name = req.body.name;
    if (req.body.zodiacSign) character.zodiacSign = req.body.zodiacSign;
    if (req.body.imageUrl) character.imageUrl = req.body.imageUrl;
    if (req.body.description) character.description = req.body.description;
    
    const updatedCharacter = await character.save();
    res.json(updatedCharacter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /characters/{id}:
 *   delete:
 *     summary: Eliminar un personaje
 *     tags: [Characters]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del personaje
 *     responses:
 *       200:
 *         description: Personaje eliminado
 *       404:
 *         description: Personaje no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    
    if (!character) {
      return res.status(404).json({ message: 'Personaje no encontrado' });
    }
    
    await character.deleteOne();
    res.json({ message: 'Personaje eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
