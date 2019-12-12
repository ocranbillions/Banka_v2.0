import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Util from '../utils/util';

const util = new Util();

dotenv.config();

export default {
  isLoggedIn(req, res, next) {
    if (!req.headers.authorization) {
      util.setError(401, 'You must be logged in to access this route');
      return util.send(res);
    }

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      util.setError(401, 'Authorization header must be in the format "Bearer token".');
      return util.send(res);
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.userData = decoded;
      return next();
    } catch (error) {
      util.setError(401, 'Invalid token');
      return util.send(res);
    }
  },

  isAdmin(req, res, next) {
    if (req.userData.isAdmin === false) {
      util.setError(403, 'Forbidden: You are not an admin');
      return util.send(res);
    }
    return next();
  },

  isStaff(req, res, next) {
    if (req.userData.type !== 'staff') {
      util.setError(403, 'Forbidden: The requested page can only be accessed by a staff');
      return util.send(res);
    }
    return next();
  },
};
