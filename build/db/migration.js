"use strict";

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var date = (0, _moment.default)(new Date());
var createUserTable = "\n  DROP TABLE IF EXISTS users cascade;\n\n  CREATE TABLE IF NOT EXISTS\n  users(\n    id SERIAL,\n    email VARCHAR(128) NOT NULL UNIQUE,\n    firstName VARCHAR(128) NOT NULL,\n    lastName VARCHAR(128) NOT NULL,\n    type VARCHAR(128) NOT NULL,\n    isAdmin BOOLEAN NOT NULL,\n    password VARCHAR(128) NOT NULL\n  );\n  ";
var createAccountTable = "\n  DROP TABLE IF EXISTS accounts cascade;\n\n  CREATE TABLE IF NOT EXISTS\n  accounts(\n    id SERIAL,\n    accountNumber BIGINT PRIMARY KEY NOT NULL,\n    createdON TIMESTAMP,\n    ownerEmail VARCHAR(128) REFERENCES users(email) ON DELETE CASCADE,\n    type VARCHAR(128) NOT NULL,\n    balance FLOAT NOT NULL,\n    status VARCHAR(128) NOT NULL\n  );\n  ";
var createTransactionTable = "\n  DROP TABLE IF EXISTS transactions cascade;\n\n  CREATE TABLE IF NOT EXISTS\n  transactions(\n    id SERIAL PRIMARY KEY,\n    createdOn TIMESTAMP,\n    type VARCHAR(128) NOT NULL,\n    accountNumber BIGINT REFERENCES accounts(accountNumber) ON DELETE CASCADE,\n    amount FLOAT NOT NULL,\n    cashier INT NOT NULL,\n    oldBalance FLOAT NOT NULL,\n    newBalance FLOAT NOT NULL\n  );\n";
var seedTables = "\nINSERT INTO\n  users\n    VALUES\n    ( default, 'mikejones@gmail.com', 'Mike', 'Jones', 'staff', ".concat(true, ", '$2b$10$xjROlDMHpsTydHjouVZDCuPsTlalFeqbcBku6Zy1qy9uvDkewa6va'),\n    ( default, 'samo@gmail.com', 'Samuel', 'Ocran', 'staff', ", false, ", '$2b$10$iKtnb658ePsLlpbAUVGEb.EsSbv/8aateaYMaa4xV.9qe4xSIwjWS'),\n    ( default, 'joe@gmail.com', 'Joseph', 'Lee', 'client', ", false, ", '$2b$10$eOtw6v7L2grdqd6ES0SNmeETCsTSPEJRWtu2k4RRfMaMJ2XcrGQYW'),\n    ( default, 'teejay@gmail.com', 'Tunji', 'Balogun', 'client', ", false, ", 'somerandompassword'),\n    ( default, 'edd@yahoo.com', 'Edward', 'Ola', 'client', ", false, ", 'somerandompassword');\nINSERT INTO\n  accounts\n    VALUES\n    ( default, 4194194410, '", date, "', 'joe@gmail.com', 'current', 500000.10, 'active'),\n    ( default, 9852136521, '").concat(date, "', 'samo@gmail.com', 'savings', 1000.00, 'dormant'),\n    ( default, 5421214520, '").concat(date, "', 'mikejones@gmail.com', 'savings', 45000.50, 'active'),\n    ( default, 1212452132, '").concat(date, "', 'joe@gmail.com', 'savings', 30000.10, 'dormant'),\n    ( default, 3301123235, '").concat(date, "', 'samo@gmail.com', 'savings', 50000.10, 'active');\nINSERT INTO\n  transactions\n    VALUES\n      ( default, '").concat(date, "', 'credit', 4194194410, 25410.00, 2, 214410.20, 2111.20),\n      ( default, '").concat(date, "', 'credit', 9852136521, 12000.20, 2, 1000.20, 13000.20),\n    ( default, '").concat(date, "', 'credit', 9852136521, 20000.20, 2, 13000.20, 23000.20),\n    ( default, '").concat(date, "', 'credit', 4194194410, 15000.20, 2, 10200.20, 12000.20);\n");
module.exports = {
  createUserTable: createUserTable,
  createAccountTable: createAccountTable,
  createTransactionTable: createTransactionTable,
  seedTables: seedTables
};