'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      userId:{
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      password:{
        allowNull: false,
        type: Sequelize.STRING
      },
      image:{
        type: Sequelize.STRING
      },
      introduction:{
        type: Sequelize.STRING
      },
      sex:{
        type: Sequelize.INTEGER
      },
      age: {
        type: Sequelize.INTEGER
      },
      admin_flag: {
        defaultValue:false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.fn('now')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  }
};


