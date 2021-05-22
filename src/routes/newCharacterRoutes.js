const express = require('express');
const Class = require('../models/class');
const Race = require('../models/race');
// const Spell = require('../models/spell');
// const character = require('../models/character');
const AbilityScore = require('../models/ability-scores');
const Character = require('../models/character');

//const chracter =  

const router = express.Router();

router.get('/new/raceinfo', async (req, res) => {
    const raceSelected = req.header('raceSelected');
    const raceInfo = await Race.find({name: raceSelected});
    // console.log(raceInfo);
    res.send(raceInfo);
});

router.get('/new', async (req, res) => {
    const raceOptions = await Race.find({});
    const classOptions = await Class.find({});
    const abilites = await AbilityScore.find({});
    res.render('characters/new', { raceOptions, classOptions,  abilites});
});

router.post('/new', async (req, res) => {
    const character = new Character(req.body.character);
    console.log(character.name);
    await character.save();
    res.redirect('/index');
});



module.exports = router;