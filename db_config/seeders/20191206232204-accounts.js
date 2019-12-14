'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Accounts',
      [
        {
          userId: 3,
          accountNumber: '4194194410',
          accountOwner: 'joe@gmail.com',
          accountType: 'current',
          balance: 500000.10,
          status: 'active',
        },
        {
          userId: 2,
          accountNumber: '9852136521',
          accountOwner: 'samo@gmail.com',
          accountType: 'savings',
          balance: 1000.00,
          status: 'dormant',
        },
        {
          userId: 1,
          accountNumber: '5421214520',
          accountOwner: 'mikejones@gmail.com',
          accountType: 'savings',
          balance: 45000.50,
          status: 'active',
        },
        {
          userId: 3,
          accountNumber: '1212452132',
          accountOwner: 'joe@gmail.com',
          accountType: 'savings',
          balance: 30000.10,
          status: 'dormant',
        },
        {
          userId: 2,
          accountNumber: '3301123235',
          accountOwner: 'samo@gmail.com',
          accountType: 'savings',
          balance: 50000.10,
          status: 'active',
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Accounts', null, {});
  }
};
