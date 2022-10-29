module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  },
  {
    underscored: true,
    tableName: 'posts_categories',
    timestamps: false,
  });

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      foreignKey: 'categoryId',
      as: 'categories',
      through: PostCategory,
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: 'postId',
      as: 'posts',
      through: PostCategory,
      otherKey: 'categoryId',
    });
  };

  return PostCategory;
};