"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _authController = _interopRequireDefault(require("../controllers/authController"));

var _validations = _interopRequireDefault(require("../middlewares/validations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.post('/signup', _validations.default.validateSignUp, _authController.default.signUp);
router.post('/signin', _validations.default.validateSingnIn, _authController.default.signIn);
var _default = router;
exports.default = _default;