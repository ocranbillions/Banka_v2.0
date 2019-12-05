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
var AuthServices = {
  /**
  * @description registers new user
  * @param {object} user user's info
  * @returns {object} response object
  */
  signUp: function () {
    var _signUp = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(user) {
      var insertQuery, salt, hashedPassword, email, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              insertQuery = "INSERT INTO users(email, firstName, lastName, type, isAdmin, password) \n                              VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, email, firstName, lastName, type, isAdmin";
              salt = _bcrypt.default.genSaltSync(10);
              hashedPassword = _bcrypt.default.hashSync(user.password, salt);
              email = user.email.toLowerCase();
              _context.prev = 4;
              _context.next = 7;
              return db.query("INSERT INTO users (email, \"firstName\", \"lastName\", type, \"isAdmin\", password) VALUES ('emailll@emaillls.com', 'myFirstName', 'myLastName', 'client', ".concat(false, ", 'password') RETURNING id, email, firstName, lastName, type, isAdmin;"));

            case 7:
              result = _context.sent;
              console.log('We got here.......', result);
              return _context.abrupt("return", result);

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](4);
              console.log(_context.t0);
              console.log('we caught an error=======');
              return _context.abrupt("return", _context.t0);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 12]]);
    }));

    function signUp(_x) {
      return _signUp.apply(this, arguments);
    }

    return signUp;
  }(),

  /**
  * @description sign's in user
  * @param {object} user user's login details
  * @returns {object} response object
  */
  signIn: function () {
    var _signIn = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(user) {
      var email, searchQuery, result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              email = user.email.toLowerCase();
              searchQuery = 'SELECT * FROM users WHERE email=$1';
              _context2.next = 5;
              return db.query(searchQuery, [email]);

            case 5:
              result = _context2.sent;
              return _context2.abrupt("return", result);

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", _context2.t0);

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 9]]);
    }));

    function signIn(_x2) {
      return _signIn.apply(this, arguments);
    }

    return signIn;
  }()
};
var _default = AuthServices;
exports.default = _default;