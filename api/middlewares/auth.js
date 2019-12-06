import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default {
  isLoggedIn(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(401).json({
        status: 401,
        message: 'You must be logged in to access this route',
      });
    }

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        status: 401,
        message: 'Invalid token',
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.userData = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({
        status: 401,
        message: 'Auth failed!',
      });
    }
  },

  isAdmin(req, res, next) {
    if (req.userData.isAdmin === false) {
      return res.status(403).json({
        status: 403,
        message: 'Forbidden: You are not an admin',
      });
    }
    return next();
  },

  isStaff(req, res, next) {
    if (req.userData.type !== 'staff') {
      return res.status(403).json({
        status: 403,
        message: 'Forbidden: The requested page can only be accessed by a staff',
      });
    }
    return next();
  },
};
