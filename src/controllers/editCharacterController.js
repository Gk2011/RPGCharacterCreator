const Character = require('../models/character');
const catchAsync = require('../util/catchAsync');
const User = require('../models/user');


module.exports.get = catchAsync(async (req, res) => {
    const { id } = req.params;
    const character = await Character.findById(id);
    if(!character){
        req.flash('error', 'Character not found!');
        return res.redirect('/index');
    }
    res.render('characters/edit', { character });
});

module.exports.delete = catchAsync(async (req, res) => {
    const { id } = req.params;
    const character = await Character.findByIdAndDelete(id);
    const user = await User.findById(req.user._id);
    console.log(user);
    await user.characters.pull(id);
    user.save();
    console.log(user);
    req.flash('success', 'Successfully Deleted Character');
    res.redirect('/index');
});

module.exports.edit =  catchAsync(async (req, res) => {
    const { id } = req.params;
    const character = await Character.findByIdAndUpdate(id, { ...req.body.character});
    req.flash('success', 'Successfully updated Character');
    res.redirect(`/view/${ id }`);
});