import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const generateToken = (payload) => {
  const token = jwt.sign(
    payload,
    process.env.SECRET,
    { expiresIn: '1day' },
  );
  return token;
};

export const generateAccountNumber = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000);
};

export const checkServerError = (queryResult, responseObject) => {
  if (queryResult.name === 'error') {
    return responseObject.status(500).json({
      status: 500,
      errorMessage: 'An unexpected error occured',
    });
  }
}
