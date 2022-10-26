const express = require('express');

const { user } = require('../controllers');

const router = express.Router();

router.post('/login', user.login);

module.exports = router;