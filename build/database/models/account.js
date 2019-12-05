'use strict';

module.exports = function (sequelize, DataTypes) {
  var Account = sequelize.define('Account', {
    accountNumber: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
    },
    ownerEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  Account.associate = function (models) {// associations can be defined here
  };

  return Account;
};