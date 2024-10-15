const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class blogPosts extends Model {}

  blogPosts.init (
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    tableName: 'blogPosts',
    modelName: 'blogPosts'
  });
  
 module.exports = blogPosts;

