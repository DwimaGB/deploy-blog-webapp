

const User = require('../../models/user');

module.exports.renderPage = (req, res)=>{
    const err = req.flash('error')[0];

    res.render('account/signup', {errorMessage: err});
}

module.exports.handleSignUp = async(req, res, next)=>{
    try{
        const user = await User.create({name: req.body.name, username: req.body.username, password: req.body.password});

        res.redirect('/auth/login');
    }
    catch(e){

        next(e);
    }
}
