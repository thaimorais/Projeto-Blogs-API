const express = require('express');

const authToken = require('../middlewares/authtoken');
const { category } = require('../controllers/index');

const router = express.Router();

router.post('/categories', authToken, category.addNewCategory);
router.get('/categories', authToken, category.getCategories);

module.exports = router;
