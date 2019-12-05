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

    }catch (error) {
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
    if(!user) {
      return res.status(404).json({
        status: 404,
        errorMessage: 'User not found',
      });
    }

    if((!compareSync(password, user.dataValues.password))) {
      return res.status(404).json({
        status: 404,
        errorMessage: 'Wrong password',
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

    return res.status(201).json({
      status: 201,
      data: {
        token,
      },
    });

    // const result = await AuthServices.signIn(req.body);
    // helpers.checkServerError(result, res);

    // // Wrong email || password
    // if (result.rows < 1 || !bcrypt.compareSync(req.body.password, result.rows[0].password)) {
    //   return res.status(400).json({
    //     status: 400,
    //     errorMessage: 'Incorrect login information',
    //   });
    // }
    

    // const user = result.rows[0];
    // const token = helpers.generateToken(user.id, user.email, user.firstname, user.lastname, user.type, user.isadmin);
    // const {
    //   id, email, firstname, lastname, type, isadmin,
    // } = user;

    // return res.status(201).json({
    //   status: 201,
    //   data: {
    //     token, id, email, firstname, lastname, type, isadmin,
    //   },
    // });
  },
};

export default AuthController;
