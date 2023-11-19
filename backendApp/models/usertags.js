'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserTag.belongsTo(models.Tag,{
        foreignKey: "tag_id", //自分
        targetKey: "id",  //相手側
        as:'Tags1'
      });
    }
  }
  UserTag.init({
    user_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserTag',
  });
  return UserTag;
};