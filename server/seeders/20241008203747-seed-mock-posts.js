'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('blogPosts', [
      {
        title: 'The Orioles Soar to Victory!',
        content: 'The Orioles have had an amazing season this year, surpassing all expectations...',
        created_at: new Date(),
      },
      {
        title: 'Top 10 Orioles Players of All Time',
        content: 'In this post, we will look at the top 10 players in the history of the Baltimore Orioles...',
        created_at: new Date(),
      },
      {
        title: 'A Deep Dive Into Orioles’ Winning Strategy',
        content: 'The Orioles have developed an interesting strategy over the past few years that has led them to great success...',
        created_at: new Date(),
      },
      {
        title: 'Best Orioles Moments from the Past Decade',
        content: 'The past decade has given us some unforgettable moments in Orioles history. Here are the top moments...',
        created_at: new Date(),
      },
      {
        title: 'Orioles Fan Community: A Supportive Network',
        content: 'Being an Orioles fan means being part of a great community. In this post, we explore the fanbase and how it contributes to the team’s success...',
        created_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('blogPosts', null, {});
  },
};
