
const mongoose = require('mongoose');

const googleUserSchema = new mongoose.Schema({
    sub: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique : true,
    },
    email: {
        type: String,
        required: true,
    },
    provider : {
        type: String,
    }
});

googleUserSchema.pre('validate', function(next){
    const username = this.email.split('@')[0];
    this.username = username;

    next();
});

module.exports = mongoose.model('GoogleUser', googleUserSchema);