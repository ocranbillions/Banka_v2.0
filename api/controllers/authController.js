import { hashSync, compareSync } from 'bcryptjs';
import { User } from '../database/models';
import generateToken from '../utils/generateToken';
import Util from '../utils/util';

const util = new Util();

export const signUp = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const lowerCasedEmail = email.toLowerCase();

    const emailFound = await User.findOne({ where: { email: lowerCasedEmail } });
    if (emailFound) {
      util.setError(409, 'Email not available');
      return util.send(res);
    }

    const pwdHash = hashSync(password, 10);
    const user = await User.create({
      ...req.body, email: lowerCasedEmail, password: pwdHash });

    const payload = {
      firstName,
      lastName,
      email: lowerCasedEmail,
      type: 'client',
      isAdmin: false,
      id: user.dataValues.id,
    };
    const token = generateToken(payload);
    util.setSuccess(201, { token });
    return util.send(res);
  } catch (error) { next(error); }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const lowerCasedEmail = email.toLowerCase();

    const user = await User.findOne({ where: { email: lowerCasedEmail } });

    // Incorrect email || Incorrect password
    if ((!user) || (!compareSync(password, user.dataValues.password))) {
      util.setError(400, 'Incorrect login information');
      return util.send(res);
    }

    const payload = {
      firstName: user.dataValues.firstName,
      lastName: user.dataValues.lastName,
      email: lowerCasedEmail,
      type: user.dataValues.type,
      isAdmin: user.dataValues.isAdmin,
      id: user.dataValues.id,
    };
    const token = generateToken(payload);
    util.setSuccess(200, { token });
    return util.send(res);
  } catch (error) { next(error); }
};
