import { Account } from '../../db_config/models';
import generateAccountNumber from '../utils/accountNumberGenerator';
import Util from '../utils/util';

const util = new Util();


/**
 * @description get all bank accounts
 * @method getAccounts
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} response object
 */
export const getAccounts = async (req, res, next) => {
  try {
    const accounts = await Account.findAll();

    util.setSuccess(200, { accounts });
    return util.send(res);
  } catch (error) { next(error) }
};

// /**
//  * @description get all bank accounts owned by a user
//  * @param {object} req
//  * @param {object} res
//  * @returns {object} response object
//  */
// export const getAccountsByEmail = async (req, res, next) => {
//   try {
//     // Lookup email
//     const email = req.params.email.toLowerCase();
//     const resp = await UserServices.getUserByEmail(email);
//     helpers.checkServerError(resp, res);

//     if (resp.rows < 1) {
//         return res.status(404).json({
//         status: 404,
//         errorMessage: 'The user with the given email was not found',
//         });
//     }

//     const result = await UserServices.getAccountsByOwnerEmail(email);
//     helpers.checkServerError(result, res);

//     if (result.rows < 1) {
//         return res.status(404).json({
//         status: 404,
//         errorMessage: 'No accounts for this user yet',
//         });
//     }
//     // Check for authorization
//     const ownerEmail = result.rows[0].owneremail;
//     if (req.userData.email !== ownerEmail && req.userData.type !== 'staff') {
//         return res.status(403).json({
//         status: 403,
//         errorMessage: 'Forbidden: You are not allowed to access these accounts',
//         });
//     }

//     // Return retrived account
//     const accounts = result.rows;
//     return res.json({
//         status: 200,
//         data: accounts,
//     });
//   } catch (error) { next(error) }
// }


/**
 * @description get a single account
 * @method getSingleAccount
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} response object
 */
export const getSingleAccount = async (req, res, next) => {
  try {
    const account = await Account.findOne({ where: { accountNumber: req.params.accountNumber } });
    if (!account) {
      util.setError(404, 'The account with the given number was not found');
      return util.send(res);
    }
    // check for authorization
    const owner = account.accountOwner;
    if (req.userData.email !== owner && req.userData.type !== 'staff') {
      util.setError(403, 'Forbidden: You are not allowed to access this account');
      return util.send(res);
    }

    util.setSuccess(200, { account });
    return util.send(res);
  } catch (error) { next(error) }
};


// /**
//  * @description get all transactions on a given account
//  * @method getAccountTransactions
//  * @param {object} req
//  * @param {object} res
//  * @returns {object} response object
//  */
// async getAccountTransactions(req, res) {
// const resp = await AccountServices.getSingleAccount(req.params.accountNumber);
// helpers.checkServerError(resp, res);
// if (resp.rows < 1) {
//     return res.status(404).json({
//     status: 404,
//     errorMessage: 'The account with the given number was not found',
//     });
// }

// // check for authorization
// const ownerEmail = resp.rows[0].owneremail;
// if (req.userData.email !== ownerEmail && req.userData.type !== 'staff') {
//     return res.status(403).json({
//     status: 403,
//     errorMessage: `Forbidden: Account ${req.params.accountNumber} doesn't belong to you`,
//     });
// }
// const result = await AccountServices.getAccountTransactions(req.params.accountNumber);
// helpers.checkServerError(result, res);

// if (result.rows < 1) {
//     return res.status(404).json({
//     status: 404,
//     errorMessage: 'No transactions yet on this account',
//     });
// }
// const transactions = result.rows;
// return res.json({
//     status: 200,
//     data: transactions,
// });
// },

/**
 * @description creates an account
 * @method createAccount
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} response object
 */
export const createAccount = async (req, res, next) => {
  try {
    const { accountType, openingBalance } = req.body;
    const accountOwner = req.userData.email;
    const accountNumber = generateAccountNumber();
    const balance = Number.parseFloat(openingBalance).toFixed(2);

    const account = await Account.create({
      accountNumber,
      accountOwner,
      accountType,
      balance
    });

    util.setSuccess(201, { account });
    return util.send(res);
  } catch (error) { next(error) }
};

/**
 * @description deletes an account
 * @method deleteAccount
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} response object
 */
export const deleteAccount = async (req, res, next) => {
  try {
    const account = await Account.destroy({ where: { accountNumber: req.params.accountNumber } });
    if (!account) {
      util.setError(404, 'The account with the given number was not found');
      return util.send(res);
    }
    util.setSuccess(200, 'Account successfully deleted');
    return util.send(res);
  } catch (error) { next(error) }
}


/**
 * @description change an account status
 * @method changeAccountStatus
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} response object
 */
export const changeAccountStatus = async (req, res, next) => {
  try {
    if (req.body.status !== 'active' && req.body.status !== 'dormant') {
      util.setError(400, 'set status: active || dormant');
      return util.send(res);
    }
    const { status } = req.body;
    const accounts = await Account.update(
      { status },
      { returning: true,
        where: { accountNumber: req.params.accountNumber } }
    );

    if (accounts[0] === 0) {
      util.setError(404, 'The account with the given number was not found');
      return util.send(res);
    }

    util.setSuccess(200, { account: accounts[1][0].dataValues });
    return util.send(res);
  } catch (error) { next(error) }
}
