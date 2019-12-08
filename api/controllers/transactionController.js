import { Account, Transaction } from '../database/models';
import Util from '../utils/util';

const util = new Util();
// import TransactionServices from '../services/transactionServices';
// import AccountServices from '../services/accountServices';
// import helpers from '../helpers/helpers';


/**
 * @description get all transactions
 * @method getTransactions
 * @param {object} req
 * @param {object} res
 * @returns {object} containing status code and array of transactions || errorMessage
 */
export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll();

    util.setSuccess(200, { transactions });
    return util.send(res);
  } catch (error) { next(error); }
}

  /**
  * @description get a single transaction
  * @method getTransactionById
  * @param {object} req
  * @param {object} res
  * @returns {object} containing status code and transaction object || errorMessage
  */
export const getTransactionById = async (req, res, next) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) {
      util.setError(404, 'Transaction not found');
      return util.send(res);
    }
    // check for authorization
    const accountOwner = transaction.accountEmail;
    if (req.userData.email !== accountOwner && req.userData.type !== 'staff') {
      util.setError(403, 'Forbidden: You are not allowed to access this transaction');
      return util.send(res);
    }

    util.setSuccess(200, { transaction });
    return util.send(res);
  } catch (error) { next(error); }
}

//   /**
//   * @description credit an account
//   * @param {object} req reqest body constains:
//   *                 accountNum, cashierId, amountt
//   * @param {object} res
//   * @returns {object} response object
//   */
//   async creditAccount(req, res) {
//     const { accountNumber } = req.params;
//     const cashierId = req.userData.id;
//     const { amount } = req.body;
//     const result = await TransactionServices.creditAccount(accountNumber, cashierId, amount);
//     helpers.checkServerError(result, res);

//     if (result === false) {
//       return res.status(404).json({
//         status: 404,
//         errorMessage: 'The account with the given number was not found',
//       });
//     }
//     if (result === 'Not Active') {
//       return res.status(406).json({
//         status: 406,
//         errorMessage: 'This account isn\'t active',
//       });
//     }
//     const transaction = result.rows[0];
//     return res.status(201).json({
//       status: 201,
//       data: transaction,
//     });
//   },

//   /**
//   * @description debit an account
//   * @param {object} req reqest body constains:
//   *                 accountNum, cashierId, amountt
//   * @param {object} res
//   * @returns {object} response object
//   */
//   async debitAccount(req, res) {
//     const { accountNumber } = req.params;
//     const cashierId = req.userData.id;
//     const { amount } = req.body;
//     const result = await TransactionServices.debitAccount(accountNumber, cashierId, amount);
//     helpers.checkServerError(result, res);

//     if (result === false) {
//       return res.status(404).json({
//         status: 404,
//         errorMessage: 'The account with the given number was not found',
//       });
//     }
//     if (result === 'Not Active') {
//       return res.status(406).json({
//         status: 406,
//         errorMessage: 'This account isn\'t active',
//       });
//     }
//     if (result === 'Insufficient funds') {
//       return res.status(200).json({
//         status: 200,
//         errorMessage: 'Sorry, you do not have enough funds for this request',
//       });
//     }

//     const transaction = result.rows[0];
//     return res.status(201).json({
//       status: 201,
//       data: transaction,
//     });
//   },
// };

// export default TransactionController;
