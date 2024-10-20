'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('comments', [
      {
        content: 'Great post!',
        userId: 1,  // Existing user ID from your table
        postId: 1,  // Ensure this post ID exists
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Very informative.',
        userId: 2,  // Existing user ID
        postId: 1,  // Ensure this post ID exists
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('comments', null, {});
  }
};
