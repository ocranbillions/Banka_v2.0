/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);
const should = chai.should();

let staffToken;
let clientToken;
const staffLogin = { email: 'mikejones@gmail.com', password: 'somesecret' };
const clientLogin = { email: 'joe@gmail.com', password: 'joeboy123' };

describe('TRANSACTIONS', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send(staffLogin)
      .end((err, res) => {
        if (err) done(err);
        staffToken = res.body.data.token;
        done();
      });
  });
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send(clientLogin)
      .end((err, res) => {
        if (err) done(err);
        clientToken = res.body.data.token;
        done();
      });
  });


  describe('api/v1/transactions', () => {
    it('Should get all transactions', async () => {
      const res = await chai.request(server).get('/api/v1/transactions/').set('Authorization', `Bearer ${staffToken}`);
      res.body.should.have.property('data');
      res.should.have.status(200);
    });
    it('Non staff should not have access', async () => {
      const res = await chai.request(server)
        .get('/api/v1/accounts/')
        .set('Authorization', `Bearer ${clientToken}`);
      res.should.have.status(403);
      res.body.should.have.property('errorMessage')
        .eql('Forbidden: The requested page can only be accessed by a staff');
    });
    it('Should NOT get access to /transactions route if user is not logged in', async () => {
      const res = await chai.request(server).get('/api/v1/transactions/');
      res.body.should.have.property('errorMessage').eql('You must be logged in to access this route');
      res.should.have.status(401);
    });
    it('Should NOT authenticate user with invalid token', async () => {
      const res = await chai.request(server)
        .get('/api/v1/transactions/').set('Authorization', '$INVALIDTOKEN');
      res.body.should.have.property('errorMessage').eql('Invalid token');
      res.should.have.status(401);
    });
    it('Should fail if it lacks valid authentication', async () => {
      const res = await chai.request(server).get('/api/v1/transactions/')
        .set('Authorization', 'Bearer $sometoken');
      res.body.should.have.property('errorMessage').eql('Auth failed!');
      res.should.have.status(401);
    });
  });

  it('Should get specific transaction', async () => {
    const res = await chai.request(server)
      .get('/api/v1/transactions/1').set('Authorization', `Bearer ${staffToken}`);
    res.body.should.have.property('data');
    res.body.data[0].should.have.property('type');
    res.body.should.have.property('status');
    res.should.have.status(200);
  });

  it('Should be able to credit an account', async () => {
    const transaction = {
      amount: 1000,
    };
    const res = await chai.request(server)
      .post('/api/v1/transactions/3301123235/credit')
      .set('Authorization', `Bearer ${staffToken}`).send(transaction);
    res.body.should.have.property('data');
    res.should.have.status(201);
  });

  it('Should be able to debit an account', async () => {
    const transaction = {
      amount: 1000,
    };
    const res = await chai.request(server)
      .post('/api/v1/transactions/4194194410/debit')
      .set('Authorization', `Bearer ${staffToken}`).send(transaction);
    res.body.should.have.property('data');
    res.should.have.status(201);
  });
});
