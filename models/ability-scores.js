const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AbilityScoreSchema = new Schema({
    name: String,
});

module.exports = mongoose.model('ability-score', AbilityScoreSchema);