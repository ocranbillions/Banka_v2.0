import { Router } from 'express';
import * as TransactionController from '../controllers/transactionController';
import { validateTransaction } from '../middlewares/validations';
import Auth from '../middlewares/auth';

const {
  getTransactions,
  getTransactionById,
  creditAccount,
  debitAccount
} = TransactionController;

const router = Router();

router.get('/', Auth.isLoggedIn, Auth.isStaff, getTransactions);
router.get('/:id', Auth.isLoggedIn, getTransactionById);
router.post('/:accountNumber/credit', Auth.isLoggedIn, Auth.isStaff, validateTransaction, creditAccount);
router.post('/:accountNumber/debit', Auth.isLoggedIn, Auth.isStaff, validateTransaction, debitAccount);
// router.get('/:accountNumber', Auth.isLoggedIn, AccountController.getAccountTransactions);
// router.get('/:accountNumber/transactions', Auth.isLoggedIn, AccountController.getAccountTransactions);

export default router;
