
const express = require('express');
const router = express.Router();

const passport = require('passport');
const {redirectUser} = require('../../middlewares/redirect-user');

router.use(redirectUser);

router.get('/', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/callback', passport.authenticate('google', {failureRedirect: '/auth/login', successRedirect: '/'}));

module.exports = router;