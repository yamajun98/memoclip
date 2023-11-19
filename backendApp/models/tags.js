'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tag.belongsToMany(models.Article, {
        through: models.ArticleTag,
        foreignKey: 'tag_id',
        otherKey: 'article_id',
        as:'Tag_Article'
      });
    }
  }
  Tag.init({
    name: DataTypes.STRING,
    image:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};

