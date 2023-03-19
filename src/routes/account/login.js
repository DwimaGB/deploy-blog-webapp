
const express = require('express');
const router = express.Router();

const login = require('../../controllers/account/login');


const passport = require('passport');
const {redirectUser} = require('../../middlewares/redirect-user');

router.use(redirectUser);

router.route('/')
    .get(login.renderPage)
    .post(passport.authenticate('local', ({
        failureFlash: true,
        failureRedirect: '/auth/login'
    })), login.redirectHome)
 

module.exports = router;