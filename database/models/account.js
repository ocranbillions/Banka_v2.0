/* eslint-disable func-names */
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    accountNumber: {
      type: DataTypes.STRING,
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
  Account.associate = function (models) {
    Account.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Account;
};
