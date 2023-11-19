'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatText extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ChatText.belongsTo(models.ChatMain,{
        foreignKey: "chat_id", //自分
        targetKey: "id",  //相手側
        as:'Chat'
      });
      ChatText.belongsTo(models.User,{
        foreignKey: "send_id", //自分
        targetKey: "id",  //相手側
        as:'user'
      });
    }
  }
  ChatText.init({
    chat_id: DataTypes.INTEGER,
    text: DataTypes.STRING,
    send_id: DataTypes.INTEGER,
    read: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ChatText',
  });
  return ChatText;
};