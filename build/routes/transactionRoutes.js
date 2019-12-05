"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _transactionController = _interopRequireDefault(require("../controllers/transactionController"));

var _validations = _interopRequireDefault(require("../middlewares/validations"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.get('/', _auth.default.isLoggedIn, _auth.default.isStaff, _transactionController.default.getAllTransactions);
router.get('/:id', _auth.default.isLoggedIn, _transactionController.default.getTransactionById);
router.post('/:accountNumber/credit', _auth.default.isLoggedIn, _auth.default.isStaff, _validations.default.validateTransaction, _transactionController.default.creditAccount);
router.post('/:accountNumber/debit', _auth.default.isLoggedIn, _auth.default.isStaff, _validations.default.validateTransaction, _transactionController.default.debitAccount);
var _default = router;
exports.default = _default;