const express = require('express');
const router = express.Router();
const Character = require('../models/Character');

/**
 * @openapi
 * /characters:
 *   get:
 *     summary: Obtener todos los personajes
 *     responses:
 *       200:
 *         description: Lista de personajes
 */
router.get('/', async (req, res) => {
  const items = await Character.find();
  res.json(items);
});

router.post('/', async (req, res) => {
  const c = new Character(req.body);
  await c.save();
  res.status(201).json(c);
});

module.exports = router;
