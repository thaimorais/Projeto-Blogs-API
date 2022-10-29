const { category } = require('../services');

const addNewCategory = async (req, res) => {
  const { body } = req;

  const { type, message } = await category.addNewCategory(body);

  if (type === 'BAD_REQUEST') return res.status(400).json({ message });
  return res.status(201).json(message);
};

const getCategories = async (_req, res) => {
  const result = await category.getCategories();

  return res.status(200).json(result);
};

module.exports = {
  addNewCategory,
  getCategories,
};