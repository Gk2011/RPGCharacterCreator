const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// APIRefrence used to store refrence data for other schemas 
const { APIReference } = require('./common');

// Store ability score info
const characterAbilityScore = new Schema({
    _id: false,
    ability_score: APIReference,
    score: Number,
});

const characterLevel = new Schema({
    _id: false,
    class: APIReference,
    level: Number,
})


const CharacterSchema = new Schema({
    name: String,
    race: APIReference,
    class: APIReference,
    subclass: APIReference,
    level: [characterLevel],
    abilityScores: [characterAbilityScore],
    background: APIReference,
    share: {type: Boolean, default: false},
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Character', CharacterSchema);