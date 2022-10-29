const express = require('express');

const authToken = require('../middlewares/authtoken');
const { category } = require('../controllers/index');

const router = express.Router();

router.post('/categories', authToken, category.addNewCategory);

module.exports = router;
