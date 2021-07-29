const catchAsync = require('../util/catchAsync');
const User = require('../models/user');
const Character = require('../models/character');
const character = require('../models/character');

module.exports.get = catchAsync(async (req, res) => {
    const characters = await Character.find({});
    res.render('characters/index', { characters });
    });



module.exports.getNew = catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
    const userCharacters = user.characters.toObject();
    //console.log(user);
    //console.log(userCharacters);
    const characters = [];
    
    for(x in userCharacters){
        const findChar = await Character.findById(userCharacters[x]);
        //console.log(findChar);

        characters.push(findChar);
    }
    //console.log(characters);
    res.render('characters/playerCharacters', { characters });


});