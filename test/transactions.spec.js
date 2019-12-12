/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../api/app';

chai.use(chaiHttp);
const should = chai.should();

let adminToken, clientToken;
const adminLogin = {
  email: 'mikejones@gmail.com',
  password: 'somesecret'
};

const clientLogin = {
  email: 'joe@gmail.com',
  password: 'joeboy123'
};

describe('TRANSACTIONS', () => {
  before(async () => {
    const res = await chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send(adminLogin);
    adminToken = res.body.data.token;

    const res2 = await chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send(clientLogin);
    clientToken = res2.body.data.token;
  });

  it('Should get all transactions', async () => {
    const res = await chai
      .request(server)
      .get('/api/v1/transactions/')
      .set('Authorization', `Bearer ${adminToken}`);
    res.body.should.have.property('data');
    res.body.data.should.have.property('transactions');
    res.should.have.status(200);
  });

  it('Should get specific transaction', async () => {
    const res = await chai
      .request(server)
      .get('/api/v1/transactions/1')
      .set('Authorization', `Bearer ${adminToken}`);
    res.should.have.status(200);
    res.body.should.have.property('data');
    res.body.data.should.have.property('transaction');
    res.body.data.transaction.should.have.property('type');
    res.body.should.have.property('status');
  });

  it('Should return 404 for a not found transaction', async () => {
    const res = await chai
      .request(server)
      .get('/api/v1/transactions/2000')
      .set('Authorization', `Bearer ${clientToken}`);
    res.should.have.status(404);
    res.body.should.have.property('message').eql('Transaction not found');
  });

  it('Should forbid third-party from getting', async () => {
    const res = await chai
      .request(server)
      .get('/api/v1/transactions/2')
      .set('Authorization', `Bearer ${clientToken}`);
    res.should.have.status(403);
    res.body.should.have
      .property('message')
      .eql('Forbidden: You are not allowed to access this transaction');
  });

  it('Should be able to credit an account', async () => {
    const transaction = {
      amount: 1000
    };
    const res = await chai
      .request(server)
      .post('/api/v1/transactions/4194194410/credit')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(transaction);
    res.should.have.status(201);
    res.body.data.should.have.property('transaction');
    res.body.data.transaction.should.have.property('type').eql('credit');
    res.body.data.transaction.should.have.property('amount').eql(1000);
  });

  it('Should NOT be able to credit a non-existing account', async () => {
    const transaction = {
      amount: 1000
    };
    const res = await chai
      .request(server)
      .post('/api/v1/transactions/11111111/credit')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(transaction);
    res.should.have.status(404);
    res.body.should.have
      .property('message')
      .eql('The account with the given number was not found');
  });

  it('Should NOT be able to credit a non-active account', async () => {
    const transaction = {
      amount: 1000
    };
    const res = await chai
      .request(server)
      .post('/api/v1/transactions/1212452132/credit')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(transaction);
    res.should.have.status(406);
    res.body.should.have.property('message').eql("This account isn't active");
  });

  it('Should be able to debit an account', async () => {
    const transaction = {
      amount: 1000
    };
    const res = await chai
      .request(server)
      .post('/api/v1/transactions/4194194410/debit')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(transaction);
    res.should.have.status(201);
    res.body.data.should.have.property('transaction');
    res.body.data.transaction.should.have.property('type').eql('debit');
    res.body.data.transaction.should.have.property('amount').eql(1000);
  });

  it('Should not be able to debit an account with insufficient funds', async () => {
    const transaction = {
      amount: 50000000
    };
    const res = await chai
      .request(server)
      .post('/api/v1/transactions/4194194410/debit')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(transaction);
    res.should.have.status(406);
    res.body.should.have
      .property('message')
      .eql('Sorry, you do not have enough funds for this request');
  });

  it('Should NOT be able to debit a non-existing account', async () => {
    const transaction = {
      amount: 1000
    };
    const res = await chai
      .request(server)
      .post('/api/v1/transactions/11111111/debit')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(transaction);
    res.should.have.status(404);
    res.body.should.have
      .property('message')
      .eql('The account with the given number was not found');
  });

  it('Should NOT be able to debit a non-active account', async () => {
    const transaction = {
      amount: 1000
    };
    const res = await chai
      .request(server)
      .post('/api/v1/transactions/1212452132/debit')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(transaction);
    res.should.have.status(406);
    res.body.should.have.property('message').eql("This account isn't active");
  });
});
