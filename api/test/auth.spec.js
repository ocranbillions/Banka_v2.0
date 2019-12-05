import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);
const { should, expect } = chai;

describe('AUTH', () => {
  describe('SIGN-UP', () => {
    it('Should register a new user', async () => {
      const formData = {
        firstName: 'Michael',
        lastName: 'Bridges',
        email: 'michaelbridges2019@yahoo.com',
        password: 'secretMike',
      };
      const res = await chai.request(server).post('/api/v1/auth/signup').send(formData);
      res.should.have.status(201);
      res.body.should.have.property('data');
      res.body.data.should.have.property('token');
    });

    it('Should NOT register a user if email exists', async () => {
      const formData = {
        firstName: 'Edward',
        lastName: 'Smart',
        email: 'michaelbridges2019@yahoo.com',
        password: 'eddeddy',
      };
      const res = await chai.request(server).post('/api/v1/auth/signup').send(formData);
      res.should.have.status(409);
      res.body.should.have.property('errorMessage');
      res.body.errorMessage.should.equal('Email already used');
    });

    it('Should NOT register user with incomplete form data', async () => {
      const formData = {
        firstName: '',
        lastName: '',
        email: 'mikeBrid@gmail.com',
        password: 'secretMike',
      };
      const res = await chai.request(server).post('/api/v1/auth/signup').send(formData);
      res.should.have.status(400);
      res.body.should.have.property('errorMessage');
      res.body.errorMessage.should.be.a('array');
      res.body.errorMessage[0].should.equal('name requires alphabets only - min(2)');
    });

    it('Should NOT register user with invalid form inputs', async () => {
      const formData = {
        firstName: '   ',
        lastName: '12345',
        email: 'mik.com',
        password: 'secretMike',
      };
      const res = await chai.request(server).post('/api/v1/auth/signup').send(formData);
      res.should.have.status(400);
      res.body.should.have.property('errorMessage');
      res.body.errorMessage.should.be.a('array');
      res.body.errorMessage[2].should.equal('provide a valid email');
    });
  });

  describe('SIGN-IN', () => {
    it('Should signin a registered user', async () => {
      const formData = {
        email: 'samo@gmail.com',
        password: 'mysecret',
      };
      const res = await chai.request(server).post('/api/v1/auth/signin').send(formData);
      res.body.should.have.property('data');
      res.body.data.should.have.property('token');
      res.should.have.status(200);
    });

    it('Should NOT signin an email account that doesnt exist in the db', async () => {
      const formData = {
        email: 'randomEmail@email.com',
        password: 'password',
      };
      const res = await chai.request(server).post('/api/v1/auth/signin').send(formData);
      res.should.have.status(400);
      res.body.should.have.property('errorMessage');
      res.body.errorMessage.should.equal('Incorrect login information');
    });

    it('Should NOT signin an existing user with incorrect password', async () => {
      const formData = {
        email: 'samo@gmail.com',
        password: 'incorrect-password',
      };
      const res = await chai.request(server).post('/api/v1/auth/signin').send(formData);
      res.should.have.status(400);
      res.body.should.have.property('errorMessage');
      res.body.errorMessage.should.equal('Incorrect login information');
    });

    it('Should NOT signin with incomplete form data', async () => {
      const formData = {
        email: '',
        password: '',
      };
      const res = await chai.request(server).post('/api/v1/auth/signin').send(formData);
      res.should.have.status(400);
      res.body.should.have.property('errorMessage');
      res.body.errorMessage.should.be.a('array');
      res.body.errorMessage[0].should.equal('provide a valid email');
      res.body.errorMessage[1].should.equal('"password" is not allowed to be empty');
    });
  });
});
