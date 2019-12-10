/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swagger from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

// Api routes
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import accountRoutes from './routes/accountRoutes';
import transactionRoutes from './routes/transactionRoutes';


const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// Api documentation
server.use('/api-docs', swagger.serve, swagger.setup(swaggerDocument));

server.get('/', (req, res) => {
  res.send('Welcome to Banka!');
});

server.use('/api/v1/auth', authRoutes);
server.use('/api/v1/users', userRoutes);
server.use('/api/v1/accounts', accountRoutes);
server.use('/api/v1/transactions', transactionRoutes);

server.use((error, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(error.stack);
  }

  return res.status(500).json({
    status: 500,
    message: 'Oops! something terrible happened. Try again.',
  });
});

// handle's random route
server.get('*', (req, res) => res.status(404).json({
  status: 404,
  message: 'Page not found!'
}));


const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`server is listening on port ${port}!`);
});

export default server;
