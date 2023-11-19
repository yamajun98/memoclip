'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ChatText', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chat_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:'ChatMain',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      text: {
        allowNull: false,
        type: Sequelize.STRING
      },
      send_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:'User',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      read: {
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
    await queryInterface.dropTable('ChatText');
  }
};