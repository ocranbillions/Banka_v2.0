import chai from 'chai';
import chaiHttp from 'chai-http';
import jwtDecode from 'jwt-decode';
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
      const user = jwtDecode(res.body.data.token)
      expect(user).to.include({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,  
      });
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
      res.body.should.have.property('message');
      res.body.message.should.equal('Email not available');
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
      res.body.should.have.property('message');
      res.body.message.should.be.a('array');
      res.body.message[0].should.equal('name requires alphabets only - min(2)');
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
      res.body.should.have.property('message');
      res.body.message.should.be.a('array');
      res.body.message[2].should.equal('provide a valid email');
    });
  });

  describe('SIGN-IN', () => {
    it('Should signin a registered user', async () => {
      const formData = {
        email: 'samo@gmail.com',
        password: 'mysecret',
      };
      const res = await chai.request(server).post('/api/v1/auth/signin').send(formData);
      res.should.have.status(200);
      res.body.should.have.property('data');
      res.body.data.should.have.property('token');
      const user = jwtDecode(res.body.data.token)
      expect(user).to.include({ email: formData.email });
    });

    it('Should NOT signin an email account that doesnt exist in the db', async () => {
      const formData = {
        email: 'randomEmail@email.com',
        password: 'password',
      };
      const res = await chai.request(server).post('/api/v1/auth/signin').send(formData);
      res.should.have.status(400);
      res.body.should.have.property('message');
      res.body.message.should.equal('Incorrect login information');
    });

    it('Should NOT signin an existing user with incorrect password', async () => {
      const formData = {
        email: 'samo@gmail.com',
        password: 'incorrect-password',
      };
      const res = await chai.request(server).post('/api/v1/auth/signin').send(formData);
      res.should.have.status(400);
      res.body.should.have.property('message');
      res.body.message.should.equal('Incorrect login information');
    });

    it('Should NOT signin with incomplete form data', async () => {
      const formData = {
        email: '',
        password: '',
      };
      const res = await chai.request(server).post('/api/v1/auth/signin').send(formData);
      res.should.have.status(400);
      res.body.should.have.property('message');
      res.body.message.should.be.a('array');
      res.body.message[0].should.equal('provide a valid email');
      res.body.message[1].should.equal('"password" is not allowed to be empty');
    });
  });
});
