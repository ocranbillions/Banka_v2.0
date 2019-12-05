"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _helpers = _interopRequireDefault(require("../helpers/helpers"));

var _config = _interopRequireDefault(require("../db/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var db = _config.default.db;
var AccountController = {
  /**
  * @description get all accounts
  * @param {object} urlQuery
  * @returns {object} response object
  */
  getAccounts: function () {
    var _getAccounts = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(urlQuery) {
      var searchQuery, status, _result, result;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (!urlQuery.status) {
                _context.next = 8;
                break;
              }

              status = urlQuery.status;
              searchQuery = 'SELECT * FROM accounts WHERE status=$1';
              _context.next = 6;
              return db.query(searchQuery, [status]);

            case 6:
              _result = _context.sent;
              return _context.abrupt("return", _result);

            case 8:
              searchQuery = 'SELECT * FROM accounts';
              _context.next = 11;
              return db.query(searchQuery);

            case 11:
              result = _context.sent;
              return _context.abrupt("return", result);

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", _context.t0);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 15]]);
    }));

    function getAccounts(_x) {
      return _getAccounts.apply(this, arguments);
    }

    return getAccounts;
  }(),

  /**
  * @description get an account
  * @param {object} accountNum
  * @returns {object} response object
  */
  getSingleAccount: function () {
    var _getSingleAccount = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(accountNum) {
      var searchQuery, result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              searchQuery = 'SELECT * FROM accounts WHERE accountnumber=$1';
              _context2.next = 4;
              return db.query(searchQuery, [accountNum]);

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

    function getSingleAccount(_x2) {
      return _getSingleAccount.apply(this, arguments);
    }

    return getSingleAccount;
  }(),

  /**
  * @description get account transactions
  * @param {object} accountNum
  * @returns {object} response object
  */
  getAccountTransactions: function () {
    var _getAccountTransactions = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(accountNum) {
      var searchQuery, result;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              searchQuery = 'SELECT * FROM transactions WHERE accountnumber=$1 ORDER BY createdon DESC';
              _context3.next = 4;
              return db.query(searchQuery, [accountNum]);

            case 4:
              result = _context3.sent;
              return _context3.abrupt("return", result);

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", _context3.t0);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 8]]);
    }));

    function getAccountTransactions(_x3) {
      return _getAccountTransactions.apply(this, arguments);
    }

    return getAccountTransactions;
  }(),

  /**
  * @description create new bank account
  * @param {object} reqBody
  * @param {object} userData
  * @returns {object} response object
  */
  createAccount: function () {
    var _createAccount = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(reqBody, userData) {
      var num, date, status, type, owneremail, openingBalance, insertQuery, result;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              num = _helpers.default.generateAccountNumber();
              date = (0, _moment.default)(new Date());
              status = 'draft';
              type = reqBody.type;
              owneremail = userData.email;
              openingBalance = Number.parseFloat(reqBody.openingBalance).toFixed(2);
              openingBalance = Number.parseFloat(openingBalance);
              insertQuery = "INSERT INTO accounts(accountnumber, createdon, owneremail, type, balance, status) \n      VALUES ($1,$2,$3,$4,$5,$6) RETURNING *";
              _context4.next = 11;
              return db.query(insertQuery, [num, date, owneremail, type, openingBalance, status]);

            case 11:
              result = _context4.sent;
              return _context4.abrupt("return", result);

            case 15:
              _context4.prev = 15;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", _context4.t0);

            case 18:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 15]]);
    }));

    function createAccount(_x4, _x5) {
      return _createAccount.apply(this, arguments);
    }

    return createAccount;
  }(),

  /**
  * @description delete an account
  * @param {object} accountNum
  * @returns {object} response object
  */
  deleteAccount: function () {
    var _deleteAccount = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(accountNum) {
      var deleteQuery, result;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              deleteQuery = 'DELETE FROM accounts WHERE accountnumber=$1';
              _context5.next = 4;
              return db.query(deleteQuery, [accountNum]);

            case 4:
              result = _context5.sent;
              return _context5.abrupt("return", result);

            case 8:
              _context5.prev = 8;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", _context5.t0);

            case 11:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 8]]);
    }));

    function deleteAccount(_x6) {
      return _deleteAccount.apply(this, arguments);
    }

    return deleteAccount;
  }(),

  /**
    * @description change account status
    * @param {object} num account number
    * @param {object} status new status
    * @returns {object} response object
    */
  changeAccountStatus: function () {
    var _changeAccountStatus = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(num, status) {
      var updateQuery, result;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              updateQuery = 'UPDATE accounts SET status=$1 WHERE accountnumber=$2 RETURNING *';
              _context6.next = 4;
              return db.query(updateQuery, [status, num]);

            case 4:
              result = _context6.sent;
              return _context6.abrupt("return", result);

            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", _context6.t0);

            case 11:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 8]]);
    }));

    function changeAccountStatus(_x7, _x8) {
      return _changeAccountStatus.apply(this, arguments);
    }

    return changeAccountStatus;
  }(),

  /**
  * @description change account status
  * @param {object} newBalace new balance after update
  * @param {object} accountNumber account to be updated
  * @returns {object} response object
  */
  updateAccountBalance: function () {
    var _updateAccountBalance = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(newBalace, accountNumber) {
      var updateQuery, result;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              updateQuery = 'UPDATE accounts SET balance=$1 WHERE accountnumber=$2 RETURNING *';
              _context7.next = 4;
              return db.query(updateQuery, [newBalace, accountNumber]);

            case 4:
              result = _context7.sent;
              return _context7.abrupt("return", result.rows[0]);

            case 8:
              _context7.prev = 8;
              _context7.t0 = _context7["catch"](0);
              return _context7.abrupt("return", _context7.t0);

            case 11:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 8]]);
    }));

    function updateAccountBalance(_x9, _x10) {
      return _updateAccountBalance.apply(this, arguments);
    }

    return updateAccountBalance;
  }()
};
var _default = AccountController;
exports.default = _default;