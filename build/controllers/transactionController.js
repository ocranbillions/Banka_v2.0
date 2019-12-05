"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _transactionServices = _interopRequireDefault(require("../services/transactionServices"));

var _accountServices = _interopRequireDefault(require("../services/accountServices"));

var _helpers = _interopRequireDefault(require("../helpers/helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var TransactionController = {
  /**
   * @description get all transactions
   * @method getAllTransactions
   * @param {object} req
   * @param {object} res
   * @returns {object} containing status code and array of transactions || errorMessage
   */
  getAllTransactions: function () {
    var _getAllTransactions = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var result, transactions;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _transactionServices.default.getAllTransactions();

            case 2:
              result = _context.sent;

              _helpers.default.checkServerError(result, res);

              transactions = result.rows;
              return _context.abrupt("return", res.json({
                status: 200,
                data: transactions
              }));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getAllTransactions(_x, _x2) {
      return _getAllTransactions.apply(this, arguments);
    }

    return getAllTransactions;
  }(),

  /**
  * @description get a single transaction
  * @method getTransactionById
  * @param {object} req
  * @param {object} res
  * @returns {object} containing status code and transaction object || errorMessage
  */
  getTransactionById: function () {
    var _getTransactionById = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var result, resp, owner, transactions;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _transactionServices.default.getTransactionById(req.params.id);

            case 2:
              result = _context2.sent;

              _helpers.default.checkServerError(result, res);

              if (!(result.rows < 1)) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", res.status(404).json({
                status: 404,
                errorMessage: 'Transaction not found'
              }));

            case 6:
              _context2.next = 8;
              return _accountServices.default.getSingleAccount(result.rows[0].accountnumber);

            case 8:
              resp = _context2.sent;

              _helpers.default.checkServerError(result, res);

              owner = resp.rows[0].owneremail; // Check for authorization

              if (!(req.userData.email !== owner && req.userData.type !== 'staff')) {
                _context2.next = 13;
                break;
              }

              return _context2.abrupt("return", res.status(403).json({
                status: 403,
                errorMessage: 'Forbidden: You are not allowed to access this transaction'
              }));

            case 13:
              // Return retrived account
              transactions = result.rows;
              return _context2.abrupt("return", res.json({
                status: 200,
                data: transactions
              }));

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function getTransactionById(_x3, _x4) {
      return _getTransactionById.apply(this, arguments);
    }

    return getTransactionById;
  }(),

  /**
  * @description credit an account
  * @param {object} req reqest body constains:
  *                 accountNum, cashierId, amountt
  * @param {object} res
  * @returns {object} response object
  */
  creditAccount: function () {
    var _creditAccount = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var accountNumber, cashierId, amount, result, transaction;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              accountNumber = req.params.accountNumber;
              cashierId = req.userData.id;
              amount = req.body.amount;
              _context3.next = 5;
              return _transactionServices.default.creditAccount(accountNumber, cashierId, amount);

            case 5:
              result = _context3.sent;

              _helpers.default.checkServerError(result, res);

              if (!(result === false)) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt("return", res.status(404).json({
                status: 404,
                errorMessage: 'The account with the given number was not found'
              }));

            case 9:
              if (!(result === 'Not Active')) {
                _context3.next = 11;
                break;
              }

              return _context3.abrupt("return", res.status(406).json({
                status: 406,
                errorMessage: 'This account isn\'t active'
              }));

            case 11:
              transaction = result.rows[0];
              return _context3.abrupt("return", res.status(201).json({
                status: 201,
                data: transaction
              }));

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function creditAccount(_x5, _x6) {
      return _creditAccount.apply(this, arguments);
    }

    return creditAccount;
  }(),

  /**
  * @description debit an account
  * @param {object} req reqest body constains:
  *                 accountNum, cashierId, amountt
  * @param {object} res
  * @returns {object} response object
  */
  debitAccount: function () {
    var _debitAccount = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var accountNumber, cashierId, amount, result, transaction;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              accountNumber = req.params.accountNumber;
              cashierId = req.userData.id;
              amount = req.body.amount;
              _context4.next = 5;
              return _transactionServices.default.debitAccount(accountNumber, cashierId, amount);

            case 5:
              result = _context4.sent;

              _helpers.default.checkServerError(result, res);

              if (!(result === false)) {
                _context4.next = 9;
                break;
              }

              return _context4.abrupt("return", res.status(404).json({
                status: 404,
                errorMessage: 'The account with the given number was not found'
              }));

            case 9:
              if (!(result === 'Not Active')) {
                _context4.next = 11;
                break;
              }

              return _context4.abrupt("return", res.status(406).json({
                status: 406,
                errorMessage: 'This account isn\'t active'
              }));

            case 11:
              if (!(result === 'Insufficient funds')) {
                _context4.next = 13;
                break;
              }

              return _context4.abrupt("return", res.status(200).json({
                status: 200,
                errorMessage: 'Sorry, you do not have enough funds for this request'
              }));

            case 13:
              transaction = result.rows[0];
              return _context4.abrupt("return", res.status(201).json({
                status: 201,
                data: transaction
              }));

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function debitAccount(_x7, _x8) {
      return _debitAccount.apply(this, arguments);
    }

    return debitAccount;
  }()
};
var _default = TransactionController;
exports.default = _default;