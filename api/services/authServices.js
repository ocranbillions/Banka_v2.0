/* eslint-disable no-else-return */
/* eslint-disable no-console */
import bcrypt from 'bcrypt';
import dbServices from '../db/config';

const { db } = dbServices;

const AuthServices = {

  /**
  * @description registers new user
  * @param {object} user user's info
  * @returns {object} response object
  */
  async signUp(user) {
    const insertQuery = `INSERT INTO users(email, firstName, lastName, type, isAdmin, password) 
                              VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, email, firstName, lastName, type, isAdmin`;

    
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    const email = user.email.toLowerCase();
    try {

      // const searchQuery = 'SELECT * FROM users;';
      // const result1 = await db.query(searchQuery);
      
      //  console.log(1111, result1.rows);

      // const result = await db.query(insertQuery, [email, user.firstName, user.lastName, 'client', false, hashedPassword]);

      // const insertQuery = `INSERT INTO users(email, firstName, lastName, type, isAdmin, password) 
      // VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, email, firstName, lastName, type, isAdmin`;
      const result = await db.query(`INSERT INTO users (email, "firstName", "lastName", type, "isAdmin", password) VALUES ('emailll@emaillls.com', 'myFirstName', 'myLastName', 'client', ${false}, 'password') RETURNING id, email, firstName, lastName, type, isAdmin;`);
      console.log('We got here.......', result)
      return result;
    } catch (error) {
      console.log(error)
      console.log('we caught an error=======')
      return error;
    }
  },

  /**
  * @description sign's in user
  * @param {object} user user's login details
  * @returns {object} response object
  */
  async signIn(user) {
    try {
      const email = user.email.toLowerCase();
      const searchQuery = 'SELECT * FROM users WHERE email=$1';
      const result = await db.query(searchQuery, [email]);
      return result;
    } catch (error) {
      return error;
    }
  },
};

export default AuthServices;
