/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swagger from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

// routes
import accountRoutes from './routes/accountRoutes';
import transactionRoutes from './routes/transactionRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// swagger
server.use('/api-docs', swagger.serve, swagger.setup(swaggerDocument));

server.get('/', (req, res) => {
  res.send('Welcome to Banka!');
});

server.use('/api/v1/auth', authRoutes);
// server.use('/api/v1/users', userRoutes);
// server.use('/api/v1/accounts', accountRoutes);
// server.use('/api/v1/transactions', transactionRoutes);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`server is listening on port ${port}!`);
});

// Export for testing
export default server;
