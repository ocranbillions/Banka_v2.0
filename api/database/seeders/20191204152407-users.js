'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',
    [
      {
        firstName: 'Mike',
        lastName: 'Jones',
        email: 'mikejones@gmail.com',
        type: 'staff',
        isAdmin: true,
        password: '$2b$10$xjROlDMHpsTydHjouVZDCuPsTlalFeqbcBku6Zy1qy9uvDkewa6va'
      },
      {
        firstName: 'Samuel',
        lastName: 'Ocran',
        email: 'samo@gmail.com',
        type: 'staff',
        isAdmin: false,
        password: '$2b$10$iKtnb658ePsLlpbAUVGEb.EsSbv/8aateaYMaa4xV.9qe4xSIwjWS'
      },
      {
        firstName: 'Joseph',
        lastName: 'Lee',
        email: 'joe@gmail.com',
        type: 'client',
        isAdmin: false,
        password: '$2b$10$eOtw6v7L2grdqd6ES0SNmeETCsTSPEJRWtu2k4RRfMaMJ2XcrGQYW'
      },
      {
        firstName: 'Tunji',
        lastName: 'Balogun',
        email: 'teejay@gmail.com',
        type: 'client',
        isAdmin: false,
        password: 'somerandompassword'
      },
      {
        firstName: 'Edward',
        lastName: 'Ola',
        email: 'edd@yahoo.com',
        type: 'client',
        isAdmin: false,
        password: 'somerandompassword'
      },
      {
        firstName: 'test',
        lastName: 'user',
        email: 'test@yahoo.com',
        type: 'client',
        isAdmin: false,
        password: 'somerandompassword'
      }
    ], {});
    
  },

// ADMIN mikejones@gmail.com password = somesecret 
// STAFF samo@gmail.com password = mysecret
// CLIENT joe@gmail.com = joeboy123

  down: (queryInterface, Sequelize) => {
  
    return queryInterface.bulkDelete('Users', null, {});

  }
};
