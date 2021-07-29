const express = require('express');
const router = express.Router();
const viewCharactersController = require('../controllers/viewAllCharactersController');
const { isLoggedIn, isAuthor} = require('../middleware');

router.get('/characters', isLoggedIn, viewCharactersController.getNew);


//router.get('/characters', isLoggedIn, viewCharactersController.get);

module.exports = router;