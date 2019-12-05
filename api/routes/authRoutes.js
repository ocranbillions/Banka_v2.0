import { Router } from 'express';
import AuthController from '../controllers/authController';
import { validateSignUp, validateSignIn } from '../middlewares/validations';

const router = Router();

router.post('/signup', validateSignUp, AuthController.signUp);
// router.post('/signin', validations.validateSingnIn, AuthController.signIn);

export default router;
