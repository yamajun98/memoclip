'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Tag, {
        through: models.UserTag,
        foreignKey: 'user_id',
        otherKey: 'tag_id',
        as:'UserTags',

      });
    
      User.belongsToMany(models.Article, {
        through: models.FavoriteArticle,
        foreignKey: 'user_id',
        otherKey: 'article_id',
        as:'User_FavoriteArticle',

      });

      User.hasMany(models.Article, {
        foreignKey: 'user_id',
        targetKey : 'id',
        as:'Articles',

      });

      User.hasMany(models.UserFollow,{
        foreignKey: "follower_id", //相手側
        targetKey: "id",  //自分
        as:'User_Follow',

      });

      User.hasMany(models.UserFollow,{
        foreignKey: "user_id", //相手側
        targetKey: "id",  //自分
        as:'User_Follower',

      });

      User.hasMany(models.ChatText,{
        foreignKey: "send_id", //相手側
        targetKey: "id",  //自分
        as:'chatText',

      });

      User.hasMany(models.ChatMain,{
        foreignKey: "user_id", //相手側
        targetKey: "id",  //自分
        as:'chatMain_user',

      });
      User.hasMany(models.ChatMain,{
        foreignKey: "user_id2", //相手側
        targetKey: "id",  //自分
        as:'chatMain_user2',

      });

    }
  }
  User.init({
    name: DataTypes.STRING,
    userId:DataTypes.STRING,
    password:DataTypes.STRING,
    image:DataTypes.STRING,
    introduction:DataTypes.STRING,
    sex:DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    admin_flag: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};