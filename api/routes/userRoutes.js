import { Router } from 'express';
import * as UserController from '../controllers/userController';
import { validateNewStaff } from '../middlewares/validations';
import Auth from '../middlewares/auth';

const {
  getUsers,
  getUserByID,
  deleteUser,
  createStaff
} = UserController;

const router = Router();

router.get('/', Auth.isLoggedIn, Auth.isStaff, getUsers);
router.get('/:id', Auth.isLoggedIn, getUserByID);
router.post('/', Auth.isLoggedIn, Auth.isAdmin, validateNewStaff, createStaff);
router.delete('/:id', Auth.isLoggedIn, Auth.isAdmin, deleteUser);

export default router;
