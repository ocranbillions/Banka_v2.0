import { Router } from 'express';
import { getUsers, getUserByID, deleteUser, createStaff } from '../controllers/userController';
import { validateNewStaff } from '../middlewares/validations';
import Auth from '../middlewares/auth';

const router = Router();

router.get('/', Auth.isLoggedIn, Auth.isStaff, getUsers);
router.get('/:id', Auth.isLoggedIn, getUserByID);
// router.get('/:owneremail/accounts', Auth.isLoggedIn, UserController.getAccountsByOwnerEmail);
router.post('/', Auth.isLoggedIn, Auth.isAdmin, validateNewStaff, createStaff);
router.delete('/:id', Auth.isLoggedIn, Auth.isAdmin, deleteUser);

export default router;
