
const express = require('express');
const router = express.Router();

const index = require('../controllers/index');

router.get('/', index.renderPage);

// router.get('/')

module.exports = router;