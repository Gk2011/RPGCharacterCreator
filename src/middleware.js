const catchAsync = require('./util/catchAsync');
const Character = require('./models/character');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in');
        return res.redirect('/login');
    }
    next();
};

module.exports.isAuthor = async(req, res, next) => {
    const { id } = req.params;
    const character = await Character.findById(id);
    if (!character.author.equals(req.user._id)){
        req.flash('error', 'access denied');
        return res.redirect(`/view/${ id }`)
    }
    next();
};