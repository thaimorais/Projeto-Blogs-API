const { category } = require('../services');

const addNewCategory = async (req, res) => {
  const { body } = req;

  const { type, message } = await category.addNewCategory(body);

  if (type === 'BAD_REQUEST') return res.status(400).json({ message });
  return res.status(201).json(message);
};

module.exports = {
  addNewCategory,
};