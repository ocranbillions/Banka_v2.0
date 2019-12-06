import { hashSync } from 'bcryptjs';
import { User } from '../database/models';
import Util from '../utils/util';

const util = new Util();

/**
* @description gets all users
* @param {object} req
* @param {object} res
* @returns {object} response object
*/
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email', 'type', 'isAdmin', 'createdAt'],
      order: [ ['createdAt', 'ASC'], ],
    });

    util.setSuccess(200, { users });
    return util.send(res);
  } catch (error) { next(error) }
}


/**
* @description get a user
* @param {object} req
* @param {object} res
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
      attributes: ['id', 'firstName', 'lastName', 'email', 'type', 'isAdmin', 'createdAt'],
    });

    if(!user) {
      util.setError(404, 'The user with the given number was not found');
      return util.send(res);
    }

    util.setSuccess(200, { user });
    return util.send(res);
  } catch (error) { next(error) }
}

// /**
//  * @description get all bank accounts owned by a user
//  * @param {object} req
//  * @param {object} res
//  * @returns {object} response object
//  */
// async getAccountsByOwnerEmail(req, res) {
// // Lookup email
// const email = req.params.owneremail.toLowerCase();
// const resp = await UserServices.getUserByEmail(email);
// helpers.checkServerError(resp, res);

// if (resp.rows < 1) {
//     return res.status(404).json({
//     status: 404,
//     errorMessage: 'The user with the given email was not found',
//     });
// }

// const result = await UserServices.getAccountsByOwnerEmail(email);
// helpers.checkServerError(result, res);

// if (result.rows < 1) {
//     return res.status(404).json({
//     status: 404,
//     errorMessage: 'No accounts for this user yet',
//     });
// }
// // Check for authorization
// const ownerEmail = result.rows[0].owneremail;
// if (req.userData.email !== ownerEmail && req.userData.type !== 'staff') {
//     return res.status(403).json({
//     status: 403,
//     errorMessage: 'Forbidden: You are not allowed to access these accounts',
//     });
// }

// // Return retrived account
// const accounts = result.rows;
// return res.json({
//     status: 200,
//     data: accounts,
// });
// },

/**
 * @description admin can create a new staff
 * @method addStaff
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
export const createStaff = async (req, res, next) => {
  try {
  const {  email, password } = req.body;
  const lowerCasedEmail = email.toLowerCase();

  const emailFound = await User.findOne({ where: { email: lowerCasedEmail } });
  if (emailFound) {
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
  } catch (error) { next(error) }
}


/**
 * @description admin can delete a user
 * @method deleteUser
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.destroy({ where: { id: req.params.id }});
    if(!user) {
      util.setError(404, 'The user with the given number was not found');
      return util.send(res);
    }
  
    util.setSuccess(200, 'User successfully deleted');
    return util.send(res);
  } catch (error) { next(error) }
}