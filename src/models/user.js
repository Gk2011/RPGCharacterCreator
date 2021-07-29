const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const character = require('./character');

const UserSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    characters: [{type: Schema.Types.ObjectId,
                ref: 'character'}]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);