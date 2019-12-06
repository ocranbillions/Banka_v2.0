import { Router } from 'express';
import { signUp, signIn } from '../controllers/authController';
import { validateSignUp, validateSignIn } from '../middlewares/validations';

const router = Router();

router.post('/signup', validateSignUp, signUp);
router.post('/signin', validateSignIn, signIn);

export default router;
