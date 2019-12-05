"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _config = _interopRequireDefault(require("../db/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var db = _config.default.db;
var UserController = {
  /**
  * @description gets all users
  * @returns {object} response object
  */
  getUsers: function () {
    var _getUsers = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var searchQuery, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              searchQuery = 'SELECT id, email, firstName, lastName, type, isAdmin FROM users';
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

    function getUsers() {
      return _getUsers.apply(this, arguments);
    }

    return getUsers;
  }(),

  /**
  * @description gets a specific user
  * @param {object} id id of user
  * @returns {object} response object
  */
  getUserByID: function () {
    var _getUserByID = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(id) {
      var searchQuery, result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              searchQuery = 'SELECT id, email, firstName, lastName, type, isAdmin FROM users WHERE id=$1';
              _context2.next = 4;
              return db.query(searchQuery, [id]);

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

    function getUserByID(_x) {
      return _getUserByID.apply(this, arguments);
    }

    return getUserByID;
  }(),

  /**
  * @description gets a specific user
  * @param {object} email of user
  * @returns {object} response object
  */
  getUserByEmail: function () {
    var _getUserByEmail = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(email) {
      var searchQuery, result;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              searchQuery = 'SELECT id, email, firstName, lastName, type, isAdmin FROM users WHERE email=$1';
              _context3.next = 4;
              return db.query(searchQuery, [email]);

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

    function getUserByEmail(_x2) {
      return _getUserByEmail.apply(this, arguments);
    }

    return getUserByEmail;
  }(),

  /**
  * @description gets all bank account of a user
  * @param {object} email email of the user
  * @returns {object} response object
  */
  getAccountsByOwnerEmail: function () {
    var _getAccountsByOwnerEmail = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(email) {
      var searchQuery, result;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              searchQuery = 'SELECT * FROM accounts WHERE owneremail=$1';
              _context4.next = 4;
              return db.query(searchQuery, [email]);

            case 4:
              result = _context4.sent;
              return _context4.abrupt("return", result);

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", _context4.t0);

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 8]]);
    }));

    function getAccountsByOwnerEmail(_x3) {
      return _getAccountsByOwnerEmail.apply(this, arguments);
    }

    return getAccountsByOwnerEmail;
  }(),

  /**
  * @description creates a new staff by admin
  * @param {object} staff details of staff
  * @returns {object} response object
  */
  createStaff: function () {
    var _createStaff = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(staff) {
      var insertQuery, salt, hashedPassword, email, result;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              insertQuery = "INSERT INTO users(email, firstName, lastName, type, isAdmin, password) \n                                VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, email, firstName, lastName, type, isAdmin";
              salt = _bcrypt.default.genSaltSync(10);
              hashedPassword = _bcrypt.default.hashSync(staff.password, salt);
              email = staff.email.toLowerCase();
              _context5.next = 7;
              return db.query(insertQuery, [email, staff.firstName, staff.lastName, 'staff', staff.isAdmin, hashedPassword]);

            case 7:
              result = _context5.sent;
              return _context5.abrupt("return", result.rows[0]);

            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", _context5.t0);

            case 14:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 11]]);
    }));

    function createStaff(_x4) {
      return _createStaff.apply(this, arguments);
    }

    return createStaff;
  }(),

  /**
  * @description delete a specific user
  * @param {object} id id of transaction
  * @returns {object} response object
  */
  deleteUser: function () {
    var _deleteUser = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(id) {
      var deleteQuery, result;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              deleteQuery = 'DELETE FROM users WHERE id=$1';
              _context6.next = 4;
              return db.query(deleteQuery, [id]);

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

    function deleteUser(_x5) {
      return _deleteUser.apply(this, arguments);
    }

    return deleteUser;
  }()
};
var _default = UserController;
exports.default = _default;