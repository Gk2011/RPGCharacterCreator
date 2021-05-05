const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpellSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Spell', SpellSchema);