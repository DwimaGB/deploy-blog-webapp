
const express = require('express');
const router = express.Router();

const user = require('../controllers/user');

router.get('/:user', user.userArticles)

module.exports = router;