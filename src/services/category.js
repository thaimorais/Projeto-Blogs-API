const { Category } = require('../models');

const addNewCategory = async (body) => { 
  if (!body.name) {
    return { type: 'BAD_REQUEST', message: '"name" is required' };
  }

  const { dataValues } = await Category.create(body);
  const createdCategory = await Category.findOne({
    where: { id: dataValues.id },
  });

  return { type: null, message: createdCategory };
};

const getCategories = async () => {
  const result = await Category.findAll();

  return result;
};

module.exports = {
  addNewCategory,
  getCategories,
};