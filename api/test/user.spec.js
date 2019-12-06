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


describe('USERS', () => {
  before(async () => {
    const res = await chai.request(server).post('/api/v1/auth/signin').send(adminLogin);
    adminToken = res.body.data.token;

    const res2 = await chai.request(server).post('/api/v1/auth/signin').send(clientLogin);
    clientToken = res2.body.data.token;
  });

  describe('GET USERS', () => {
    it('Admin/staff should get all users', async () => {
      const res = await chai.request(server)
        .get('/api/v1/users/')
        .set('Authorization', `Bearer ${adminToken}`);
      res.should.have.status(200);
      res.body.should.have.property('data');
      res.body.data.users.should.be.a('array');
      res.body.data.users[0].should.be.a('object');
      res.body.data.users[0].id.should.equal(1);
      res.body.data.users[0].email.should.equal('mikejones@gmail.com');
      res.body.data.users[0].firstName.should.equal('Mike');
      res.body.data.users[0].lastName.should.equal('Jones');
      res.body.data.users[0].type.should.equal('staff');
      res.body.data.users[0].isAdmin.should.equal(true);
    });

    it('Should NOT get access to /users if user is not logged in', async () => {
      const res = await chai.request(server).get('/api/v1/users/');
      res.should.have.status(401);
      res.body.should.have.property('message');
      res.body.message.should.equal('You must be logged in to access this route');
    });

    it('Should NOT authorize user with invalid token', async () => {
      const res = await chai.request(server).get('/api/v1/users/')
        .set('Authorization', '$INVALIDTOKEN');
      res.should.have.status(401);
      res.body.should.have.property('message');
      res.body.message.should.equal('Invalid token');
    });

    it('Should fail if it lacks valid authentication', async () => {
      const res = await chai.request(server).get('/api/v1/users/')
        .set('Authorization', 'Bearer $sometoken');
      res.should.have.status(401);
      res.body.should.have.property('message');
      res.body.message.should.equal('Auth failed!');
    });

    it('Should deny non-staff', async () => {
      const res = await chai.request(server).get('/api/v1/users/')
        .set('Authorization', `Bearer ${clientToken}`);
      res.should.have.status(403);
      res.body.should.have.property('message');
      res.body.message.should.equal('Forbidden: The requested page can only be accessed by a staff');
    });
  });

  describe('GET USER/ID', () => {
    it('Admin/staff can get user by id', async () => {
      const res = await chai.request(server)
        .get('/api/v1/users/1')
        .set('Authorization', `Bearer ${adminToken}`);
      res.should.have.status(200);
      res.body.should.have.property('status');
      res.body.should.have.property('data');
      res.body.data.user.should.be.a('object');
      res.body.data.user.id.should.equal(1);
      res.body.data.user.email.should.equal('mikejones@gmail.com');
      res.body.data.user.firstName.should.equal('Mike');
      res.body.data.user.lastName.should.equal('Jones');
      res.body.data.user.type.should.equal('staff');
      res.body.data.user.isAdmin.should.equal(true);
    });
    it('Should NOT get access to /users if user is not logged in', async () => {
      const res = await chai.request(server).get('/api/v1/users/1');
      res.should.have.status(401);
      res.body.should.have.property('message');
      res.body.message.should.equal('You must be logged in to access this route');
    });
    it('Should NOT authorize user with invalid token', async () => {
      const res = await chai.request(server).get('/api/v1/users/1')
        .set('Authorization', '$INVALIDTOKEN');
      res.should.have.status(401);
      res.body.should.have.property('message');
      res.body.message.should.equal('Invalid token');
    });
    it('Should fail if it lacks valid authentication', async () => {
      const res = await chai.request(server).get('/api/v1/users/1')
        .set('Authorization', 'Bearer $sometoken');
      res.should.have.status(401);
      res.body.should.have.property('message');
      res.body.message.should.equal('Auth failed!');
    });
  });

  // describe('GET api/v1/users/joe@gmail.com/accounts', () => {
  //   it('Admin/staff or account owner should get their accounts', async () => {
  //     const res = await chai.request(server)
  //       .get('/api/v1/users/joe@gmail.com/accounts')
  //       .set('Authorization', `Bearer ${adminToken}`);
  //     res.should.have.status(200);
  //     res.body.should.have.property('status');
  //     res.body.should.have.property('data');
  //     res.body.data.should.be.a('array');
  //     res.body.data[0].should.be.a('object');
  //   });
  //   it('Should NOT get access to /users if user is not logged in', async () => {
  //     const res = await chai.request(server).get('/api/v1/users/joe@gmail.com/accounts');
  //     res.should.have.status(401);
  //     res.body.should.have.property('message');
  //     res.body.message.should.equal('You must be logged in to access this route');
  //   });
  //   it('Should NOT authorize user with invalid token', async () => {
  //     const res = await chai.request(server).get('/api/v1/users/joe@gmail.com/accounts')
  //       .set('Authorization', '$INVALIDTOKEN');
  //     res.should.have.status(401);
  //     res.body.should.have.property('message');
  //     res.body.message.should.equal('Invalid token');
  //   });
  //   it('Should fail if it lacks valid authentication', async () => {
  //     const res = await chai.request(server).get('/api/v1/users/joe@gmail.com/accounts')
  //       .set('Authorization', 'Bearer $sometoken');
  //     res.should.have.status(401);
  //     res.body.should.have.property('message');
  //     res.body.message.should.equal('Auth failed!');
  //   });
  // });

  describe('POST USER', () => {
    it('Admin should create a new user/staff', async () => {
      const newStaff = {
        firstName: 'Shola',
        lastName: 'Stevens',
        email: 'shola_steve@gmail.com',
        isAdmin: false,
        password: 'secret',
      };
      const res = await chai.request(server)
        .post('/api/v1/users/')
        .set('Authorization', `Bearer ${adminToken}`).send(newStaff);
      res.should.have.status(201);
      res.body.should.have.property('data');
      res.body.data.user.email.should.equal('shola_steve@gmail.com');
    });
    it('Should not create a new staff if data is incomplete', async () => {
      const newStaff = {
        firstName: '',
        lastName: 'Stevens',
        email: '',
        isAdmin: true,
        password: 'secret',
      };
      const res = await chai.request(server)
        .post('/api/v1/users/')
        .set('Authorization', `Bearer ${adminToken}`).send(newStaff);
      res.should.have.status(400);
      res.body.should.have.property('message');
      res.body.message.should.be.a('array');
      res.body.message[0].should.equal('name requires alphabets only - min(2)');
      res.body.message[1].should.equal('provide a valid email');
    });
    it('Should NOT create a new staff if email already exist', async () => {
      const newStaff = {
        firstName: 'Samson',
        lastName: 'Ogbonna',
        email: 'samo@gmail.com',
        password: '123456',
      };
      const res = await chai.request(server).post('/api/v1/auth/signup').send(newStaff);
      res.should.have.status(409);
      res.body.should.have.property('message');
      res.body.message.should.equal('Email not available');
    });

    it('Should NOT get access to /users if not logged in', async () => {
      const res = await chai.request(server).post('/api/v1/users/');
      res.should.have.status(401);
      res.body.should.have.property('message');
      res.body.message.should.equal('You must be logged in to access this route');
    });
    it('Should NOT authorize user with invalid token', async () => {
      const res = await chai.request(server).post('/api/v1/users/')
        .set('Authorization', '$INVALIDTOKEN');
      res.should.have.status(401);
      res.body.should.have.property('message');
      res.body.message.should.equal('Invalid token');
    });
    it('Should fail if it lacks valid authentication', async () => {
      const res = await chai.request(server).post('/api/v1/users/')
        .set('Authorization', 'Bearer $sometoken');
      res.should.have.status(401);
      res.body.should.have.property('message');
      res.body.message.should.equal('Auth failed!');
    });
  });

  describe('DELETE USER', () => {
    it('Admin should be able to delete a user', async () => {
      const res = await chai.request(server)
        .delete(`/api/v1/users/6`)
        .set('Authorization', `Bearer ${adminToken}`);
      res.should.have.status(200);
      res.body.should.have.property('status');
      // res.body.should.have.property('message');
      // res.body.message.should.equal('User successfully deleted');
      res.body.should.have.property('data');
      res.body.data.should.equal('User successfully deleted');
    });
    it('Client shount not be able to delete a user', async () => {
      const res = await chai.request(server)
        .delete(`/api/v1/users/2`)
        .set('Authorization', `Bearer ${clientToken}`);
      res.should.have.status(403);
      res.body.should.have.property('status');
      res.body.should.have.property('message');
      res.body.message.should.equal('Forbidden: You are not an admin');
    });
  });
});
