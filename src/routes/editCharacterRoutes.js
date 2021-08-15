const express = require('express');
const router = express.Router();
const editCharacterController = require('../controllers/editCharacterController');
const { isLoggedIn, isAuthor } = require('../middleware');

router.get('/edit/:id', isLoggedIn, isAuthor, editCharacterController.get);

router.delete('/edit/:id', isLoggedIn, isAuthor, editCharacterController.delete);

router.put('/edit/:id', isLoggedIn, isAuthor, editCharacterController.edit)

module.exports = router;