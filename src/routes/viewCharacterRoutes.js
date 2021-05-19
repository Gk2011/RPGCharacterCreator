const express = require('express');
const router = express.Router();
const Character = require('../models/character');
const AbilityScore = require('../models/ability-scores');

router.get('/view/:id', async (req, res) => {
    const { id } = req.params;
    const character = await Character.findById(id)
    const abilityScores = await AbilityScore.find({});
    
    res.render('characters/view', { character, abilityScores });
});

module.exports = router;