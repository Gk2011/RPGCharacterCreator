const express = require('express');
const Class = require('../models/class');
const Race = require('../models/race');
// const Spell = require('../models/spell');
// const character = require('../models/character');
const AbilityScore = require('../models/ability-scores');
const Character = require('../models/character');

//const chracter =  

const router = express.Router();

router.get('/new/ajax', async (req, res) => {
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