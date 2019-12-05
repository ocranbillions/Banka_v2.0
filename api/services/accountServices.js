import moment from 'moment';
import helpers from '../helpers/helpers';
import dbServices from '../db/config';

const { db } = dbServices;

const AccountController = {

  /**
  * @description get all accounts
  * @param {object} urlQuery
  * @returns {object} response object
  */
  async getAccounts(urlQuery) {
    try {
      let searchQuery;
      if (urlQuery.status) {
        const { status } = urlQuery;
        searchQuery = 'SELECT * FROM accounts WHERE status=$1';
        const result = await db.query(searchQuery, [status]);
        return result;
      }

      searchQuery = 'SELECT * FROM accounts';
      const result = await db.query(searchQuery);
      return result;
    } catch (error) {
      return error;
    }
  },

  /**
  * @description get an account
  * @param {object} accountNum
  * @returns {object} response object
  */
  async getSingleAccount(accountNum) {
    try {
      const searchQuery = 'SELECT * FROM accounts WHERE accountnumber=$1';
      const result = await db.query(searchQuery, [accountNum]);
      return result;
    } catch (error) {
      return error;
    }
  },

  /**
  * @description get account transactions
  * @param {object} accountNum
  * @returns {object} response object
  */
  async getAccountTransactions(accountNum) {
    try {
      const searchQuery = 'SELECT * FROM transactions WHERE accountnumber=$1 ORDER BY createdon DESC';
      const result = await db.query(searchQuery, [accountNum]);
      return result;
    } catch (error) {
      return error;
    }
  },

  /**
  * @description create new bank account
  * @param {object} reqBody
  * @param {object} userData
  * @returns {object} response object
  */
  async createAccount(reqBody, userData) {
    try {
      const num = helpers.generateAccountNumber();
      const date = moment(new Date());
      const status = 'draft';
      const { type } = reqBody;
      const owneremail = userData.email;
      let openingBalance = Number.parseFloat(reqBody.openingBalance).toFixed(2);
      openingBalance = Number.parseFloat(openingBalance);

      const insertQuery = `INSERT INTO accounts(accountnumber, createdon, owneremail, type, balance, status) 
      VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;

      const result = await db.query(insertQuery,
        [num, date, owneremail, type, openingBalance, status]);

      return result;
    } catch (error) {
      return error;
    }
  },

  /**
  * @description delete an account
  * @param {object} accountNum
  * @returns {object} response object
  */
  async deleteAccount(accountNum) {
    try {
      const deleteQuery = 'DELETE FROM accounts WHERE accountnumber=$1';
      const result = await db.query(deleteQuery, [accountNum]);
      return result;
    } catch (error) {
      return error;
    }
  },

  /**
    * @description change account status
    * @param {object} num account number
    * @param {object} status new status
    * @returns {object} response object
    */
  async changeAccountStatus(num, status) {
    try {
      const updateQuery = 'UPDATE accounts SET status=$1 WHERE accountnumber=$2 RETURNING *';
      const result = await db.query(updateQuery, [status, num]);
      return result;
    } catch (error) {
      return error;
    }
  },

  /**
  * @description change account status
  * @param {object} newBalace new balance after update
  * @param {object} accountNumber account to be updated
  * @returns {object} response object
  */
  async updateAccountBalance(newBalace, accountNumber) {
    try {
      const updateQuery = 'UPDATE accounts SET balance=$1 WHERE accountnumber=$2 RETURNING *';
      const result = await db.query(updateQuery, [newBalace, accountNumber]);
      return result.rows[0];
    } catch (error) {
      return error;
    }
  }

};

export default AccountController;
