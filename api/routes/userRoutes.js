import { Router } from 'express';
import * as UserController from '../controllers/userController';
import { validateNewStaff } from '../middlewares/validations';
import Auth from '../middlewares/auth';

const {
  getUsers,
  getUserByID,
  deleteUser,
  createStaff,
  getUserAccounts
} = UserController;

const router = Router();

router.get('/', Auth.isLoggedIn, Auth.isStaff, getUsers);
router.get('/:id', Auth.isLoggedIn, getUserByID);
router.post('/', Auth.isLoggedIn, Auth.isAdmin, validateNewStaff, createStaff);
router.delete('/:id', Auth.isLoggedIn, Auth.isAdmin, deleteUser);

router.get('/:id/accounts', Auth.isLoggedIn, getUserAccounts);

export default router;
