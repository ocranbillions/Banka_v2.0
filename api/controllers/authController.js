import { hashSync, compareSync } from 'bcryptjs';
import { generateToken } from '../helpers/helpers';
import models from '../database/models';

const AuthController = {

  /**
   * @description sign up a new user
   * @method signUp
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  async signUp(req, res, next) {
    try {
      let {
        firstName, lastName, email, password
      } = req.body;
      email = email.toLowerCase();

      const emailFound = await models.User.findOne({ where: { email } });
      if (emailFound) {
        return res.status(409).json({
          status: 409,
          errorMessage: 'Email already used',
        });
      }

      const pwdHash = hashSync(password, 10);
      const userInfo = { ...req.body, email, password: pwdHash };
      const user = await models.User.create({
        ...req.body, email, password: pwdHash });

      const payload = {
        email,
        firstName,
        lastName,
        type: 'client',
        isAdmin: false,
        id: user.dataValues.id,
      };
      const token = generateToken(payload);

      return res.status(201).json({
        status: 201,
        data: { token, ...userInfo },
      });

    } catch (error) {
      next(error);
    }
  },

  /**
   * @description sign in a user
   * @method signIn
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  async signIn(req, res) {
    let { email, password } = req.body;
    email = email.toLowerCase();

    const user = await models.User.findOne({ where: { email } });

    // Email not found or incorrect password input
    if((!user) || (!compareSync(password, user.dataValues.password))) {
      return res.status(400).json({
        status: 400,
        errorMessage: 'Incorrect login information',
      });
    }

    const payload = {
      email,
      firstName: user.dataValues.firstName,
      lastName: user.dataValues.lastName,
      type: user.dataValues.type,
      isAdmin: user.dataValues.isAdmin,
      id: user.dataValues.id,
    };
    const token = generateToken(payload);

    return res.status(200).json({
      status: 200,
      data: {
        token,
      },
    });
  },
};

export default AuthController;
