const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    name: String,
    subclasses: []
});

module.exports = mongoose.model('Class', ClassSchema);