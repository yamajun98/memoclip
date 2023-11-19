'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatMain extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ChatMain.belongsTo(models.User,{
        foreignKey: "user_id", //自分
        targetKey: "id",  //相手側
        as:'Users'
      });
      ChatMain.belongsTo(models.User,{
        foreignKey: "user_id2", //自分
        targetKey: "id",  //相手側
        as:'User2'
      });
      ChatMain.hasMany(models.ChatText, {
        foreignKey: 'id',
        targetKey : 'chat_id',
        as:'ChatText'
      });
    }
  }
  
  ChatMain.init({
    user_id: DataTypes.INTEGER,
    user_id2: DataTypes.INTEGER,
    roomName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ChatMain',
  });
  return ChatMain;
};