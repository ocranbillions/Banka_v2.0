'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Transactions',
      [
        {
          accountNumber: 4194194410,
          amount: 25410.00,
          type: 'credit',
          cashier: 2,
          oldBalance: 214410.20,
          newBalance: 2111.20,
          accountEmail: 'joe@gmail.com'
        },
        {
          accountNumber: 9852136521,
          amount: 12000.20,
          type: 'credit',
          cashier: 2,
          oldBalance: 1000.20,
          newBalance: 13000.20,
          accountEmail: 'samo@gmail.com'
        },
        {
          accountNumber: 9852136521,
          amount: 20000.20,
          type: 'credit',
          cashier: 2,
          oldBalance: 13000.20,
          newBalance: 23000.20,
          accountEmail: 'samo@gmail.com'
        },
        {
          accountNumber: 4194194410,
          amount: 15000.20,
          type: 'credit',
          cashier: 2,
          oldBalance: 10200.20,
          newBalance: 12000.20,
          accountEmail: 'joe@gmail.com'
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Transactions', null, {});
  }
};
