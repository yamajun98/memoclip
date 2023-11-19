'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ChatMain', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:'User',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      user_id2: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:'User',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      roomName: {
        type: Sequelize.STRING
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
    },
    {
        // ここで複合ユニークキーの情報を記載する
        // fields の部分に複合ユニークキーとして設定したいフィールドを含める
        // ２つ以上設定することも可
        uniqueKeys: {
            UsersWorkspacesIndex: {
                fields: ['user_id', 'user_id2']
            }
        }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ChatMain');
  }
};