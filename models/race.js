const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RaceSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Race', RaceSchema);