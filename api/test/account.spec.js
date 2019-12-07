/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);
const should = chai.should();


let adminToken, clientToken;
const adminLogin = {
  email: 'mikejones@gmail.com',
  password: 'somesecret' };

const clientLogin = {
  email: 'joe@gmail.com',
  password: 'joeboy123' };

describe('ACCOUNTS', () => {
  before(async () => {
    const res = await chai.request(server).post('/api/v1/auth/signin').send(adminLogin);
    adminToken = res.body.data.token;

    const res2 = await chai.request(server).post('/api/v1/auth/signin').send(clientLogin);
    clientToken = res2.body.data.token;
  });


  describe('GET ALL ACCOUNTS', () => {
    it('Admin should get all accounts', async () => {
      const res = await chai.request(server)
        .get('/api/v1/accounts/')
        .set('Authorization', `Bearer ${adminToken}`);
      res.should.have.status(200);
      res.body.should.have.property('data');
      res.body.should.have.property('status');
    });
    it('Should NOT get access /accounts if user is not logged in', async () => {
      const res = await chai.request(server)
        .get('/api/v1/accounts/');
      res.should.have.status(401);
      res.body.should.have.property('message')
        .eql('You must be logged in to access this route');
    });
    it('Should NOT authenticate user with invalid token', async () => {
      const res = await chai.request(server)
        .get('/api/v1/accounts/')
        .set('Authorization', '$INVALIDTOKEN');
      res.should.have.status(401);
      res.body.should.have.property('message').eql('Invalid token');
    });
    it('Should fail if it lacks valid authentication', async () => {
      const res = await chai.request(server)
        .get('/api/v1/accounts/')
        .set('Authorization', 'Bearer $sometoken');
      res.should.have.status(401);
      res.body.should.have.property('message').eql('Auth failed!');
    });
    it('Non staff should not have access', async () => {
      const res = await chai.request(server)
        .get('/api/v1/accounts/')
        .set('Authorization', `Bearer ${clientToken}`);
      res.should.have.status(403);
      res.body.should.have.property('message')
        .eql('Forbidden: The requested page can only be accessed by a staff');
    });
  });

  // describe('GET api/v1/accounts/joe@gmail.com/accounts', () => {
  //   it('Admin/staff or account owner should get their accounts', async () => {
  //     const res = await chai.request(server)
  //       .get('/api/v1/accounts/joe@gmail.com/accounts')
  //       .set('Authorization', `Bearer ${adminToken}`);
  //     res.should.have.status(200);
  //     res.body.should.have.property('status');
  //     res.body.should.have.property('data');
  //     res.body.data.should.be.a('array');
  //     res.body.data[0].should.be.a('object');
  //   });
  //   it('Should NOT get access to /accounts if user is not logged in', async () => {
  //     const res = await chai.request(server).get('/api/v1/accounts/joe@gmail.com/accounts');
  //     res.should.have.status(401);
  //     res.body.should.have.property('message');
  //     res.body.message.should.equal('You must be logged in to access this route');
  //   });
  //   it('Should NOT authorize user with invalid token', async () => {
  //     const res = await chai.request(server).get('/api/v1/accounts/joe@gmail.com/accounts')
  //       .set('Authorization', '$INVALIDTOKEN');
  //     res.should.have.status(401);
  //     res.body.should.have.property('message');
  //     res.body.message.should.equal('Invalid token');
  //   });
  //   it('Should fail if it lacks valid authentication', async () => {
  //     const res = await chai.request(server).get('/api/v1/accounts/joe@gmail.com/accounts')
  //       .set('Authorization', 'Bearer $sometoken');
  //     res.should.have.status(401);
  //     res.body.should.have.property('message');
  //     res.body.message.should.equal('Auth failed!');
  //   });
  // });

  describe('GET ACCOUNT/NUMBER', () => {
    it('Should get a single account', async () => {
      const res = await chai.request(server)
        .get('/api/v1/accounts/4194194410')
        .set('Authorization', `Bearer ${adminToken}`);
      res.should.have.status(200);
      res.body.should.have.property('data');
      res.body.should.have.property('status');
    });

    it('Should NOT get an invalid account number', async () => {
      const res = await chai.request(server)
        .get('/api/v1/accounts/77854')
        .set('Authorization', `Bearer ${adminToken}`);
      res.should.have.status(404);
      res.body.should.have.property('message')
        .eql('The account with the given number was not found');
    });
  });

  // it('Should get all transactions on an account', async () => {
  //   const res = await chai.request(server)
  //     .get('/api/v1/accounts/9852136521/transactions')
  //     .set('Authorization', `Bearer ${adminToken}`);
  //   res.should.have.status(200);
  //   res.body.should.have.property('data');
  //   res.body.should.have.property('status');
  // });

  // /Test case for creating an account
  describe('POST ACCOUNT', () => {
    it('Should create an account', async () => {
      const newAccount = {
        accountType: 'savings',
        openingBalance: 5000.00,
      };
      const res = await chai.request(server).post('/api/v1/accounts/')
        .set('Authorization', `Bearer ${adminToken}`).send(newAccount);
      res.should.have.status(201);
      res.body.should.have.property('data');
      res.body.data.account.accountType.should.equal('savings');
      res.body.data.account.balance.should.equal(5000.00);
      res.body.should.have.property('status');
    });

    it('Should NOT create an account with incomplete form data', async () => {
      const newAccount = {
        accountOwner: '',
        type: 'savings',
        openingBalance: '67500.00',
      };
      const res = await chai.request(server).post('/api/v1/accounts/')
        .set('Authorization', `Bearer ${adminToken}`).send(newAccount);
      res.should.have.status(400);
      res.body.should.have.property('message');
    });
  });

  // Test case for changing an account status
  describe('PATCH ACCOUNT', () => {
    it('Should change an account status', async () => {
      const formData = {
        status: 'dormant',
      };
      const res = await chai.request(server).patch('/api/v1/accounts/5421214520')
        .set('Authorization', `Bearer ${adminToken}`).send(formData);
      res.should.have.status(200);
      res.body.should.have.property('data');
    });

    it('Should NOT change an account status with invalid acc number', async () => {
      const formData = {
        status: 'dormant',
      };
      const res = await chai.request(server).patch('/api/v1/accounts/54546546544646')
        .set('Authorization', `Bearer ${adminToken}`).send(formData);
      res.should.have.status(404);
      res.body.should.have.property('message')
        .eql('The account with the given number was not found');
    });
    it('should allow only admin to change account status', async () => {
      const res = await chai.request(server)
        .patch(`/api/v1/accounts/3301123235`)
        .set('Authorization', `Bearer ${clientToken}`);
      res.should.have.status(403);
      res.body.should.have.property('message')
        .eql('Forbidden: You are not an admin');
    });
  });

  // Test case for deleting an account
  describe('DELETE ACCOUNT', () => {
    it('Should delete an account', async () => {
      const res = await chai.request(server).delete(`/api/v1/accounts/3301123235`)
        .set('Authorization', `Bearer ${adminToken}`);
      res.should.have.status(200);
      res.body.should.have.property('status');
      // res.body.should.have.property('message').eql('Account successfully deleted');
      res.body.should.have.property('data').eql('Account successfully deleted');
    });

    it('Should NOT delete an invalid acccount', async () => {
      const res = await chai.request(server).delete('/api/v1/accounts/5232')
        .set('Authorization', `Bearer ${adminToken}`);
      res.should.have.status(404);
      res.body.should.have.property('message')
        .eql('The account with the given number was not found');
    });
    it('should allow only admin to delete', async () => {
      const res = await chai.request(server)
        .delete(`/api/v1/accounts/3301123235`)
        .set('Authorization', `Bearer ${clientToken}`);
      res.should.have.status(403);
      res.body.should.have.property('message')
        .eql('Forbidden: You are not an admin');
    });
  });
});
