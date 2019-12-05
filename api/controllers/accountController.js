import AccountServices from '../services/accountServices';
import helpers from '../helpers/helpers';

const AccountController = {

  /**
   * @description get all bank accounts
   * @method getAccounts
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  async getAccounts(req, res) {
    const result = await AccountServices.getAccounts(req.query);
    helpers.checkServerError(result, res);

    return res.json({
      status: 200,
      data: result.rows,
    });
  },


  /**
   * @description get a single account
   * @method getSingleAccount
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  async getSingleAccount(req, res) {
    const result = await AccountServices.getSingleAccount(req.params.accountNumber);
    helpers.checkServerError(result, res);

    if (result.rows < 1) {
      return res.status(404).json({
        status: 404,
        errorMessage: 'The account with the given number was not found',
      });
    }
    // check for authorization
    const ownerEmail = result.rows[0].owneremail;
    if (req.userData.email !== ownerEmail && req.userData.type !== 'staff') {
      return res.status(403).json({
        status: 403,
        errorMessage: `Forbidden: Account ${req.params.accountNumber} doesn't belong to you`,
      });
    }
    // Return retrived account
    const account = result.rows[0];
    return res.json({
      status: 200,
      data: account,
    });
  },


  /**
   * @description get all transactions on a given account
   * @method getAccountTransactions
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  async getAccountTransactions(req, res) {
    const resp = await AccountServices.getSingleAccount(req.params.accountNumber);
    helpers.checkServerError(resp, res);
    if (resp.rows < 1) {
      return res.status(404).json({
        status: 404,
        errorMessage: 'The account with the given number was not found',
      });
    }

    // check for authorization
    const ownerEmail = resp.rows[0].owneremail;
    if (req.userData.email !== ownerEmail && req.userData.type !== 'staff') {
      return res.status(403).json({
        status: 403,
        errorMessage: `Forbidden: Account ${req.params.accountNumber} doesn't belong to you`,
      });
    }
    const result = await AccountServices.getAccountTransactions(req.params.accountNumber);
    helpers.checkServerError(result, res);

    if (result.rows < 1) {
      return res.status(404).json({
        status: 404,
        errorMessage: 'No transactions yet on this account',
      });
    }
    const transactions = result.rows;
    return res.json({
      status: 200,
      data: transactions,
    });
  },

  /**
   * @description deletes an account
   * @method deleteAccount
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  async createAccount(req, res) {
    const result = await AccountServices.createAccount(req.body, req.userData);
    helpers.checkServerError(result, res);

    // Return newly created account
    const newAccount = result.rows[0];
    return res.status(201).json({
      status: 201,
      data: newAccount,
    });
  },

  /**
   * @description deletes an account
   * @method deleteAccount
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  async deleteAccount(req, res) {
    const result = await AccountServices.deleteAccount(req.params.accountNumber);
    helpers.checkServerError(result, res);

    if (result.rowCount < 1) {
      return res.status(404).json({
        status: 404,
        errorMessage: 'The account with the given number was not found',
      });
    }
    return res.status(202).json({
      status: 202,
      message: 'Account successfully deleted',
    });
  },

  /**
  * @description change an account status
  * @method changeAccountStatus
  * @param {object} req
  * @param {object} res
  * @returns {object} response object
  */
  async changeAccountStatus(req, res) {
    if (req.body.status !== 'active' && req.body.status !== 'dormant') {
      return res.status(400).json({
        status: 400,
        errorMessage: 'Status can only be active or dormant',
      });
    }

    const result = await AccountServices.changeAccountStatus(req.params.accountNumber, req.body.status);
    helpers.checkServerError(result, res);

    if (result.rowCount < 1) {
      return res.status(404).json({
        status: 404,
        errorMessage: 'The account with the given number was not found',
      });
    }

    const account = result.rows[0];
    return res.status(201).json({
      status: 201,
      data: {
        accountNumber: account.accountnumber,
        status: account.status,
      },
    });
  },

};

export default AccountController;
