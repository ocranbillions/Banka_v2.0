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
