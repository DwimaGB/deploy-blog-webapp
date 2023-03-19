
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const bcrypt = require('bcrypt');
const User = require('../models/user');
const GoogleUser = require('../models/google-user');

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username });

        if (!user) {
            return done(null, false, { message: "Invalid Credentials!" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
            user.strategy = 'local';
            return done(null, user);
        }

        done(null, false, { message: "Invalid Credentials!" })
    }
    catch (e) {
        done(e);
    }
}))

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "https://127.0.0.1:3000/auth/google/callback",
}, (accessToken, refreshToken, user, done) => {
    // console.log(accessToken);
    // console.log(user);
    user.strategy = 'google';
    done(null, user);
}))

passport.serializeUser((user, done) => {
    if (user.strategy === 'local') {
        done(null, { id: user.id, strategy: user.strategy });
    }
    else if (user.strategy === 'google') {
        done(null, { sub: user.id, name: user.displayName, email: user.emails[0].value, strategy: user.strategy });
    }
})


passport.deserializeUser(async (user, done) => {
    try {
        if (user.strategy === 'local') {
            const foundUser = await User.findById(user.id);

            if (!foundUser) {
                return done(null, false);
            }
            done(null, foundUser);
        }
        else if(user.strategy === 'google'){
            const foundUser = await GoogleUser.findOne({sub: user.sub});
            if(foundUser){
                return done(null, foundUser);
            }
            const newUser = await GoogleUser.create({sub: user.sub, name: user.name, email: user.email, provider: user.strategy});

            done(null, newUser);
        }

    }
    catch (e) {
        done(e);
    }
})

module.exports = passport;