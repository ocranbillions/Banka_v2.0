"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _userServices = _interopRequireDefault(require("../services/userServices"));

var _helpers = _interopRequireDefault(require("../helpers/helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var UserController = {
  /**
  * @description get all users
  * @param {object} req
  * @param {object} res
  * @returns {object} response object
  */
  getUsers: function () {
    var _getUsers = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _userServices.default.getUsers();

            case 2:
              result = _context.sent;

              _helpers.default.checkServerError(result, res);

              return _context.abrupt("return", res.status(200).json({
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

    function getUsers(_x, _x2) {
      return _getUsers.apply(this, arguments);
    }

    return getUsers;
  }(),

  /**
  * @description get a user
  * @param {object} req
  * @param {object} res
  * @returns {object} response object
  */
  getUserByID: function () {
    var _getUserByID = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var result, profileID, user;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _userServices.default.getUserByID(req.params.id);

            case 2:
              result = _context2.sent;

              _helpers.default.checkServerError(result, res);

              if (!(result.rows < 1)) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", res.status(404).json({
                status: 404,
                errorMessage: 'The user with the given number was not found'
              }));

            case 6:
              // Check for authorization
              profileID = result.rows[0].id;

              if (!(req.userData.id !== profileID && req.userData.type !== 'staff')) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return", res.status(403).json({
                status: 403,
                errorMessage: 'Forbidden: You are not allowed to view this profile'
              }));

            case 9:
              // Return retrived user
              user = result.rows[0];
              return _context2.abrupt("return", res.json({
                status: 200,
                data: user
              }));

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function getUserByID(_x3, _x4) {
      return _getUserByID.apply(this, arguments);
    }

    return getUserByID;
  }(),

  /**
  * @description get all bank accounts owned by a user
  * @param {object} req
  * @param {object} res
  * @returns {object} response object
  */
  getAccountsByOwnerEmail: function () {
    var _getAccountsByOwnerEmail = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var email, resp, result, ownerEmail, accounts;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // Lookup email
              email = req.params.owneremail.toLowerCase();
              _context3.next = 3;
              return _userServices.default.getUserByEmail(email);

            case 3:
              resp = _context3.sent;

              _helpers.default.checkServerError(resp, res);

              if (!(resp.rows < 1)) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", res.status(404).json({
                status: 404,
                errorMessage: 'The user with the given email was not found'
              }));

            case 7:
              _context3.next = 9;
              return _userServices.default.getAccountsByOwnerEmail(email);

            case 9:
              result = _context3.sent;

              _helpers.default.checkServerError(result, res);

              if (!(result.rows < 1)) {
                _context3.next = 13;
                break;
              }

              return _context3.abrupt("return", res.status(404).json({
                status: 404,
                errorMessage: 'No accounts for this user yet'
              }));

            case 13:
              // Check for authorization
              ownerEmail = result.rows[0].owneremail;

              if (!(req.userData.email !== ownerEmail && req.userData.type !== 'staff')) {
                _context3.next = 16;
                break;
              }

              return _context3.abrupt("return", res.status(403).json({
                status: 403,
                errorMessage: 'Forbidden: You are not allowed to access these accounts'
              }));

            case 16:
              // Return retrived account
              accounts = result.rows;
              return _context3.abrupt("return", res.json({
                status: 200,
                data: accounts
              }));

            case 18:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function getAccountsByOwnerEmail(_x5, _x6) {
      return _getAccountsByOwnerEmail.apply(this, arguments);
    }

    return getAccountsByOwnerEmail;
  }(),

  /**
  * @description admin can create a new staff
  * @method addStaff
  * @param {object} req
  * @param {object} res
  * @returns {object} response object
  */
  createStaff: function () {
    var _createStaff = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var result, newStaff;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _userServices.default.createStaff(req.body);

            case 2:
              result = _context4.sent;

              if (!(result.constraint === 'users_email_key')) {
                _context4.next = 5;
                break;
              }

              return _context4.abrupt("return", res.status(409).json({
                status: 409,
                errorMessage: 'Email already used'
              }));

            case 5:
              // Return newly created staff
              newStaff = result;
              return _context4.abrupt("return", res.status(201).json({
                status: 201,
                data: newStaff
              }));

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function createStaff(_x7, _x8) {
      return _createStaff.apply(this, arguments);
    }

    return createStaff;
  }(),

  /**
  * @description admin can create a new staff
  * @method addStaff
  * @param {object} req
  * @param {object} res
  * @returns {object} response object
  */
  deleteUser: function () {
    var _deleteUser = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(req, res) {
      var result;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _userServices.default.deleteUser(req.params.id);

            case 2:
              result = _context5.sent;

              _helpers.default.checkServerError(result, res);

              if (!(result.rowCount < 1)) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", res.status(404).json({
                status: 404,
                errorMessage: 'The user with the given number was not found'
              }));

            case 6:
              return _context5.abrupt("return", res.status(200).json({
                status: 200,
                message: 'User successfully deleted'
              }));

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function deleteUser(_x9, _x10) {
      return _deleteUser.apply(this, arguments);
    }

    return deleteUser;
  }()
};
var _default = UserController;
exports.default = _default;