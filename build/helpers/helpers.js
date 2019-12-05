"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var Helpers = {
  createToken: function createToken(payload) {
    var token = _jsonwebtoken.default.sign(payload, process.env.SECRET, {
      expiresIn: '1day'
    });

    return token;
  },
  generateAccountNumber: function generateAccountNumber() {
    return Math.floor(1000000000 + Math.random() * 9000000000);
  },
  checkServerError: function checkServerError(queryResult, responseObject) {
    if (queryResult.name === 'error') {
      return responseObject.status(500).json({
        status: 500,
        errorMessage: 'An unexpected error occured'
      });
    }
  } // Next helper method

};
var _default = Helpers;
exports.default = _default;