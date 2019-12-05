"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _accountController = _interopRequireDefault(require("../controllers/accountController"));

var _validations = _interopRequireDefault(require("../middlewares/validations"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.get('/', _auth.default.isLoggedIn, _auth.default.isStaff, _accountController.default.getAccounts);
router.post('/', _auth.default.isLoggedIn, _validations.default.validateNewAccount, _accountController.default.createAccount);
router.get('/:accountNumber', _auth.default.isLoggedIn, _accountController.default.getSingleAccount);
router.get('/:accountNumber/transactions', _auth.default.isLoggedIn, _accountController.default.getAccountTransactions);
router.delete('/:accountNumber', _auth.default.isLoggedIn, _auth.default.isAdmin, _accountController.default.deleteAccount);
router.patch('/:accountNumber', _auth.default.isLoggedIn, _auth.default.isAdmin, _accountController.default.changeAccountStatus);
var _default = router;
exports.default = _default;