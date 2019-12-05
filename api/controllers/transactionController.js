import TransactionServices from '../services/transactionServices';
import AccountServices from '../services/accountServices';
import helpers from '../helpers/helpers';

const TransactionController = {

  /**
   * @description get all transactions
   * @method getAllTransactions
   * @param {object} req
   * @param {object} res
   * @returns {object} containing status code and array of transactions || errorMessage
   */
  async getAllTransactions(req, res) {
    const result = await TransactionServices.getAllTransactions();
    helpers.checkServerError(result, res);

    const transactions = result.rows;
    return res.json({
      status: 200,
      data: transactions,
    });
  },

  /**
  * @description get a single transaction
  * @method getTransactionById
  * @param {object} req
  * @param {object} res
  * @returns {object} containing status code and transaction object || errorMessage
  */
  async getTransactionById(req, res) {
    const result = await TransactionServices.getTransactionById(req.params.id);
    helpers.checkServerError(result, res);

    if (result.rows < 1) {
      return res.status(404).json({
        status: 404,
        errorMessage: 'Transaction not found',
      });
    }

    // Get owner details
    const resp = await AccountServices.getSingleAccount(result.rows[0].accountnumber);
    helpers.checkServerError(result, res);

    const owner = resp.rows[0].owneremail;

    // Check for authorization
    if (req.userData.email !== owner && req.userData.type !== 'staff') {
      return res.status(403).json({
        status: 403,
        errorMessage: 'Forbidden: You are not allowed to access this transaction',
      });
    }

    // Return retrived account
    const transactions = result.rows;
    return res.json({
      status: 200,
      data: transactions,
    });
  },

  /**
  * @description credit an account
  * @param {object} req reqest body constains:
  *                 accountNum, cashierId, amountt
  * @param {object} res
  * @returns {object} response object
  */
  async creditAccount(req, res) {
    const { accountNumber } = req.params;
    const cashierId = req.userData.id;
    const { amount } = req.body;
    const result = await TransactionServices.creditAccount(accountNumber, cashierId, amount);
    helpers.checkServerError(result, res);

    if (result === false) {
      return res.status(404).json({
        status: 404,
        errorMessage: 'The account with the given number was not found',
      });
    }
    if (result === 'Not Active') {
      return res.status(406).json({
        status: 406,
        errorMessage: 'This account isn\'t active',
      });
    }
    const transaction = result.rows[0];
    return res.status(201).json({
      status: 201,
      data: transaction,
    });
  },

  /**
  * @description debit an account
  * @param {object} req reqest body constains:
  *                 accountNum, cashierId, amountt
  * @param {object} res
  * @returns {object} response object
  */
  async debitAccount(req, res) {
    const { accountNumber } = req.params;
    const cashierId = req.userData.id;
    const { amount } = req.body;
    const result = await TransactionServices.debitAccount(accountNumber, cashierId, amount);
    helpers.checkServerError(result, res);

    if (result === false) {
      return res.status(404).json({
        status: 404,
        errorMessage: 'The account with the given number was not found',
      });
    }
    if (result === 'Not Active') {
      return res.status(406).json({
        status: 406,
        errorMessage: 'This account isn\'t active',
      });
    }
    if (result === 'Insufficient funds') {
      return res.status(200).json({
        status: 200,
        errorMessage: 'Sorry, you do not have enough funds for this request',
      });
    }

    const transaction = result.rows[0];
    return res.status(201).json({
      status: 201,
      data: transaction,
    });
  },
};

export default TransactionController;
