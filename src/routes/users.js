const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const passport = require('passport');

router.get('/register', userController.registerView);

router.post('/register', userController.registerUser);

router.get('/login', userController.loginView);

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), userController.login)

router.get('/logout', userController.logout);

module.exports = router;