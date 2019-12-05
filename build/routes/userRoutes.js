"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _userController = _interopRequireDefault(require("../controllers/userController"));

var _validations = _interopRequireDefault(require("../middlewares/validations"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.get('/', _auth.default.isLoggedIn, _auth.default.isStaff, _userController.default.getUsers);
router.get('/:id', _auth.default.isLoggedIn, _userController.default.getUserByID);
router.get('/:owneremail/accounts', _auth.default.isLoggedIn, _userController.default.getAccountsByOwnerEmail);
router.post('/', _auth.default.isLoggedIn, _auth.default.isAdmin, _validations.default.validateNewStaff, _userController.default.createStaff);
router.delete('/:id', _auth.default.isLoggedIn, _auth.default.isAdmin, _userController.default.deleteUser);
var _default = router;
exports.default = _default;