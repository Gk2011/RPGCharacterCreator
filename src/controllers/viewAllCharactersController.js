const catchAsync = require('../util/catchAsync');
const User = require('../models/user');
const Character = require('../models/character');

// Index Route
// module.exports.get = catchAsync(async (req, res) => {
//     const characters = await Character.find({});
//     res.render('characters/index', { characters });
//     });


// View all characters for logged in user
module.exports.get = catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
    const userCharacters = user.characters.toObject();
    const characters = [];
    
    for(x in userCharacters){
        const findChar = await Character.findById(userCharacters[x]);
        characters.push(findChar);
    }
    res.render('characters/playerCharacters', { characters });
});