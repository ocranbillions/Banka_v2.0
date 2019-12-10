import { Router } from 'express';
import { getTransactions, getTransactionById, creditAccount } from '../controllers/transactionController';
import { validateTransaction } from '../middlewares/validations';
import Auth from '../middlewares/auth';

const router = Router();

router.get('/', Auth.isLoggedIn, Auth.isStaff, getTransactions);
router.get('/:id', Auth.isLoggedIn, getTransactionById);
router.post('/:accountNumber/credit', Auth.isLoggedIn, Auth.isStaff, validateTransaction, creditAccount);
// router.post('/:accountNumber/credit', validateTransaction, creditAccount);
// router.post('/:accountNumber/debit', Auth.isLoggedIn, Auth.isStaff, validateTransaction, TransactionController.debitAccount);

export default router;
