const express = require('express');
const newCharacterController = require('../controllers/newCharacterController');
const { isLoggedIn } = require('../middleware');
const router = express.Router();

router.get('/new/ajax', isLoggedIn, newCharacterController.ajaxRequest);

router.get('/new', isLoggedIn, newCharacterController.view);

router.post('/new', isLoggedIn, newCharacterController.addCharacter);



module.exports = router;