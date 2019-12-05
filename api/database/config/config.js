import { config } from 'dotenv';
config();

export const development = {
  username: 'postgres',
  password: 'postgres',
  database: 'banka_db',
  host: '127.0.0.1',
  dialect: 'postgres'
};

export const test = {
  username: 'postgres',
  password: 'postgres',
  database: 'banka_test_db',
  host: '127.0.0.1',
  dialect: 'postgres'
};

export const production = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'postgres'
};


// {
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
