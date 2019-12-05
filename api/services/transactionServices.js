import moment from 'moment';
import dbServices from '../db/config';
import AccountServices from './accountServices';

const { db } = dbServices;

const TransactionServices = {

  /**
  * @description gets all transactions
  * @returns {object} response object
  */
  async getAllTransactions() {
    try {
      const searchQuery = 'SELECT * FROM transactions';
      const result = await db.query(searchQuery);
      return result;
    } catch (error) {
      return error;
    }
  },

  /**
  * @description gets a specific transaction
  * @param {object} transactionId id of transaction
  * @returns {object} response object
  */
  async getTransactionById(transactionId) {
    try {
      const searchQuery = 'SELECT * FROM transactions WHERE id=$1';
      const result = await db.query(searchQuery, [transactionId]);
      return result;
    } catch (error) {
      return error;
    }
  },

  /**
  * @description credit an account
  * @param {string} accountNum account to be credited
  * @param {int} cashierId cashier to consume the transaction.
  * @param {float} creditAmount to be credited
  * @returns {object} response object
  */
  async creditAccount(accountNum, cashierId, creditAmount) {
    try {
      const resp = await AccountServices.getSingleAccount(accountNum);
      if (resp.rows < 1) return false;
      if (resp.rows[0].status !== 'active') return 'Not Active';

      const date = moment(new Date());
      const oldbalance = resp.rows[0].balance;
      let amount = Number.parseFloat(creditAmount).toFixed(2);
      amount = Number.parseFloat(amount);
      const newbalance = oldbalance + amount;

      const updatedAccount = await AccountServices.updateAccountBalance(newbalance, accountNum);

      const insertQuery = `INSERT INTO transactions
        (createdon, type, accountnumber, amount, cashier, oldbalance, newbalance) 
        VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;

      const result = await db.query(insertQuery,
        [date, 'credit', accountNum, amount, cashierId, oldbalance, updatedAccount.balance]);
      return result;
    } catch (error) {
      return error;
    }
  },

  /**
  * @description debit an account
  * @param {string} accountNum account to be debited
  * @param {int} cashierId cashier to consume the transaction.
  * @param {float} debitAmount to be debited
  * @returns {object} response object
  */
  async debitAccount(accountNum, cashierId, debitAmount) {
    try {
      const resp = await AccountServices.getSingleAccount(accountNum);
      if (resp.rows < 1) return false;
      if (resp.rows[0].status !== 'active') return 'Not Active';

      const date = moment(new Date());
      const oldbalance = resp.rows[0].balance;
      let amount = Number.parseFloat(debitAmount).toFixed(2);
      amount = Number.parseFloat(amount);
      const newbalance = oldbalance - amount;

      if (amount > oldbalance) return 'Insufficient funds';
      const updatedAccount = await AccountServices.updateAccountBalance(newbalance, accountNum);

      const insertQuery = `INSERT INTO transactions
      (createdon, type, accountnumber, amount, cashier, oldbalance, newbalance) 
      VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;

      const result = await db.query(insertQuery,
        [date, 'debit', accountNum, amount, cashierId, oldbalance, updatedAccount.balance]);
      return result;
    } catch (error) {
      return error;
    }
  },
};

export default TransactionServices;
