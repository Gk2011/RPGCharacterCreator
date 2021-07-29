const Class = require('../models/class');
const Race = require('../models/race');
const AbilityScore = require('../models/ability-scores');
const Character = require('../models/character');
const catchAsync = require('../util/catchAsync');
const User = require('../models/user');

module.exports.ajaxRequest = catchAsync(async (req, res) => {
    const requestTag = req.header('requestInfo');

    const value = req.header('requestValue');
    //console.log(value);
    if (requestTag == 'race'){
        const raceInfo = await Race.find({name: value});
        console.log(raceInfo);
        res.send(raceInfo);
    } else if (requestTag == 'class') {
        const classInfo = await Class.find({name: value});
        
        res.send(classInfo);
    };
});

module.exports.view = catchAsync(async (req, res) => {
    const raceOptions = await Race.find({});
    const classOptions = await Class.find({});
    const abilites = await AbilityScore.find({});
    res.render('characters/new', { raceOptions, classOptions,  abilites});
});

module.exports.addCharacter = catchAsync(async (req, res) => {
    const character = new Character(req.body.character);
    console.log(character);
    const user = await User.findById(req.user._id);
    character.author = req.user._id;
    
    //console.log(character);
    //console.log()
    //await character.save();
    //await user.characters.push(character)
    //await user.save();
    //console.log(user.characters);
    req.flash('success', 'Successfully made a new Character!');
    res.redirect('/index');
});