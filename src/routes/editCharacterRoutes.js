const express = require('express');

const Character = require('../models/character');

const router = express.Router();

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const character = await Character.findById(id);
    res.render('characters/edit', { character });
});

router.delete('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const character = await Character.findByIdAndDelete(id);
    console.log(character);
    res.redirect('/index');
});

router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const character = await Character.findByIdAndUpdate(id, { ...req.body.character});
    console.log(character)
    res.redirect(`/view/${ id }`);
})

module.exports = router;