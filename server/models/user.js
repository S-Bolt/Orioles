const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');


class User extends Model {}

User.init(
  {
    // Define model attributes
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user', 
    },
    profilePictureUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize, 
    modelName: 'User', 
    tableName: 'users',
    timestamps: false, 
  }
);


module.exports = User;
