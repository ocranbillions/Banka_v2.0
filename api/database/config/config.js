import { config } from 'dotenv';
config();

export const development = {
  username: 'postgres',
  password: 'postgres',
  database: 'banka_db',
  host: '127.0.0.1',
  dialect: 'postgres',
  logging: false,
};

export const test = {
  username: 'postgres',
  password: 'postgres',
  database: 'banka_test_db',
  host: '127.0.0.1',
  dialect: 'postgres',
  logging: false,
};

export const production = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
};