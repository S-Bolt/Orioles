const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class BlogPosts extends Model {}

  BlogPosts.init (
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
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: false,
    modelName: 'BlogPosts',
    tableName: 'blogPosts',

    
  });


  
 module.exports = BlogPosts;

