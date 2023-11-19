'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArticleTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ArticleTag.belongsTo(models.Article,{
        foreignKey: "article_id", //自分
        targetKey: "id",  //相手側
        as:'Article_tag'
      });
    }
  }
  ArticleTag.init({
    article_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ArticleTag',
  });
  return ArticleTag;
};