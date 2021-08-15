const express = require('express');
const router = express.Router();
const viewCharactersController = require('../controllers/viewCharacterController');
const { isLoggedIn, isAuthor} = require('../middleware');


router.get('/view/:id', viewCharactersController.get);

router.get('/PDF/:id', viewCharactersController.pdf);



module.exports = router;