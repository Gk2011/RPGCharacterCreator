const Character = require('../models/character');
const AbilityScore = require('../models/ability-scores');
const catchAsync = require('../util/catchAsync');
const { dnd5E } = require('../services/pdfService/dnd-5e');

// Render character view
module.exports.get = catchAsync(async (req, res) => {
    const { id } = req.params;
    const character = await Character.findById(id).populate('author');
    if(!character){
        req.flash('error', 'Character not found!');
        return res.redirect('/index');
    }
    const abilityScores = await AbilityScore.find({});
    
    res.render('characters/view', { character, abilityScores });
});

// Call PDF for character
module.exports.pdf = catchAsync(async(req, res) => {
    const { id } = req.params;
    const character = await Character.findById(id);

    if(!character){
        req.flash('error', 'Character not found!');
        return res.redirect('/index');
    }

    dnd5E(character).then(function(pdfBuffer) {
		res.status(200);
		res.type('pdf');
		res.send(pdfBuffer);
	}).catch(function (err) {
		res.status(500);
		res.send(err.message);
	});
});


