'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    type: {
      type: DataTypes.ENUM('admin', 'staff', 'client'),
      defaultValue: 'client',
    },
    isAdmin: {
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};