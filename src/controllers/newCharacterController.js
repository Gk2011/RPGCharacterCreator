const catchAsync = require('../util/catchAsync');

const Class = require('../models/class');
const Race = require('../models/race');
const AbilityScore = require('../models/ability-scores');
const Character = require('../models/character');
const User = require('../models/user');
const Background = require('../models/background');
const Level = require('../models/level');

// Respond to ajax requests with corresponding data
module.exports.ajaxRequest = catchAsync(async (req, res) => {
    const requestTag = req.header('requestInfo');
    const value = req.header('requestValue');
    if (requestTag == 'race'){
        const raceInfo = await Race.find({name: value});
        res.send(raceInfo);
    } else if (requestTag == 'class') {
        const classInfo = await Class.find({name: value});
        res.send(classInfo);
    };
});

// Render new character view, inject database data into view
module.exports.view = catchAsync(async (req, res) => {
    const raceOptions = await Race.find({});
    const classOptions = await Class.find({});
    const abilites = await AbilityScore.find({});
    const backgrounds = await Background.find({});
    res.render('characters/new', { raceOptions, classOptions,  abilites, backgrounds});
});

// Create character and save to database, associate character with user model 
module.exports.addCharacter = catchAsync(async (req, res) => {
    // View data
    const {str, int, con, dex, cha, wis, race, playerClass, background, level, options, share} = req.body;
    //console.log(standardArray, pointBuy)
    // Get database info from variables



    const charClass = await Class.findOne({name: playerClass});
    const charRace = await Race.findOne({name: race});
    const charBackground = await Background.findOne({name: background});
    const charLevel = await Level.find({index: `${charClass.index}-${level}`});

    // Create character and set author field to user object id
    const character = new Character(req.body.character);
    const user = await User.findById(req.user._id);
    character.author = req.user._id;

    // Need to revist, manually create refrences for character model
    const levelREF = {index: charLevel[0].index, url: charLevel[0].url};
    const raceREF = {index: charRace.index, name: charRace.name, url: charRace.url};
    const classREF = {index: charClass.index, name: charClass.name, url: charClass.url};
    const backgroundREF = {index: charBackground.index, name: charBackground.name, url: charBackground.url};


    const strREF = {index:'str', name:'STR',url:'/api/ability-scores/str'};
    const intREF = {index:'int', name:'INT',url:'/api/ability-scores/int'}
    const dexREF = {index:'dex', name:'DEX',url:'/api/ability-scores/dex'}

    const conREF = {index:'con', name:'CON',url:'/api/ability-scores/con'}
    const chaREF = {index:'cha', name:'CHA',url:'/api/ability-scores/cha'}
    const wisREF = {index:'wis', name:'WIS',url:'/api/ability-scores/wis'}

    if (options){
        character.generation = options;
    };

    if (share == 'on' ){
        character.share = true;
    };
    
    // Set character data to refrence data
    character.race = raceREF;
    character.class = classREF;
    character.background = backgroundREF;
    character.level.push({class: levelREF, level: level});

    character.abilityScores.push({ability_score: strREF, score: str});
    character.abilityScores.push({ability_score: intREF, score: int});
    character.abilityScores.push({ability_score: dexREF, score: dex});

    character.abilityScores.push({ability_score: conREF, score: con});
    character.abilityScores.push({ability_score: chaREF, score: cha});
    character.abilityScores.push({ability_score: wisREF, score: wis});

    
    // Save character, add user character to user account
    await character.save();
    await user.characters.push(character)
    await user.save();
    console.log(character._id);
    req.flash('success', 'Successfully made a new Character!');
    res.redirect(`view/${character._id}`);
});