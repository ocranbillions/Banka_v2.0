"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _config = _interopRequireDefault(require("../db/config"));

var _accountServices = _interopRequireDefault(require("./accountServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var db = _config.default.db;
var TransactionServices = {
  /**
  * @description gets all transactions
  * @returns {object} response object
  */
  getAllTransactions: function () {
    var _getAllTransactions = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var searchQuery, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              searchQuery = 'SELECT * FROM transactions';
              _context.next = 4;
              return db.query(searchQuery);

            case 4:
              result = _context.sent;
              return _context.abrupt("return", result);

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", _context.t0);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    }));

    function getAllTransactions() {
      return _getAllTransactions.apply(this, arguments);
    }

    return getAllTransactions;
  }(),

  /**
  * @description gets a specific transaction
  * @param {object} transactionId id of transaction
  * @returns {object} response object
  */
  getTransactionById: function () {
    var _getTransactionById = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(transactionId) {
      var searchQuery, result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              searchQuery = 'SELECT * FROM transactions WHERE id=$1';
              _context2.next = 4;
              return db.query(searchQuery, [transactionId]);

            case 4:
              result = _context2.sent;
              return _context2.abrupt("return", result);

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", _context2.t0);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 8]]);
    }));

    function getTransactionById(_x) {
      return _getTransactionById.apply(this, arguments);
    }

    return getTransactionById;
  }(),

  /**
  * @description credit an account
  * @param {string} accountNum account to be credited
  * @param {int} cashierId cashier to consume the transaction.
  * @param {float} creditAmount to be credited
  * @returns {object} response object
  */
  creditAccount: function () {
    var _creditAccount = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(accountNum, cashierId, creditAmount) {
      var resp, date, oldbalance, amount, newbalance, updatedAccount, insertQuery, result;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _accountServices.default.getSingleAccount(accountNum);

            case 3:
              resp = _context3.sent;

              if (!(resp.rows < 1)) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt("return", false);

            case 6:
              if (!(resp.rows[0].status !== 'active')) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("return", 'Not Active');

            case 8:
              date = (0, _moment.default)(new Date());
              oldbalance = resp.rows[0].balance;
              amount = Number.parseFloat(creditAmount).toFixed(2);
              amount = Number.parseFloat(amount);
              newbalance = oldbalance + amount;
              _context3.next = 15;
              return _accountServices.default.updateAccountBalance(newbalance, accountNum);

            case 15:
              updatedAccount = _context3.sent;
              insertQuery = "INSERT INTO transactions\n        (createdon, type, accountnumber, amount, cashier, oldbalance, newbalance) \n        VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *";
              _context3.next = 19;
              return db.query(insertQuery, [date, 'credit', accountNum, amount, cashierId, oldbalance, updatedAccount.balance]);

            case 19:
              result = _context3.sent;
              return _context3.abrupt("return", result);

            case 23:
              _context3.prev = 23;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", _context3.t0);

            case 26:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 23]]);
    }));

    function creditAccount(_x2, _x3, _x4) {
      return _creditAccount.apply(this, arguments);
    }

    return creditAccount;
  }(),

  /**
  * @description debit an account
  * @param {string} accountNum account to be debited
  * @param {int} cashierId cashier to consume the transaction.
  * @param {float} debitAmount to be debited
  * @returns {object} response object
  */
  debitAccount: function () {
    var _debitAccount = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(accountNum, cashierId, debitAmount) {
      var resp, date, oldbalance, amount, newbalance, updatedAccount, insertQuery, result;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _accountServices.default.getSingleAccount(accountNum);

            case 3:
              resp = _context4.sent;

              if (!(resp.rows < 1)) {
                _context4.next = 6;
                break;
              }

              return _context4.abrupt("return", false);

            case 6:
              if (!(resp.rows[0].status !== 'active')) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt("return", 'Not Active');

            case 8:
              date = (0, _moment.default)(new Date());
              oldbalance = resp.rows[0].balance;
              amount = Number.parseFloat(debitAmount).toFixed(2);
              amount = Number.parseFloat(amount);
              newbalance = oldbalance - amount;

              if (!(amount > oldbalance)) {
                _context4.next = 15;
                break;
              }

              return _context4.abrupt("return", 'Insufficient funds');

            case 15:
              _context4.next = 17;
              return _accountServices.default.updateAccountBalance(newbalance, accountNum);

            case 17:
              updatedAccount = _context4.sent;
              insertQuery = "INSERT INTO transactions\n      (createdon, type, accountnumber, amount, cashier, oldbalance, newbalance) \n      VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *";
              _context4.next = 21;
              return db.query(insertQuery, [date, 'debit', accountNum, amount, cashierId, oldbalance, updatedAccount.balance]);

            case 21:
              result = _context4.sent;
              return _context4.abrupt("return", result);

            case 25:
              _context4.prev = 25;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", _context4.t0);

            case 28:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 25]]);
    }));

    function debitAccount(_x5, _x6, _x7) {
      return _debitAccount.apply(this, arguments);
    }

    return debitAccount;
  }()
};
var _default = TransactionServices;
exports.default = _default;