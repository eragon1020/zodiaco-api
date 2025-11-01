const { Schema, model } = require('mongoose');

const CharacterSchema = new Schema({
  name: { type: String, required: true },
  cosmos: { type: Number, default: 0 },
  role: { type: String }
});

module.exports = model('Character', CharacterSchema);
