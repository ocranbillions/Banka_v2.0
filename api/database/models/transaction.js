'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    accountNumber: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
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
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};


// accountNumber BIGINT REFERENCES accounts(accountNumber) ON DELETE CASCADE,