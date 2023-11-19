'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavoriteArticle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FavoriteArticle.belongsTo(models.Article,{
        foreignKey: "article_id", //自分
        targetKey: "id",  //相手側
        as:'FavoriteArticles',
      });
      FavoriteArticle.belongsTo(models.User,{
        foreignKey: "user_id", //自分
        targetKey: "id",  //相手側
        as:'FavoriteArticle_User',
      });
      
    }
  }
  FavoriteArticle.init({
    user_id: DataTypes.INTEGER,
    article_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FavoriteArticle',
  });
  return FavoriteArticle;
};