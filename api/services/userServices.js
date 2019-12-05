/* eslint-disable no-else-return */
/* eslint-disable no-console */
import bcrypt from 'bcryptjs';
import dbServices from '../db/config';

const { db } = dbServices;

const UserController = {

  /**
  * @description gets all users
  * @returns {object} response object
  */
  async getUsers() {
    try {
      const searchQuery = 'SELECT id, email, firstName, lastName, type, isAdmin FROM users';
      const result = await db.query(searchQuery);
      return result;
    } catch (error) {
      return error;
    }
  },

  /**
  * @description gets a specific user
  * @param {object} id id of user
  * @returns {object} response object
  */
  async getUserByID(id) {
    try {
      const searchQuery = 'SELECT id, email, firstName, lastName, type, isAdmin FROM users WHERE id=$1';
      const result = await db.query(searchQuery, [id]);
      return result;
    } catch (error) {
      return error;
    }
  },

  /**
* @description gets a specific user
* @param {object} email of user
* @returns {object} response object
*/
  async getUserByEmail(email) {
    try {
      const searchQuery = 'SELECT id, email, firstName, lastName, type, isAdmin FROM users WHERE email=$1';
      const result = await db.query(searchQuery, [email]);
      return result;
    } catch (error) {
      return error;
    }
  },


  /**
  * @description gets all bank account of a user
  * @param {object} email email of the user
  * @returns {object} response object
  */
  async getAccountsByOwnerEmail(email) {
    try {
      const searchQuery = 'SELECT * FROM accounts WHERE owneremail=$1';
      const result = await db.query(searchQuery, [email]);
      return result;
    } catch (error) {
      return error;
    }
  },

  /**
  * @description creates a new staff by admin
  * @param {object} staff details of staff
  * @returns {object} response object
  */
  async createStaff(staff) {
    try {
      const insertQuery = `INSERT INTO users(email, firstName, lastName, type, isAdmin, password) 
                                VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, email, firstName, lastName, type, isAdmin`;

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(staff.password, salt);
      const email = staff.email.toLowerCase();
      const result = await db.query(insertQuery, [email, staff.firstName, staff.lastName, 'staff', staff.isAdmin, hashedPassword]);
      return result.rows[0];
    } catch (error) {
      return error;
    }
  },

  /**
  * @description delete a specific user
  * @param {object} id id of transaction
  * @returns {object} response object
  */
  async deleteUser(id) {
    try {
      const deleteQuery = 'DELETE FROM users WHERE id=$1';
      const result = await db.query(deleteQuery, [id]);
      return result;
    } catch (error) {
      return error;
    }
  },
};

export default UserController;
