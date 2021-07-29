const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    name: String,
    race: {type: String, default: ''},
    class: {type: String, default: ''},
    subclass: {type: String, default: ''},
    level: {type: Number, default: 1},
    abilityScores: [],
    share: {type: Boolean, default: false},
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Character', CharacterSchema);