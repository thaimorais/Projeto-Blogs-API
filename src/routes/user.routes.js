const express = require('express');

const authToken = require('../middlewares/authtoken');
const { user } = require('../controllers');

const router = express.Router();

router.post('/login', user.login);
router.post('/user', user.newUser);
router.get('/user', authToken, user.getUsers);

module.exports = router;
