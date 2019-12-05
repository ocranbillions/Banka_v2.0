"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.production = exports.test = exports.development = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var development = {
  username: 'postgres',
  password: 'postgres',
  database: 'banka_db',
  host: '127.0.0.1',
  dialect: 'postgres'
};
exports.development = development;
var test = {
  username: 'postgres',
  password: 'postgres',
  database: 'banka_test_db',
  host: '127.0.0.1',
  dialect: 'postgres'
};
exports.test = test;
var production = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'postgres'
}; // {
//   "development": { 
//     "username": "postgres",
//     "password": "postgres",
//     "database": "banka_db",
//     "host": "127.0.0.1",
//     "dialect": "postgres"
//   },
//   "test": {
//     "username": "postgres",
//     "password": "postgres",
//     "database": "banka_test_db",
//     "host": "127.0.0.1",
//     "dialect": "postgres"
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
// }

exports.production = production;