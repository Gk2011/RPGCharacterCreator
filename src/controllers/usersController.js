const catchAsync = require('../util/catchAsync');
const User = require('../models/user');

// Render view
module.exports.registerView = catchAsync(async(req, res) => {
    res.render('users/register');
});

// Register user, error flash if error
module.exports.registerUser = catchAsync(async (req, res, next) => {
    try {
        const {email, username, password} = req.body;

        if (await User.exists({email: email})){
            throw new Error('Email already in use.')
        };

        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, e => {
            if (e) return next(e);
            req.flash('success', 'Welcome to RPG Character Creator');
            res.redirect('/index');
        });

    } catch(e){
            req.flash('error', e.message);
            res.redirect('/register')
        }
});

// Render login view
module.exports.loginView = catchAsync(async (req, res) => {
    res.render('users/login');
})

// Login user
module.exports.login = catchAsync(async (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/index';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})

// logout user
module.exports.logout = catchAsync(async (req, res) => {
    req.logout();
    req.flash('success', "You have succsefully logged out");
    res.redirect('/index');
})