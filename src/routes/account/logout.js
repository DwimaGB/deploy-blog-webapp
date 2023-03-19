
const express = require('express');
const router = express.Router();

const logout = require('../../controllers/account/logout')

router.post('/', logout);

module.exports = router;