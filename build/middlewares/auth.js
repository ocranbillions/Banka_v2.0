"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var _default = {
  isLoggedIn: function isLoggedIn(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(401).json({
        status: 401,
        errorMessage: 'You must be logged in to access this route'
      });
    }

    var token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        status: 401,
        errorMessage: 'Invalid token'
      });
    }

    try {
      var decoded = _jsonwebtoken.default.verify(token, process.env.SECRET);

      req.userData = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({
        status: 401,
        errorMessage: 'Auth failed!'
      });
    }
  },
  isAdmin: function isAdmin(req, res, next) {
    if (req.userData.isadmin === false) {
      return res.status(403).json({
        status: 403,
        errorMessage: 'Forbidden: You are not an admin'
      });
    }

    return next();
  },
  isStaff: function isStaff(req, res, next) {
    if (req.userData.type !== 'staff') {
      return res.status(403).json({
        status: 403,
        errorMessage: 'Forbidden: The requested page can only be accessed by a staff'
      });
    }

    return next();
  }
};
exports.default = _default;