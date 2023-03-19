
const User = require('../models/user');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async(req, res, next)=>{
    try{
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        req.body.password = hashedPassword;
        next();
    }
    catch(e){
        console.log(e);
        res.status(500).json({error: e.message});
    }
}   


const isAuthorized = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/auth/login');
}


module.exports = {hashPassword, isAuthorized};