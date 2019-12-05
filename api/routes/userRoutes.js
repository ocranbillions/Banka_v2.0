import { Router } from 'express';
import UserController from '../controllers/userController';
import { validateNewStaff } from '../middlewares/validations';
import Auth from '../middlewares/auth';

const router = Router();

router.get('/', Auth.isLoggedIn, Auth.isStaff, UserController.getUsers);
router.get('/:id', Auth.isLoggedIn, UserController.getUserByID);
router.get('/:owneremail/accounts', Auth.isLoggedIn, UserController.getAccountsByOwnerEmail);
router.post('/', Auth.isLoggedIn, Auth.isAdmin, validateNewStaff, UserController.createStaff);
router.delete('/:id', Auth.isLoggedIn, Auth.isAdmin, UserController.deleteUser);

export default router;



// describe('SIGN-UP', () => {
//     // it('Should register a new user', async () => {
//     //   const formData = {
//     //     firstName: 'Michael',
//     //     lastName: 'Bridges',
//     //     email: 'michaelbridges2019@yahoo.com',
//     //     password: 'secretMike',
//     //   };
//     //   const res = await chai.request(server).post('/api/v1/auth/signup').send(formData);
//     //   res.body.should.have.property('data');
//     //   res.body.data.should.have.property('token');
//     //   res.should.have.status(201);
//     // });

//     it('Should NOT register a user if email exists', async () => {
//       const formData = {
//         firstName: 'Edward',
//         lastName: 'Smart',
//         email: 'michaelbridges2019@yahoo.com',
//         password: 'eddeddy',
//       };
//       const res = await chai.request(server).post('/api/v1/auth/signup').send(formData);
//       res.should.have.status(409);
//       res.body.should.have.property('errorMessage');
//       res.body.errorMessage.should.equal('Email already used');
//     });
//     it('Should NOT register user with incomplete form submission', async () => {
//       const formData = {
//         firstName: '',
//         lastName: '',
//         email: 'mikeBrid@gmail.com',
//         password: 'secretMike',
//       };
//       const res = await chai.request(server).post('/api/v1/auth/signup').send(formData);
//       res.should.have.status(400);
//       res.body.should.have.property('errorMessage');
//       res.body.errorMessage.should.be.a('array');
//       res.body.errorMessage[0].should.equal('name requires alphabets only - min(2)');
//     });
//     it('Should NOT register user with invalid form inputs', async () => {
//       const formData = {
//         firstName: '   ',
//         lastName: '12345',
//         email: 'mik.com',
//         password: 'secretMike',
//       };
//       const res = await chai.request(server).post('/api/v1/auth/signup').send(formData);
//       res.should.have.status(400);
//       res.body.should.have.property('errorMessage');
//       res.body.errorMessage.should.be.a('array');
//       res.body.errorMessage[2].should.equal('provide a valid email');
//     });
//   });