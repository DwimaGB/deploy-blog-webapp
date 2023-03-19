
const mongoose = require('mongoose');

const UsernameAlreadyExistsError = require('../utils/classes/usernameAlreadyExistsError')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('validate', async function(next){
    try{
        const foundUser = await this.constructor.findOne({username: this.username});

        if(foundUser){
            const err = new UsernameAlreadyExistsError('Username Already Exists!');
            next(err);
        } 
        next(); 
    }
    catch(e){
        next(e);
    }
})

module.exports = mongoose.model('User', userSchema);