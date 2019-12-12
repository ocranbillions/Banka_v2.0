'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    accountNumber: {
      type: DataTypes.BIGINT,
      unique: true,
      allowNull: false,
    },
    accountOwner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountType: {
      type: DataTypes.ENUM('savings', 'current'),
      allowNull: false,
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('draft', 'active', 'dormant'),
      defaultValue: 'draft',
      allowNull: false,
    },
  }, {});
  Account.associate = function(models) {
    // associations can be defined here
  };
  return Account;
};
