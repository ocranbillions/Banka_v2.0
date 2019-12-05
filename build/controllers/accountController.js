"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _accountServices = _interopRequireDefault(require("../services/accountServices"));

var _helpers = _interopRequireDefault(require("../helpers/helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var AccountController = {
  /**
   * @description get all bank accounts
   * @method getAccounts
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  getAccounts: function () {
    var _getAccounts = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _accountServices.default.getAccounts(req.query);

            case 2:
              result = _context.sent;

              _helpers.default.checkServerError(result, res);

              return _context.abrupt("return", res.json({
                status: 200,
                data: result.rows
              }));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getAccounts(_x, _x2) {
      return _getAccounts.apply(this, arguments);
    }

    return getAccounts;
  }(),

  /**
   * @description get a single account
   * @method getSingleAccount
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  getSingleAccount: function () {
    var _getSingleAccount = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var result, ownerEmail, account;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _accountServices.default.getSingleAccount(req.params.accountNumber);

            case 2:
              result = _context2.sent;

              _helpers.default.checkServerError(result, res);

              if (!(result.rows < 1)) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", res.status(404).json({
                status: 404,
                errorMessage: 'The account with the given number was not found'
              }));

            case 6:
              // check for authorization
              ownerEmail = result.rows[0].owneremail;

              if (!(req.userData.email !== ownerEmail && req.userData.type !== 'staff')) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return", res.status(403).json({
                status: 403,
                errorMessage: "Forbidden: Account ".concat(req.params.accountNumber, " doesn't belong to you")
              }));

            case 9:
              // Return retrived account
              account = result.rows[0];
              return _context2.abrupt("return", res.json({
                status: 200,
                data: account
              }));

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function getSingleAccount(_x3, _x4) {
      return _getSingleAccount.apply(this, arguments);
    }

    return getSingleAccount;
  }(),

  /**
   * @description get all transactions on a given account
   * @method getAccountTransactions
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  getAccountTransactions: function () {
    var _getAccountTransactions = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var resp, ownerEmail, result, transactions;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _accountServices.default.getSingleAccount(req.params.accountNumber);

            case 2:
              resp = _context3.sent;

              _helpers.default.checkServerError(resp, res);

              if (!(resp.rows < 1)) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt("return", res.status(404).json({
                status: 404,
                errorMessage: 'The account with the given number was not found'
              }));

            case 6:
              // check for authorization
              ownerEmail = resp.rows[0].owneremail;

              if (!(req.userData.email !== ownerEmail && req.userData.type !== 'staff')) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt("return", res.status(403).json({
                status: 403,
                errorMessage: "Forbidden: Account ".concat(req.params.accountNumber, " doesn't belong to you")
              }));

            case 9:
              _context3.next = 11;
              return _accountServices.default.getAccountTransactions(req.params.accountNumber);

            case 11:
              result = _context3.sent;

              _helpers.default.checkServerError(result, res);

              if (!(result.rows < 1)) {
                _context3.next = 15;
                break;
              }

              return _context3.abrupt("return", res.status(404).json({
                status: 404,
                errorMessage: 'No transactions yet on this account'
              }));

            case 15:
              transactions = result.rows;
              return _context3.abrupt("return", res.json({
                status: 200,
                data: transactions
              }));

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function getAccountTransactions(_x5, _x6) {
      return _getAccountTransactions.apply(this, arguments);
    }

    return getAccountTransactions;
  }(),

  /**
   * @description deletes an account
   * @method deleteAccount
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  createAccount: function () {
    var _createAccount = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var result, newAccount;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _accountServices.default.createAccount(req.body, req.userData);

            case 2:
              result = _context4.sent;

              _helpers.default.checkServerError(result, res); // Return newly created account


              newAccount = result.rows[0];
              return _context4.abrupt("return", res.status(201).json({
                status: 201,
                data: newAccount
              }));

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function createAccount(_x7, _x8) {
      return _createAccount.apply(this, arguments);
    }

    return createAccount;
  }(),

  /**
   * @description deletes an account
   * @method deleteAccount
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  deleteAccount: function () {
    var _deleteAccount = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(req, res) {
      var result;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _accountServices.default.deleteAccount(req.params.accountNumber);

            case 2:
              result = _context5.sent;

              _helpers.default.checkServerError(result, res);

              if (!(result.rowCount < 1)) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", res.status(404).json({
                status: 404,
                errorMessage: 'The account with the given number was not found'
              }));

            case 6:
              return _context5.abrupt("return", res.status(202).json({
                status: 202,
                message: 'Account successfully deleted'
              }));

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function deleteAccount(_x9, _x10) {
      return _deleteAccount.apply(this, arguments);
    }

    return deleteAccount;
  }(),

  /**
  * @description change an account status
  * @method changeAccountStatus
  * @param {object} req
  * @param {object} res
  * @returns {object} response object
  */
  changeAccountStatus: function () {
    var _changeAccountStatus = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(req, res) {
      var result, account;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!(req.body.status !== 'active' && req.body.status !== 'dormant')) {
                _context6.next = 2;
                break;
              }

              return _context6.abrupt("return", res.status(400).json({
                status: 400,
                errorMessage: 'Status can only be active or dormant'
              }));

            case 2:
              _context6.next = 4;
              return _accountServices.default.changeAccountStatus(req.params.accountNumber, req.body.status);

            case 4:
              result = _context6.sent;

              _helpers.default.checkServerError(result, res);

              if (!(result.rowCount < 1)) {
                _context6.next = 8;
                break;
              }

              return _context6.abrupt("return", res.status(404).json({
                status: 404,
                errorMessage: 'The account with the given number was not found'
              }));

            case 8:
              account = result.rows[0];
              return _context6.abrupt("return", res.status(201).json({
                status: 201,
                data: {
                  accountNumber: account.accountnumber,
                  status: account.status
                }
              }));

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function changeAccountStatus(_x11, _x12) {
      return _changeAccountStatus.apply(this, arguments);
    }

    return changeAccountStatus;
  }()
};
var _default = AccountController;
exports.default = _default;