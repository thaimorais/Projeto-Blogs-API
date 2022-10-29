const express = require('express');

const authToken = require('../middlewares/authtoken');
const { post } = require('../controllers');

const router = express.Router();

router.post('/post', authToken, post.createPost);

module.exports = router;
