import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (payload) => {
  const token = jwt.sign(
    payload,
    process.env.SECRET,
    { expiresIn: '1day' },
  );
  return token;
};

export default generateToken;