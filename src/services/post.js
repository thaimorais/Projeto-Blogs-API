const { Category, BlogPost, PostCategory } = require('../models');

const categoriesValidate = async (categoryIds) => {
  const promises = categoryIds.map((category) => Category.findByPk(category));

  const categories = await Promise.all(promises);
  const validate = categories.every((category) => category !== null);

  return validate;
};

const post = async (postReceive) => {
  const { categoryIds, title, content } = postReceive;

  if (!categoryIds || !title || !content) {
    return { type: 'BAD_REQUEST', message: 'Some required fields are missing' };
  }

  const verifyCategories = await categoriesValidate(categoryIds);

  if (!verifyCategories) {
    return { type: 'BAD_REQUEST', message: 'one or more "categoryIds" not found' };
  }

  const { dataValues } = await BlogPost.create({
    title, content, userId: 1, published: new Date(), updated: new Date(),
  });

  await PostCategory.bulkCreate(categoryIds.map((category) => ({
      postId: dataValues.id,
      categoryId: category,
    })));

  const categoryOk = await BlogPost.findByPk(dataValues.id);

  return { type: null, message: categoryOk };
};

module.exports = {
  post,
};