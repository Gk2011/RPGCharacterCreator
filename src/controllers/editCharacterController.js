const Character = require('../models/character');
const catchAsync = require('../util/catchAsync');
const User = require('../models/user');

const Class = require('../models/class');
const Race = require('../models/race');
const AbilityScore = require('../models/ability-scores');

const Background = require('../models/background');
const Level = require('../models/level');


// Get Character and render View
module.exports.get = catchAsync(async (req, res) => {
    const { id } = req.params;
    const character = await Character.findById(id);
    const raceOptions = await Race.find({});
    const classOptions = await Class.find({});
    const abilites = await AbilityScore.find({});
    const backgrounds = await Background.find({});
    const charRace = await Race.findOne({index: character.race.index});
    if(!character){
        req.flash('error', 'Character not found!');
        return res.redirect('/index');
    }
    res.render('characters/edit', { character, charRace, raceOptions, classOptions, abilites, backgrounds });
});

// Delete Character
module.exports.delete = catchAsync(async (req, res) => {
    const { id } = req.params;
    const character = await Character.findByIdAndDelete(id);
    const user = await User.findById(req.user._id);

    await user.characters.pull(id);
    user.save();

    req.flash('success', 'Successfully Deleted Character');
    res.redirect('/index');
});

// Edit/save Character data 
module.exports.edit =  catchAsync(async (req, res) => {
    const { id } = req.params;
    const {name, str, int, con, dex, cha, wis, race, playerClass, background, level, options, share} = req.body;
    //const character = await Character.findByIdAndUpdate(id, { ...req.body.character});
    const character = await Character.findById(id);
    if(!character){
        req.flash('error', 'Character not found!');
        return res.redirect('/index');
    };
    
    
    
    // Get database info
    const charClass = await Class.findOne({name: playerClass});
    const charRace = await Race.findOne({name: race});

    const charLevel = await Level.find({index: `${charClass.index}-${level}`});
    const charBackground = await Background.findOne({name: background});


    // Create Refrence data
    const levelREF = {index: charLevel[0].index, url: charLevel[0].url};
    const raceREF = {index: charRace.index, name: charRace.name, url: charRace.url};
    const classREF = {index: charClass.index, name: charClass.name, url: charClass.url};
    const backgroundREF = {index: charBackground.index, name: charBackground.name, url: charBackground.url};


    // Set data
    character.name = name;
    character.abilityScores[0].score = str;
    character.abilityScores[1].score = int;
    character.abilityScores[2].score = dex;

    character.abilityScores[3].score = con;
    character.abilityScores[4].score = cha;
    character.abilityScores[5].score = wis;


    if (share == 'on' ){
        character.share = true;
    }else{
        character.share = false;
    }
    

    character.race = raceREF;
    character.class = classREF;
    character.background = backgroundREF;
    character.level[0] = ({class: levelREF, level: level});
    character.generation = options;

    await character.save();
    req.flash('success', 'Successfully updated Character');
    res.redirect(`/view/${ id }`);
});