import Joi from 'joi';
import Util from '../utils/util';

const util = new Util();

export const validateNewStaff = (req, res, next) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().regex(/^[A-Za-z]+$/).min(2).error(() => ({
      message: 'name requires alphabets only - min(2)',
    }))
      .required(),
    lastName: Joi.string().regex(/^[A-Za-z]+$/).min(2).error(() => ({
      message: 'name requires alphabets only - min(2)',
    }))
      .required(),
    email: Joi.string().regex(/\S+@\S+\.\S+/).min(2).error(() => ({
      message: 'provide a valid email',
    }))
      .required(),
    password: Joi.string().min(5).required(),
    isAdmin: Joi.boolean().required(),
  });
  const result = schema.validate(req.body, { abortEarly: false });
  if (result.error) {
    const error = result.error.details.map(d => d.message);
    util.setError(400, error);
    return util.send(res);
  }
  return next();
};

export const validateNewAccount = (req, res, next) => {
  const schema = Joi.object().keys({
    accountType: Joi.string().valid('savings', 'current').required(),
    openingBalance: Joi.number().min(1000).required(),
  });
  const result = schema.validate(req.body, { abortEarly: false });
  if (result.error) {
    const error = result.error.details.map(d => d.message);
    util.setError(400, error);
    return util.send(res);
  }
  return next();
};

export const validateSignUp = (req, res, next) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().regex(/^[A-Za-z]+$/).min(2).error(() => ({
      message: 'name requires alphabets only - min(2)',
    }))
      .required(),
    lastName: Joi.string().regex(/^[A-Za-z]+$/).min(2).error(() => ({
      message: 'name requires alphabets only - min(2)',
    }))
      .required(),
    email: Joi.string().regex(/\S+@\S+\.\S+/).min(2).error(() => ({
      message: 'provide a valid email',
    }))
      .required(),
    password: Joi.string().min(5).required(),
  });
  const result = schema.validate(req.body, { abortEarly: false });
  if (result.error) {
    const error = result.error.details.map(d => d.message);
    util.setError(400, error);
    return util.send(res);
  }
  return next();
};

export const validateSignIn = (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().regex(/\S+@\S+\.\S+/).min(2).error(() => ({
      message: 'provide a valid email',
    }))
      .required(),
    password: Joi.string().min(5).required(),
  });
  const result = schema.validate(req.body, { abortEarly: false });
  if (result.error) {
    const error = result.error.details.map(d => d.message);
    util.setError(400, error);
    return util.send(res);
  }
  return next();
};

export const validateTransaction = (req, res, next) => {
  const schema = {
    amount: Joi.number().min(1000).required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    util.setError(400, result.error.message);
    return util.send(res);
  }
  return next();
};

// next validator here
