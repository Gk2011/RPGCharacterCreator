const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    name: String,
    race: String,
    class: String,
    subclass: String,
    level: Number,
    abilityScores: []
});

module.exports = mongoose.model('Character', CharacterSchema);