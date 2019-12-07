import { Router } from 'express';
import { validateNewAccount } from '../middlewares/validations';
import Auth from '../middlewares/auth';
import * as AccountController from '../controllers/accountController';

const {
  getAccounts,
  getSingleAccount,
  deleteAccount,
  changeAccountStatus,
  createAccount } = AccountController;

const router = Router();

router.get('/', Auth.isLoggedIn, Auth.isStaff, getAccounts);
router.post('/', Auth.isLoggedIn, validateNewAccount, createAccount);
// router.get('/:email/accounts', Auth.isLoggedIn, UserController.getAccountsByOwnerEmail);
// router.get('/:email/accounts', Auth.isLoggedIn, getAccountsByEmail);
router.get('/:accountNumber', Auth.isLoggedIn, getSingleAccount);
// router.get('/:accountNumber/transactions', Auth.isLoggedIn, AccountController.getAccountTransactions);
router.delete('/:accountNumber', Auth.isLoggedIn, Auth.isAdmin, deleteAccount);
router.patch('/:accountNumber', Auth.isLoggedIn, Auth.isAdmin, changeAccountStatus);

export default router;