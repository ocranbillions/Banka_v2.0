import moment from 'moment';

const date = moment(new Date());
const createUserTable = `
  DROP TABLE IF EXISTS users cascade;

  CREATE TABLE IF NOT EXISTS
  users(
    id SERIAL,
    email VARCHAR(128) NOT NULL UNIQUE,
    firstName VARCHAR(128) NOT NULL,
    lastName VARCHAR(128) NOT NULL,
    type VARCHAR(128) NOT NULL,
    isAdmin BOOLEAN NOT NULL,
    password VARCHAR(128) NOT NULL
  );
  `;

const createAccountTable = `
  DROP TABLE IF EXISTS accounts cascade;

  CREATE TABLE IF NOT EXISTS
  accounts(
    id SERIAL,
    accountNumber BIGINT PRIMARY KEY NOT NULL,
    createdON TIMESTAMP,
    ownerEmail VARCHAR(128) REFERENCES users(email) ON DELETE CASCADE,
    type VARCHAR(128) NOT NULL,
    balance FLOAT NOT NULL,
    status VARCHAR(128) NOT NULL
  );
  `;
const createTransactionTable = `
  DROP TABLE IF EXISTS transactions cascade;

  CREATE TABLE IF NOT EXISTS
  transactions(
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP,
    type VARCHAR(128) NOT NULL,
    accountNumber BIGINT REFERENCES accounts(accountNumber) ON DELETE CASCADE,
    amount FLOAT NOT NULL,
    cashier INT NOT NULL,
    oldBalance FLOAT NOT NULL,
    newBalance FLOAT NOT NULL
  );
`;

const seedTables = `
INSERT INTO
  users
    VALUES
    ( default, 'mikejones@gmail.com', 'Mike', 'Jones', 'staff', ${true}, '$2b$10$xjROlDMHpsTydHjouVZDCuPsTlalFeqbcBku6Zy1qy9uvDkewa6va'),
    ( default, 'samo@gmail.com', 'Samuel', 'Ocran', 'staff', ${false}, '$2b$10$iKtnb658ePsLlpbAUVGEb.EsSbv/8aateaYMaa4xV.9qe4xSIwjWS'),
    ( default, 'joe@gmail.com', 'Joseph', 'Lee', 'client', ${false}, '$2b$10$eOtw6v7L2grdqd6ES0SNmeETCsTSPEJRWtu2k4RRfMaMJ2XcrGQYW'),
    ( default, 'teejay@gmail.com', 'Tunji', 'Balogun', 'client', ${false}, 'somerandompassword'),
    ( default, 'edd@yahoo.com', 'Edward', 'Ola', 'client', ${false}, 'somerandompassword');
INSERT INTO
  accounts
    VALUES
    ( default, 4194194410, '${date}', 'joe@gmail.com', 'current', 500000.10, 'active'),
    ( default, 9852136521, '${date}', 'samo@gmail.com', 'savings', 1000.00, 'dormant'),
    ( default, 5421214520, '${date}', 'mikejones@gmail.com', 'savings', 45000.50, 'active'),
    ( default, 1212452132, '${date}', 'joe@gmail.com', 'savings', 30000.10, 'dormant'),
    ( default, 3301123235, '${date}', 'samo@gmail.com', 'savings', 50000.10, 'active');
INSERT INTO
  transactions
    VALUES
      ( default, '${date}', 'credit', 4194194410, 25410.00, 2, 214410.20, 2111.20),
      ( default, '${date}', 'credit', 9852136521, 12000.20, 2, 1000.20, 13000.20),
    ( default, '${date}', 'credit', 9852136521, 20000.20, 2, 13000.20, 23000.20),
    ( default, '${date}', 'credit', 4194194410, 15000.20, 2, 10200.20, 12000.20);
`;

module.exports = {
  createUserTable,
  createAccountTable,
  createTransactionTable,
  seedTables,
};
