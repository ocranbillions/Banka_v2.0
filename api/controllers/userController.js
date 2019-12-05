import UserServices from '../services/userServices';
import helpers from '../helpers/helpers';

const UserController = {

  /**
  * @description get all users
  * @param {object} req
  * @param {object} res
  * @returns {object} response object
  */
  async getUsers(req, res) {
    const result = await UserServices.getUsers();
    helpers.checkServerError(result, res);

    return res.status(200).json({
      status: 200,
      data: result.rows,
    });
  },

  /**
  * @description get a user
  * @param {object} req
  * @param {object} res
  * @returns {object} response object
  */
  async getUserByID(req, res) {
    const result = await UserServices.getUserByID(req.params.id);
    helpers.checkServerError(result, res);

    if (result.rows < 1) {
      return res.status(404).json({
        status: 404,
        errorMessage: 'The user with the given number was not found',
      });
    }
    // Check for authorization
    const profileID = result.rows[0].id;
    if (req.userData.id !== profileID && req.userData.type !== 'staff') {
      return res.status(403).json({
        status: 403,
        errorMessage: 'Forbidden: You are not allowed to view this profile',
      });
    }
    // Return retrived user
    const user = result.rows[0];
    return res.json({
      status: 200,
      data: user,
    });
  },

  /**
  * @description get all bank accounts owned by a user
  * @param {object} req
  * @param {object} res
  * @returns {object} response object
  */
  async getAccountsByOwnerEmail(req, res) {
    // Lookup email
    const email = req.params.owneremail.toLowerCase();
    const resp = await UserServices.getUserByEmail(email);
    helpers.checkServerError(resp, res);

    if (resp.rows < 1) {
      return res.status(404).json({
        status: 404,
        errorMessage: 'The user with the given email was not found',
      });
    }

    const result = await UserServices.getAccountsByOwnerEmail(email);
    helpers.checkServerError(result, res);

    if (result.rows < 1) {
      return res.status(404).json({
        status: 404,
        errorMessage: 'No accounts for this user yet',
      });
    }
    // Check for authorization
    const ownerEmail = result.rows[0].owneremail;
    if (req.userData.email !== ownerEmail && req.userData.type !== 'staff') {
      return res.status(403).json({
        status: 403,
        errorMessage: 'Forbidden: You are not allowed to access these accounts',
      });
    }

    // Return retrived account
    const accounts = result.rows;
    return res.json({
      status: 200,
      data: accounts,
    });
  },

  /**
  * @description admin can create a new staff
  * @method addStaff
  * @param {object} req
  * @param {object} res
  * @returns {object} response object
  */
  async createStaff(req, res) {
    const result = await UserServices.createStaff(req.body);
    if (result.constraint === 'users_email_key') {
      return res.status(409).json({
        status: 409,
        errorMessage: 'Email already used',
      });
    }
    // Return newly created staff
    const newStaff = result;
    return res.status(201).json({
      status: 201,
      data: newStaff,
    });
  },

  /**
  * @description admin can create a new staff
  * @method addStaff
  * @param {object} req
  * @param {object} res
  * @returns {object} response object
  */
  async deleteUser(req, res) {
    const result = await UserServices.deleteUser(req.params.id);
    helpers.checkServerError(result, res);

    if (result.rowCount < 1) {
      return res.status(404).json({
        status: 404,
        errorMessage: 'The user with the given number was not found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'User successfully deleted',
    });
  },

};

export default UserController;
