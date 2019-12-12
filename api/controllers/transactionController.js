import { Account, Transaction } from '../../db_config/models';
import Util from '../utils/util';

const util = new Util();

/**
 * @description get all transactions
 * @method getTransactions
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} containing status code and array of transactions || errorMessage
 */
export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll();

    util.setSuccess(200, { transactions });
    return util.send(res);
  } catch (error) { next(error); }
};


/**
* @description get a single transaction
* @method getTransactionById
* @param {object} req
* @param {object} res
* @param {object} next
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
};


/**
* @description credit an account
* @param {object} req reqest body constains:
*                 accountNum, cashierId, amountt
* @param {object} res
* @param {object} next
* @returns {object} response object
*/
export const creditAccount = async (req, res, next) => {
  try {
    const { accountNumber } = req.params;
    const cashierId = req.userData.id;
    const { amount } = req.body;

    const account = await Account.findOne({ where: { accountNumber } });
    if (!account) {
      util.setError(404, 'The account with the given number was not found');
      return util.send(res);
    }
    if (account.status !== 'active') {
      util.setError(406, 'This account isn\'t active');
      return util.send(res);
    }

    const oldBalance = account.balance;
    let amountToCredit = Number.parseFloat(amount).toFixed(2);
    amountToCredit = Number.parseFloat(amountToCredit);
    const newBalance = amountToCredit + oldBalance;

    const transaction = await Transaction.create({
      accountNumber,
      amount: amountToCredit,
      type: 'credit',
      cashier: cashierId,
      oldBalance,
      newBalance,
      accountEmail: account.accountOwner
    });

    await Account.update(
      { balance: newBalance },
      { where: { accountNumber } }
    );

    util.setSuccess(201, { transaction });
    return util.send(res);
  } catch (error) { next(error); }
};

/**
* @description debit an account
* @param {object} req reqest body constains:
*                 accountNum, cashierId, amountt
* @param {object} res
* @param {object} next
* @returns {object} response object
*/
export const debitAccount = async (req, res, next) => {
  try {
    const { accountNumber } = req.params;
    const cashierId = req.userData.id;
    const { amount } = req.body;

    const account = await Account.findOne({ where: { accountNumber } });
    if (!account) {
      util.setError(404, 'The account with the given number was not found');
      return util.send(res);
    }
    if (account.status !== 'active') {
      util.setError(406, 'This account isn\'t active');
      return util.send(res);
    }

    const oldBalance = account.balance;
    if (amount > oldBalance) {
      util.setError(406, 'Sorry, you do not have enough funds for this request');
      return util.send(res);
    }

    let amountToDebit = Number.parseFloat(amount).toFixed(2);
    amountToDebit = Number.parseFloat(amountToDebit);
    const newBalance = oldBalance - amountToDebit;

    const transaction = await Transaction.create({
      accountNumber,
      amount: amountToDebit,
      type: 'debit',
      cashier: cashierId,
      oldBalance,
      newBalance,
      accountEmail: account.accountOwner
    });

    await Account.update(
      { balance: newBalance },
      { where: { accountNumber } }
    );

    util.setSuccess(201, { transaction });
    return util.send(res);
  } catch (error) { next(error); }
};