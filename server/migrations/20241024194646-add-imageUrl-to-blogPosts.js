'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('blogPosts', 'imageUrl', {
      type: Sequelize.STRING,
      allowNull: true, 
      defaultValue: null,
      after: 'content', 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('blogPosts', 'imageUrl');
  }
};
