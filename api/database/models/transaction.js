'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    accountNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cashier: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    oldBalance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    newBalance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    accountEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};


// accountNumber BIGINT REFERENCES accounts(accountNumber) ON DELETE CASCADE,