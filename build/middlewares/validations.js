"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Validations = {
  validateNewStaff: function validateNewStaff(req, res, next) {
    var schema = _joi.default.object().keys({
      firstName: _joi.default.string().regex(/^[A-Za-z]+$/).min(2).error(function () {
        return {
          message: 'name requires alphabets only - min(2)'
        };
      }).required(),
      lastName: _joi.default.string().regex(/^[A-Za-z]+$/).min(2).error(function () {
        return {
          message: 'name requires alphabets only - min(2)'
        };
      }).required(),
      email: _joi.default.string().regex(/\S+@\S+\.\S+/).min(2).error(function () {
        return {
          message: 'provide a valid email'
        };
      }).required(),
      password: _joi.default.string().min(5).required(),
      isAdmin: _joi.default.boolean().required()
    });

    var result = schema.validate(req.body, {
      abortEarly: false
    });

    if (result.error) {
      var error = result.error.details.map(function (d) {
        return d.message;
      });
      return res.status(400).json({
        status: 400,
        errorMessage: error
      });
    }

    return next();
  },
  validateNewAccount: function validateNewAccount(req, res, next) {
    var schema = _joi.default.object().keys({
      type: _joi.default.string().valid('savings', 'current').required(),
      openingBalance: _joi.default.number().min(1000).required()
    });

    var result = schema.validate(req.body, {
      abortEarly: false
    });

    if (result.error) {
      var error = result.error.details.map(function (d) {
        return d.message;
      });
      return res.status(400).json({
        status: 400,
        errorMessage: error
      });
    }

    return next();
  },
  validateSignUp: function validateSignUp(req, res, next) {
    var schema = _joi.default.object().keys({
      firstName: _joi.default.string().regex(/^[A-Za-z]+$/).min(2).error(function () {
        return {
          message: 'name requires alphabets only - min(2)'
        };
      }).required(),
      lastName: _joi.default.string().regex(/^[A-Za-z]+$/).min(2).error(function () {
        return {
          message: 'name requires alphabets only - min(2)'
        };
      }).required(),
      email: _joi.default.string().regex(/\S+@\S+\.\S+/).min(2).error(function () {
        return {
          message: 'provide a valid email'
        };
      }).required(),
      password: _joi.default.string().min(5).required()
    });

    var result = schema.validate(req.body, {
      abortEarly: false
    });

    if (result.error) {
      var error = result.error.details.map(function (d) {
        return d.message;
      });
      return res.status(400).json({
        status: 400,
        errorMessage: error
      });
    }

    return next();
  },
  validateSingnIn: function validateSingnIn(req, res, next) {
    var schema = _joi.default.object().keys({
      email: _joi.default.string().regex(/\S+@\S+\.\S+/).min(2).error(function () {
        return {
          message: 'provide a valid email'
        };
      }).required(),
      password: _joi.default.string().min(5).required()
    });

    var result = schema.validate(req.body, {
      abortEarly: false
    });

    if (result.error) {
      var error = result.error.details.map(function (d) {
        return d.message;
      });
      return res.status(400).json({
        status: 400,
        errorMessage: error
      });
    }

    return next();
  },
  validateTransaction: function validateTransaction(req, res, next) {
    var schema = {
      amount: _joi.default.number().min(1000).required()
    };

    var result = _joi.default.validate(req.body, schema);

    if (result.error) {
      return res.status(400).json({
        status: 400,
        errorMessage: result.error.message
      });
    }

    return next();
  } // next validator here

};
var _default = Validations;
exports.default = _default;