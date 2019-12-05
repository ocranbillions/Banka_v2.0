/* eslint-disable require-jsdoc */
/* eslint-disable no-console */
import dotenv from 'dotenv';
import { Pool } from 'pg';
import migrationScript from './migration';

dotenv.config();
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function createUserTable() {
  try {
    await db.query(migrationScript.createUserTable);
  } catch (error) {
    return error;
  }
}

async function createAccountTable() {
  try {
    await db.query(migrationScript.createAccountTable);
  } catch (error) {
    return error;
  }
}

async function createTransactionTable() {
  try {
    await db.query(migrationScript.createTransactionTable);
  } catch (error) {
    return error;
  }
}

async function seed() {
  try {
    await db.query(migrationScript.seedTables);
  } catch (error) {
    return error;
  }
}


module.exports = {
  db,
  createUserTable,
  createAccountTable,
  createTransactionTable,
  seed,
};

require('make-runnable');
