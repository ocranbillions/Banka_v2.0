"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _helpers = _interopRequireDefault(require("../helpers/helpers"));

var _models = _interopRequireDefault(require("../database/models"));

var _authServices = _interopRequireDefault(require("../services/authServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(Object(source)); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var AuthController = {
  /**
   * @description sign up a new user
   * @method signUp
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  signUp: function () {
    var _signUp = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res, next) {
      var _req$body, firstName, lastName, email, password, emailFound, salt, pwdHash, userInfo, user, payload, token;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, password = _req$body.password;
              email = email.toLowerCase();
              _context.next = 5;
              return _models.default.User.findOne({
                where: {
                  email: email
                }
              });

            case 5:
              emailFound = _context.sent;

              if (!emailFound) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", res.status(409).json({
                status: 409,
                errorMessage: 'Email already used'
              }));

            case 8:
              salt = _bcrypt.default.genSaltSync(10);
              pwdHash = _bcrypt.default.hashSync(password, salt);
              userInfo = _objectSpread({}, req.body, {
                email: email,
                password: pwdHash
              });
              _context.next = 13;
              return _models.default.User.create(_objectSpread({}, req.body, {
                email: email,
                password: pwdHash
              }));

            case 13:
              user = _context.sent;
              payload = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                type: 'client',
                isAdmin: false,
                id: user.dataValues.id
              };
              token = _helpers.default.createToken(payload);
              return _context.abrupt("return", res.status(201).json({
                status: 201,
                data: _objectSpread({
                  token: token
                }, userInfo)
              }));

            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](0);
              next(_context.t0);

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 19]]);
    }));

    function signUp(_x, _x2, _x3) {
      return _signUp.apply(this, arguments);
    }

    return signUp;
  }(),

  /**
   * @description sign in a user
   * @method signIn
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  signIn: function () {
    var _signIn = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var _req$body2, email, password, user, payload, token;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
              email = email.toLowerCase();
              _context2.next = 4;
              return _models.default.User.findOne({
                where: {
                  email: email
                }
              });

            case 4:
              user = _context2.sent;

              if (user) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", res.status(404).json({
                status: 404,
                errorMessage: 'User not found'
              }));

            case 7:
              if (_bcrypt.default.compareSync(password, user.dataValues.password)) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return", res.status(404).json({
                status: 404,
                errorMessage: 'Wrong password'
              }));

            case 9:
              payload = {
                email: email,
                firstName: user.dataValues.firstName,
                lastName: user.dataValues.lastName,
                type: user.dataValues.type,
                isAdmin: user.dataValues.isAdmin,
                id: user.dataValues.id
              };
              token = _helpers.default.createToken(payload);
              return _context2.abrupt("return", res.status(201).json({
                status: 201,
                data: {
                  token: token
                }
              }));

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function signIn(_x4, _x5) {
      return _signIn.apply(this, arguments);
    }

    return signIn;
  }()
};
var _default = AuthController;
exports.default = _default;