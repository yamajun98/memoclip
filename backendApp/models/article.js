'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Article.belongsToMany(models.Tag, {
        through: models.ArticleTag,
        foreignKey: 'article_id',
        otherKey: 'tag_id',
        as:'Tags',
      });

      Article.belongsToMany(models.User, {
        through: models.FavoriteArticle,
        foreignKey: 'article_id',
        otherKey: 'user_id',
        as:'favoriteArticle_article',

      });

      Article.belongsTo(models.User,{
        foreignKey: "user_id", //自分
        targetKey: "id",  //相手側
        as:'Users'
      });

      Article.hasMany(models.FavoriteArticle,{
        foreignKey: "id", //自分
        targetKey: "article_id",  //相手側
        as:'FavoriteArticles',

      });
    }
  }
  Article.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    image:DataTypes.STRING,
    status: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Article',
  });
  // Article.sync(); 勝手にテーブル作ろうと
  return Article;
};
