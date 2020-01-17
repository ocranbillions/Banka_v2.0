import { hashSync } from 'bcryptjs';
import { User, Account } from '../../database/models';
import Util from '../utils/util';

const util = new Util();

/**
 * @description gets all users
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} response object
 */
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
        'type',
        'isAdmin',
        'createdAt'
      ],
      order: [['createdAt', 'ASC']]
    });

    util.setSuccess(200, { users });
    return util.send(res);
  } catch (error) { next(error); }
};

/**
 * @description get a user
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} response object
 */
export const getUserByID = async (req, res, next) => {
  try {
    // Check for authorization
    if (req.userData.id != req.params.id && req.userData.type !== 'staff') {
      util.setError(403, 'Forbidden: You are not allowed to view this profile');
      return util.send(res);
    }

    const user = await User.findByPk(req.params.id, {
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
        'type',
        'isAdmin',
        'createdAt'
      ],
      include: [
        { // User's bank accounts
          model: Account,
          as: 'accounts'
        },
      ]
    });

    if (!user) {
      util.setError(404, 'The user with the given id was not found');
      return util.send(res);
    }

    util.setSuccess(200, { user });
    return util.send(res);
  } catch (error) { next(error); }
};

/**
 * @description admin can create a new staff
 * @method addStaff
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} response object
 */
export const createStaff = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const lowerCasedEmail = email.toLowerCase();

    const user = await User.findOne({
      where: { email: lowerCasedEmail }
    });

    if (user) {
      util.setError(409, 'Email not available');
      return util.send(res);
    }

    const pwdHash = hashSync(password, 10);
    const staff = await User.create({
      ...req.body,
      email: lowerCasedEmail,
      password: pwdHash,
      type: 'staff'
    });

    util.setSuccess(201, { user: staff });
    return util.send(res);
  } catch (error) { next(error); }
};

/**
 * @description admin can delete a user
 * @method deleteUser
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} response object
 */
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.destroy({ where: { id: req.params.id } });
    if (!user) {
      util.setError(404, 'The user with the given id was not found');
      return util.send(res);
    }

    util.setSuccess(200, 'User successfully deleted');
    return util.send(res);
  } catch (error) { next(error); }
};
