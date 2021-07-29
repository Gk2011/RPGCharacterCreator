const Character = require('../models/character');
const AbilityScore = require('../models/ability-scores');
const catchAsync = require('../util/catchAsync');
const User = require('../models/user');


module.exports.get = catchAsync(async (req, res) => {
    const { id } = req.params;
    const character = await Character.findById(id).populate('author');
    //console.log(character);
    if(!character){
        req.flash('error', 'Character not found!');
        return res.redirect('/index');
    }
    const abilityScores = await AbilityScore.find({});
    
    res.render('characters/view', { character, abilityScores });
});

